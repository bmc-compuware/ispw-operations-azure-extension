import tl = require("azure-pipelines-task-lib/task");
import * as path from "path";
import { existsSync, unlinkSync, createWriteStream } from "fs";
import { IISPWSyncParms } from "./ispw-sync-parms";
import * as gitCommand from "./git-command-helper";

export async function getISPWCLIPath(parms: IISPWSyncParms): Promise<string> {
  let topazCLIPath = "";

  //Windows = 0,
  //MacOS = 1,
  //Linux = 2
  switch (tl.getPlatform()) {
    case 0: {
      topazCLIPath = parms.winTopazPath;
      topazCLIPath = path.join(topazCLIPath, "IspwCLI.bat");
      topazCLIPath = path.normalize(topazCLIPath);

      console.log("Topaz CLI Path: ", topazCLIPath);

      if (existsSync(topazCLIPath)) {
        return topazCLIPath;
      } else {
        throw new Error(
          `Unable to locate IspwCLI.bat. Please verify the file path '${topazCLIPath}' exists`
        );
      }
    }
    case 2: {
      topazCLIPath = parms.unixTopazPath;
      topazCLIPath = path.join(topazCLIPath, "IspwCLI.sh");
      topazCLIPath = path.normalize(topazCLIPath);

      console.log("Topaz CLI Path: ", topazCLIPath);

      if (existsSync(topazCLIPath)) {
        return topazCLIPath;
      } else {
        throw new Error(
          `Unable to locate IspwCLI.sh. Please verify the file path '${topazCLIPath}' exists`
        );
      }
    }
    default:
      throw new Error(`Unsupported oprating system!`);
  }
}

export async function execISPWSync(
  cliPath: string,
  parms: IISPWSyncParms,
  cwd?: string
): Promise<void> {
  try {
    console.log("Starting Git to ISPW Sync...");
    
    if (!parms || !cwd) {
      throw new Error(`Fail to get input values or environment settings`);
    }

    //set current workspace
    const curWorkspace = parms.workspace;

    //Create CLI workspace directory where configurations and logs where save.
    const configPath = path.join(curWorkspace, "ispwcliwk");
    if (!existsSync(configPath)) {
      await tl.mkdirP(configPath);
    }

    //Remove obsolete file - changedPrograms.json
    const changedPrograms = path.join(curWorkspace, "changedPrograms.json");
    try {
      if (existsSync(changedPrograms)) {
        try {
          unlinkSync(changedPrograms);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      }
    } catch (error) {
      // do nothing
    }

    //Remove obsolete file - automaticBuildParams.txt
    const autoBuildParms = path.join(curWorkspace, "automaticBuildParams.txt");
    try {
      if (existsSync(autoBuildParms)) {
        try {
          unlinkSync(autoBuildParms);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      }
    } catch (error) {
      // do nothing
    }

    //Remove obsolete file - toHash.txt
    const tempHash = path.join(curWorkspace, "toHash.txt");
    try {
      if (existsSync(tempHash)) {
        try {
          unlinkSync(tempHash);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      }
    } catch (error) {
      // do nothing
    }

    // Get git path where agent saved
    let gitPath;
    try {
      gitPath = await gitCommand.getGitPath();
    } catch (error) {
      // do nothing
    }

    //calaculate changed files for current commit
    let changedFileList = undefined;
    if (gitPath) {
      gitPath = path.resolve(gitPath);
      changedFileList = await gitCommand.calculateDiff(
        gitPath,
        parms.gitCommit,
        curWorkspace
      );
    }

    if (!changedFileList || changedFileList.length <= 1) {
      console.error("There is no changed files found.");
      return;
    } else {
      if (changedFileList.length > 2048) {
        const writeStream = createWriteStream(tempHash);
        writeStream.write(changedFileList);
        writeStream.end();
      }
    }

    //Set CLI arguments
    const args = [
      "-data",
      configPath,
      "-host",
      parms.host,
      "-port",
      parms.port.toString(),
      "-operation",
      "syncGitToIspw",
      "-ispwServerConfig",
      parms.runtimeConfiguration,
      "-ispwServerStream",
      parms.stream,
      "-ispwServerApp",
      parms.application,
      "-ispwCheckoutLevel",
      parms.checkoutLevel,
      "-gitRepoUrl",
      parms.gitRepoUrl,
      "-gitBranch",
      parms.gitBranch,
      "-gitFromHash",
      "-1",
      "-targetFolder",
      parms.workspace,
      "-ispwContainerCreation",
      parms.containerCreation,
      "-gitLocalPath",
      parms.workspace,
    ];

    if (parms.subAppl) {
      args.push("-ispwServerSubAppl");
      args.push(parms.subAppl);
    }

    if (typeof parms.certificate != "undefined" && parms.certificate) {
      args.push("-certificate");
      args.push(parms.certificate);
    } else {
      args.push("-id");
      args.push(parms.uid);
      args.push("-pass");
      args.push(parms.pass);
    }

    if (parms.timeout) {
      args.push("-timeout");
      args.push(parms.timeout.toString());
    }

    if (parms.codePage) {
      args.push("-code");
      args.push(parms.codePage);
    }

    if (parms.encryptionProtocol) {
      args.push("-protocol");
      args.push(parms.encryptionProtocol);
    }

    if (parms.containerDescription) {
      args.push("-ispwContainerDescription");
      args.push(parms.containerDescription);
    }

    if (changedFileList.length > 2048) {
      args.push("-gitCommitFile");
      args.push(tempHash);
    } else {
      args.push("-gitCommit");
      changedFileList = quoteArg(false, changedFileList);
      args.push(changedFileList);
    }

    if (parms.yamlMappingFile) {
      args.push("-ispwConfigPath");
      args.push(parms.yamlMappingFile);
    }

    cwd = quoteArg(true, cwd);
    cliPath = quoteArg(true, cliPath);

    let syncResult = await tl.execSync(cliPath, args, { cwd });
    if (syncResult.code != 0) {
      throw new Error("Git to ISPW Sync Failed! Please see console logs.");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export function quoteArg(escape: boolean, arg?: string): string {
  if (!arg) {
    return "";
  }

  if (tl.getPlatform() == 2 || escape) {
    const cmdSpecialChars = [" ", "\t", '"', "'"];
    let needsQuotes = false;
    for (const char of arg) {
      if (cmdSpecialChars.some((x) => x === char)) {
        needsQuotes = true;
        break;
      }
    }
    if (needsQuotes) {
      arg = `"${arg}"`;
      console.log(`Quote the value '${arg}' `);
    }
  }

  return arg;
}
