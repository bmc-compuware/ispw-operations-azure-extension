import tl = require("azure-pipelines-task-lib/task");

export async function getGitPath(): Promise<string> {
  switch (tl.getPlatform()) {
    case 0: {
      const gitPath: string = await tl.which('git.exe', true);
      console.log(`Git path: ${gitPath}`);
      return gitPath;
    }
    case 2: {
      const gitPath: string = await tl.which('git', true);
      console.log(`Git Path: ${gitPath}`);
      return gitPath;
    }
    default:
      throw new Error(`Unsupported system found.`);
  }
}

export async function calculateDiff(
  gitPath: string,
  commitid: string,
  cwd: string
): Promise<string> {
  let args: string[] = []; 
  
  //arg to find changed files name only
  if (commitid) {
    args = ["diff-tree", "--no-commit-id", "--name-only", "-m", "-r", commitid];
  } else {
    throw new Error("Commit id is not found!");
  }

  if (args.length === 0) {
    throw new Error('Fail to retrieve the commit informaiton from Git.');
  } else {
    let output=await tl.execSync(gitPath, args, { cwd });
    if (output) {
      let dataOutput = '';
      for (const line of output.stdout.trim().split('\n')) {
        dataOutput = dataOutput.concat(line).concat(':');
      }
      if (dataOutput.endsWith(':')) {
        dataOutput = dataOutput.substring(0, dataOutput.length - 1);
      }
      console.log("Changed files : ",dataOutput);
      return dataOutput;
    }
  }

  throw new Error('Unexpected error when calculcating the changed files');
}
