import tl = require("azure-pipelines-task-lib/task");
import * as path from "path";
import * as fs from "fs";
import { IISPWSyncParms } from "./ispw-sync-parms";
const CertificateUtils = require("../../utils/CertificateUtils");

export async function getInputs(): Promise<IISPWSyncParms> {
  const result = {} as unknown as IISPWSyncParms;

  //Git Local Path i.e. absolute path to git.exe
  let gitLocalPath = tl.getVariable("Build.SourcesDirectory");

  //If git.exe not found in local, throw error
  if (!gitLocalPath) {
    throw new Error(
      "The environment variable GITHUB_WORKSPACE is not defined."
    );
  }

  gitLocalPath = path.resolve(gitLocalPath);

  console.log("Git Local Path : ", gitLocalPath);

  try {
    fs.statSync(gitLocalPath);
  } catch (error) {
    throw new Error(
      `Encountered an error when checking whether path '${gitLocalPath}' exists`
    );
  }

  let connection: string[] = tl.getDelimitedInput("connectionId", ":", true);
  const branchMapping: string[] = tl.getDelimitedInput(
    "branchMapping",
    "=>",
    true
  );
  const branchName = branchMapping[0];
  const bmInput: string[] = branchMapping[1].trim().split(",");
  let codePage: string[] = tl.getDelimitedInput("codePage", "-", true);

  let cliHome = "";
  if (tl.getPlatform() == 0) {
    cliHome = tl.getInputRequired("windowsWorkbenchCliHome");
  } else if (tl.getPlatform() == 2) {
    cliHome = tl.getInput("linuxWorkbenchCliHome") || "";
  } else {
    throw new Error(
      "An operating system the build agent is running on is not supported."
    );
  }

  result.workspace = gitLocalPath;
  result.host = connection[0];
  result.port = parseInt(connection[1]);
  result.encryptionProtocol = tl.getInputRequired("encryptionProtocol");
  result.codePage = codePage[0].trim();
  result.timeout = parseInt(tl.getInput("timeout", false) || "");
  var authenticationType = tl.getInputRequired("authenticationTypeIspwSync");
  if (authenticationType == 'USER') {
    result.uid = tl.getInputRequired("ispwUsername");
    result.pass = tl.getInputRequired("ispwPassword");
  } else {
    const certUtils = new CertificateUtils();
    const connectedService = tl.getInputRequired("ConnectedServiceNameIspwSync");
    const keyvaultName = tl.getInputRequired("keyvaultNameIspwSync");
    const certificateName = tl.getInputRequired("certificateNameIspwSync");
    await certUtils.getCertificate(authenticationType, connectedService, keyvaultName, certificateName).then(function (authenticate: Authenticate) {
      result.certificate = authenticate.certificate;
    });
  }
  // result.certificate = core.getInput("certificate", { required: false });
  result.runtimeConfiguration = tl.getInputRequired("runtimeConfiguration");
  result.stream = tl.getInputRequired("stream");
  result.application = tl.getInputRequired("application");
  result.subAppl = tl.getInput("subApplication", false) || "";
  result.checkoutLevel = bmInput[0].trim();
  // result.gitUid = tl.getInputRequired("gitUsername");
  // result.gitToken = tl.getInputRequired("gitPassword");
  // result.gitRepoUrl = tl.getInputRequired("repositoryURL");
  result.gitRepoUrl = tl.getVariable("Build.Repository.Uri") || "";
  result.gitBranch = branchName.trim();
  result.gitCommit = tl.getVariable("Build.SourceVersion") || "";
  result.containerCreation = bmInput[1].trim();
  result.containerDescription = "";
  if (bmInput[2]) {
    result.containerDescription = bmInput[2];
  }
  result.yamlMappingFile = tl.getInput("yamlMappingFile", false) || "";

  // users need make sure Topaz CLI is installed at the same path
  if (!cliHome) {
    throw new Error("Workbench CLI Path not defined.");
  } else {
    validatePath(cliHome);
  }

  //Depend on the agent platform set Topaz Workbench CLI Home Path
  if (tl.getPlatform() == 0) {
    result.winTopazPath = cliHome;
  } else {
    result.unixTopazPath = cliHome;
  }
  return result;
}

export async function validatePath(aPath: string): Promise<void> {
  try {
    fs.statSync(aPath);
  } catch (error) {
    throw new Error(
      `Encountered an error when checking whether path '${aPath}' exists.`
    );
  }
}
