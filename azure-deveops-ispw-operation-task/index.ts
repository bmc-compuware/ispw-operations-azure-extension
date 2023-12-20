import tl = require("azure-pipelines-task-lib/task");
const axios = require("axios");
const ActionFactory = require("./actions/ActionFactory");
const Input = require("./transferObj/input");
const TaskResponse = require("./transferObj/TaskResponse");
const BuildResponse = require("./transferObj/BuildResponse");
const SummarizeResponse = require("./services/SummarizeResponse");
import { getInputs } from "./actions/sync/input-helper";
import {
  execISPWSync,
  getISPWCLIPath,
} from "./actions/sync/ispw-command-helper";

const RestUtils = require("./utils/RestUtils");
const polling_interval: number = 2000;

const SET_STATE_DISPATCHED: string = "Dispatched";
const SET_STATE_EXECUTING = "Executing";
const SET_STATE_COMPLETE = "Complete";
const SET_STATE_CLOSED = "Closed";
const SET_STATE_FAILED = "Failed";
const SET_STATE_HELD = "Held";
const SET_STATE_RELEASED = "Released";
const SET_STATE_TERMINATED = "Terminated";
const SET_STATE_WAITING_APPROVAL = "Waiting-Approval";
const SET_STATE_WAITING_LOCK = "Waiting-Lock";

function isEmpty(str: string) {
  return !str || str.length === 0;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const connectionId: string | undefined = tl.getInput("connectionId", true);
  const operationType: string | undefined = tl.getInput("operationType", true);
  if (operationType) {
    if (operationType == "CES") {
      console.debug("Operation Type CES");
      const cesUrl: string | undefined = tl.getInput("cesUrl", true);
      const action: any | undefined = tl.getInput("action", true);
      const payload: string | undefined = tl.getInput("request", false);
      const authenticationType: string | undefined = tl.getInput("authenticationType", true);
      let certContent: string | undefined = undefined;
      let cesToken: string | undefined = undefined;
      let certKey: string | undefined = undefined;
      let trustAllCerts: boolean = false;
      const cesUrlObj = new URL(cesUrl as string);
      if (cesUrlObj.protocol == 'https:') {
        console.debug('Protocol : [' + cesUrlObj.protocol + ']');
        trustAllCerts = tl.getBoolInput("trustAllCerts");
        const connectedService: any | undefined = tl.getInput("ConnectedServiceName", true);
        console.debug('Connected Service Name : [' + connectedService + '].');
        var azureKeyVaultDnsSuffix = tl.getEndpointDataParameter(connectedService, "AzureKeyVaultDnsSuffix", true);
        if (!azureKeyVaultDnsSuffix) {
          azureKeyVaultDnsSuffix = "vault.azure.net"
        }
        console.debug('Azure Key Vault DNS Suffix : [' + azureKeyVaultDnsSuffix + '].')
        const keyvaultName = tl.getInput('keyvaultName');
        console.debug('Azure Key Vault Name : [' + keyvaultName + '].');
        const servicePrincipalId = tl.getEndpointAuthorizationParameter(connectedService, 'serviceprincipalid', true);
        const servicePrincipalKey = tl.getEndpointAuthorizationParameter(connectedService, 'serviceprincipalkey', true);
        const tenantId = tl.getEndpointAuthorizationParameter(connectedService, 'tenantId', true);
        const oauthUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

        const certificateName = tl.getInput("certificateName");
        console.debug('Certificate Name : [' + certificateName + ']');
        const params = new URLSearchParams();
        params.append('client_id', `${servicePrincipalId}`);
        params.append('client_secret', `${servicePrincipalKey}`);
        params.append('grant_type', 'client_credentials');
        params.append('scope', `https://${azureKeyVaultDnsSuffix}/.default`);
        const tokenOptions = {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
        //get bearer token from Azure
        await axios.post(oauthUrl, params, tokenOptions).then(async function (responseFromAzure: { status: number; data: { access_token: any; }; }) {
          if (responseFromAzure.status == 200) {
            console.debug('Successfully fetched Bearer Token for authenticating to Azure REST API.');
            const secretsURL = `https://${keyvaultName}.${azureKeyVaultDnsSuffix}/secrets/${certificateName}?api-version=7.4`;
            const options = {
              headers: { "Content-Type": "application/json", "Authorization": `Bearer ${responseFromAzure.data.access_token}` }
            };
            // get certificate as PKCS from azure key vault
            await axios.get(secretsURL, options).then(async function (response: any) {
              if (response && response.status == 200 && response.data.value) {
                console.debug('Successfully fetched PKCS12.');
                certKey = response.data.value;
                if (authenticationType == 'CERT') {
                  console.debug('Performing HTTPS Certificate based authentication.');
                  const url = `https://${keyvaultName}.${azureKeyVaultDnsSuffix}/certificates/${certificateName}/latest?api-version=7.4`;
                  await axios.get(url, options).then(function (response: any) {
                    if (response.status == 200) {
                      certContent = response.data.cer;
                    } else {
                      throw new Error('Error occured while fetching certificate from Key Vault.' + response.status + ' ' + response.statusCode + ' ' + response.statusText);
                    }
                  }).catch(function (error: Error) {
                    throw new Error('Error occured while fetching certificate from Key Vault.' + error.message);
                  });
                } else if (authenticationType == 'TOKEN') {
                  console.debug("Performing HTTPS CES Token based authentication.");
                  cesToken = tl.getInput("cesSecretToken");
                }
              }
              else {
                throw new Error('Failed to download certificate as PKCS from key Vault.' + response.status + response.statusText);
              }
            })
              .catch(function (error: any) {
                throw new Error('Failed to download certificate as PKCS from key Vault.' + error.message);
              });
          } else {
            throw new Error('Error occurred while fetching bearer token from Azure : ' + oauthUrl);
          }
        }).catch(function (error: Error) {
          throw new Error('Error occurred while fetching bearer token from Azure : ' + error.message);
        });
      } else {
        cesToken = tl.getInput("cesSecretToken");
      }

      const buildAutomatically: boolean | undefined = tl.getBoolInput(
        "buildAutomatically"
      ); //fetching value from buildAutomatically checkbox
      const skipWaitingForSetCompletion: boolean | undefined = tl.getBoolInput(
        "skipWaitingForSetCompletion"
      );
      const showResponseBodyInConsole: boolean | undefined = tl.getBoolInput(
        "showResponseBodyInConsole"
      );
      var isValidInput: boolean =
        connectionId != undefined &&
        cesUrl != undefined &&
        action != undefined &&
        !isEmpty(connectionId) &&
        !isEmpty(cesUrl);
      var ispwActions: IspwActions;
      if (isValidInput) {
        let connection = connectionId != undefined ? connectionId.split("#") : "";
        let codePage = connection[1].trim();
        let conStr = connection[0];
        let hostPortArr = conStr.split(":");
        let actionFactory = new ActionFactory();
        let util = new RestUtils();
        let sr = new SummarizeResponse();
        if (!isEmpty(action)) {
          ispwActions = actionFactory.createObj(action);
          let input = new Input(
            hostPortArr[0],
            hostPortArr[1],
            codePage,
            cesUrl,
            payload,
            authenticationType,
            cesToken,
            certContent,
            certKey,
            buildAutomatically,
            skipWaitingForSetCompletion,
            showResponseBodyInConsole,
            trustAllCerts
          );
          const respObject = await ispwActions.performAction(input);
          sr.summarize(respObject, action);
          if (!skipWaitingForSetCompletion) {
            let setId = "";
            let url = "";
            if (respObject instanceof TaskResponse) {
              let taskResp = respObject as TaskResponse;
              setId = taskResp.setId;
              url = taskResp.url;
            } else if (respObject instanceof BuildResponse) {
              let buildResp = respObject as TaskResponse;
              setId = buildResp.setId;
              url = buildResp.url;
            }
            if (
              setId &&
              (respObject instanceof TaskResponse ||
                respObject instanceof BuildResponse) &&
              action != "SetOperation"
            ) {
              input = new Input(
                hostPortArr[0],
                hostPortArr[1],
                codePage,
                url,
                {},
                authenticationType,
                cesToken,
                certContent,
                certKey,
                buildAutomatically,
                skipWaitingForSetCompletion,
                showResponseBodyInConsole,
                trustAllCerts
              );
              ispwActions = actionFactory.createObj("SetInfo");
              let i: number = 0;
              for (; i < 60; i++) {
                await sleep(polling_interval);
                const setResponse: IspwResponse =
                  await ispwActions.performAction(input);
                let set_obj = setResponse as SetInfoResponse;
                console.log("Waiting for set to complete...");
                if (set_obj.state == SET_STATE_FAILED) {
                  console.log(
                    "Code Pipeline: Set " + set_obj.setid + " - action [%s] failed.",
                    action
                  );
                  break;
                } else if (set_obj.state == SET_STATE_TERMINATED) {
                  console.log(
                    "Code Pipeline: Set " + set_obj.setid + " - successfully terminated."
                  );
                  break;
                } else if (set_obj.state == SET_STATE_HELD) {
                  console.log(
                    "Code Pipeline: Set " + set_obj.setid + " - successfully held."
                  );
                  break;
                } else if (
                  set_obj.state == SET_STATE_RELEASED ||
                  set_obj.state == SET_STATE_WAITING_LOCK
                ) {
                  console.log(
                    "Code Pipeline: Set " + set_obj.setid + " - successfully released."
                  );
                  break;
                } else if (set_obj.state == SET_STATE_WAITING_APPROVAL) {
                  console.log(
                    "Code Pipeline: In set (" +
                    set_obj.setid +
                    ") process, Approval required."
                  );
                  break;
                } else if (
                  set_obj.state == SET_STATE_CLOSED ||
                  set_obj.state == SET_STATE_COMPLETE
                ) {
                  console.log(
                    "Code Pipeline: Action " +
                    util.splitPascalCase(action) +
                    " completed."
                  );
                  break;
                }

                if (i == 60) {
                  console.log("Max time out reached.");
                }
              }
            }
          }
          if (skipWaitingForSetCompletion) {
            console.log(
              "Skip waiting for the completion of the set for this job..."
            );
          }
        }
      }
    } else {
      try {
        //Get current working directory
        const curWk = tl.getVariable("Build.SourcesDirectory");

        //Inputs from user
        const parms = getInputs();

        //Get Topaz Workbench CLI Home Path
        let clipath = "";
        try {
          clipath = await getISPWCLIPath(parms);
        } catch (error) {
          if (error instanceof Error) {
            throw error;
          }
        }

        //Sync Git to ISPW
        try {
          await execISPWSync(clipath, parms, curWk);
        } catch (error) {
          if (error instanceof Error) {
            throw error;
          }
        }
        console.log("Code Pipeline Sync action is completed.");
      } catch (error) {
        if (error instanceof Error) {
          tl.setResult(tl.TaskResult.Failed, error.message);
        }
      }
    }
  }
}

run();
