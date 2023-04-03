import tl = require("azure-pipelines-task-lib/task");
import * as path from "path";
import * as fs from "fs";
import { IISPWSyncParms } from "./ispw-sync-parms";

export function getInputs(): IISPWSyncParms {
  const result = {} as unknown as IISPWSyncParms;

  //Git Local Path i.e. absolute path to git.exe
  let gitLocalPath = tl.getVariable("Build.SourcesDirectory");

  //If git.exe not found in local, throw error
  if (!gitLocalPath) {
    throw new Error("The environment variable GITHUB_WORKSPACE is not defined.");
  }

  gitLocalPath = path.resolve(gitLocalPath);
  
  console.log("Git Local Path : ",gitLocalPath);

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
  const branchName= branchMapping[0];
  const bmInput: string[] = branchMapping[1].trim().split(",");
  const cliHome=tl.getInputRequired("topazWorkbenchCLIHome");

  result.workspace = gitLocalPath;
  result.host = connection[0];
  result.port = parseInt(connection[1]);
  result.encryptionProtocol = tl.getInputRequired("encryptionProtocol");
  result.codePage = tl.getInputRequired("codePage");
  result.timeout = parseInt(tl.getInput("timeout", false) || "");
  result.uid = tl.getInputRequired("ispwUsername");
  result.pass = tl.getInputRequired("ispwPassword");
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
  if(bmInput[2]){
    result.containerDescription = bmInput[2];
  }
  result.yamlMappingFile=tl.getInput("yamlMappingFile",false) || "";

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
