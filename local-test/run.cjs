/**
 * Local runner for BMC Code Pipeline Operations Azure task.
 *
 * Usage:
 *   1. Copy inputs.example.json -> inputs.json and fill values
 *   2. From repo root OR task folder:
 *        npm run test:local
 *      or:
 *        node local-test/run.cjs
 *        node local-test/run.cjs path\to\inputs.json
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..");
const taskRoot = path.join(repoRoot, "azure-deveops-ispw-operation-task");
const defaultInputsPath = path.join(__dirname, "inputs.json");
const exampleInputsPath = path.join(__dirname, "inputs.example.json");

function fail(message) {
  console.error(`[local-test] ${message}`);
  process.exit(1);
}

function loadConfig(inputsPath) {
  if (!fs.existsSync(inputsPath)) {
    fail(
      `Inputs file not found: ${inputsPath}\n` +
        `Copy ${exampleInputsPath} to ${defaultInputsPath} and fill in your values.`
    );
  }
  try {
    return JSON.parse(fs.readFileSync(inputsPath, "utf8"));
  } catch (err) {
    fail(`Failed to parse ${inputsPath}: ${err.message}`);
  }
}

function setTaskInput(name, value) {
  if (value === undefined || value === null) {
    return;
  }
  const text = String(value);
  if (text.length === 0) {
    return;
  }
  // azure-pipelines-task-lib: getInput(name) reads env var INPUT_<NAME_UPPERCASE>
  process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] = text;
}

function setAgentVariable(name, value) {
  if (value === undefined || value === null || String(value).length === 0) {
    return;
  }
  const text = String(value);
  // task-lib getVariable accepts dotted names; agent also exposes underscore form.
  process.env[name] = text;
  process.env[name.replace(/\./g, "_").toUpperCase()] = text;
}

function applyAzureEndpoint(endpoint, endpointId) {
  if (!endpoint || !endpointId) {
    return;
  }
  const id = endpointId;
  const scheme = endpoint.scheme || "ServicePrincipal";
  process.env[`ENDPOINT_URL_${id}`] = endpoint.url || "https://management.azure.com/";
  process.env[`ENDPOINT_AUTH_SCHEME_${id}`] = scheme;
  process.env[`ENDPOINT_AUTH_${id}`] = JSON.stringify({
    parameters: {
      serviceprincipalid: endpoint.servicePrincipalId || "",
      serviceprincipalkey: endpoint.servicePrincipalKey || "",
      tenantid: endpoint.tenantId || "",
    },
    scheme,
  });
  process.env[`ENDPOINT_AUTH_PARAMETER_${id}_SERVICEPRINCIPALID`] =
    endpoint.servicePrincipalId || "";
  process.env[`ENDPOINT_AUTH_PARAMETER_${id}_SERVICEPRINCIPALKEY`] =
    endpoint.servicePrincipalKey || "";
  process.env[`ENDPOINT_AUTH_PARAMETER_${id}_TENANTID`] = endpoint.tenantId || "";
  process.env[`ENDPOINT_DATA_${id}_AZUREKEYVAULTDNSSUFFIX`] =
    endpoint.AzureKeyVaultDnsSuffix || "vault.azure.net";
}

function compileTask() {
  console.log("[local-test] Compiling TypeScript...");
  const tscJs = path.join(taskRoot, "node_modules", "typescript", "bin", "tsc");
  if (!fs.existsSync(tscJs)) {
    fail(
      `TypeScript compiler not found at ${tscJs}. Run: cd azure-deveops-ispw-operation-task && npm install`
    );
  }
  const result = spawnSync(process.execPath, [tscJs], {
    cwd: taskRoot,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    fail("TypeScript compile failed.");
  }
}

function ensureIndexJs() {
  const indexJs = path.join(taskRoot, "index.js");
  if (!fs.existsSync(indexJs)) {
    fail(
      `Missing ${indexJs}. Run: cd azure-deveops-ispw-operation-task && npm run build`
    );
  }
}

function main() {
  const args = process.argv.slice(2).filter((a) => a !== "--no-compile");
  const noCompileFlag = process.argv.includes("--no-compile");
  const inputsPath = path.resolve(args[0] || defaultInputsPath);
  const config = loadConfig(inputsPath);
  const options = config.options || {};
  const inputs = config.inputs || {};
  const variables = config.variables || {};

  const shouldCompile = !noCompileFlag && options.compile !== false;
  if (shouldCompile) {
    compileTask();
  }
  ensureIndexJs();

  console.log(`[local-test] Using inputs: ${inputsPath}`);
  console.log(`[local-test] operationType=${inputs.operationType || "(missing)"} action=${inputs.action || "n/a"}`);

  for (const [key, value] of Object.entries(inputs)) {
    setTaskInput(key, value);
  }
  for (const [key, value] of Object.entries(variables)) {
    setAgentVariable(key, value);
  }

  // Helpful defaults for local agent context
  if (!process.env.AGENT_TEMPDIRECTORY) {
    process.env.AGENT_TEMPDIRECTORY = path.join(taskRoot, ".local-test-temp");
    fs.mkdirSync(process.env.AGENT_TEMPDIRECTORY, { recursive: true });
  }
  if (!process.env.AGENT_WORKFOLDER) {
    process.env.AGENT_WORKFOLDER = process.env.AGENT_TEMPDIRECTORY;
  }

  const authType = String(inputs.authenticationType || "").toUpperCase();
  const cesUrl = String(inputs.cesUrl || "");
  const isHttps = /^https:/i.test(cesUrl);
  const useTokenBypass =
    options.bypassKeyVaultForToken !== false &&
    authType === "TOKEN" &&
    Boolean(inputs.cesSecretToken);

  if (isHttps && useTokenBypass) {
    // index.ts still calls getInputRequired for these on any https CES URL.
    if (!inputs.ConnectedServiceName) {
      setTaskInput("ConnectedServiceName", "local-test-service");
    }
    if (!inputs.keyvaultName) {
      setTaskInput("keyvaultName", "local-test-kv");
    }
    if (!inputs.certificateName) {
      setTaskInput("certificateName", "local-test-cert");
    }
    process.env.LOCAL_TEST_TOKEN_BYPASS = "true";
    process.env.LOCAL_TEST_TASK_ROOT = taskRoot;
    console.log("[local-test] HTTPS + TOKEN: Key Vault bypass enabled");
  } else if (config.azureEndpoint) {
    const endpointId =
      config.azureEndpoint.id ||
      inputs.ConnectedServiceName ||
      inputs.ConnectedServiceNameIspwSync;
    if (endpointId) {
      if (!inputs.ConnectedServiceName && inputs.operationType === "CES") {
        setTaskInput("ConnectedServiceName", endpointId);
      }
      applyAzureEndpoint(config.azureEndpoint, endpointId);
      console.log(`[local-test] Azure endpoint configured: ${endpointId}`);
    }
  }

  if (inputs.operationType === "CES" && inputs.connectionId) {
    // Expected format from Common Config: host:port#codePage
    if (!String(inputs.connectionId).includes("#")) {
      console.warn(
        '[local-test] WARNING: connectionId should look like "host:port#codePage" (example: myzos:29646#1047)'
      );
    }
  }

  if (inputs.operationType === "ISPWSYNC" && !variables["Build.SourcesDirectory"]) {
    console.warn(
      "[local-test] WARNING: ISPWSYNC needs variables.Build.SourcesDirectory pointing at a git workspace"
    );
  }

  const indexJs = path.join(taskRoot, "index.js");
  const nodeArgs = [];
  if (process.env.LOCAL_TEST_TOKEN_BYPASS === "true") {
    nodeArgs.push("--require", path.join(__dirname, "preload.cjs"));
  }
  nodeArgs.push(indexJs);

  console.log("[local-test] Starting task...\n");
  const result = spawnSync(process.execPath, nodeArgs, {
    cwd: taskRoot,
    env: process.env,
    stdio: "inherit",
  });

  if (result.error) {
    fail(result.error.message);
  }
  process.exit(result.status == null ? 1 : result.status);
}

main();
