/**
 * Preload hook for local CES TOKEN runs so HTTPS does not require Key Vault.
 * Enabled when LOCAL_TEST_TOKEN_BYPASS=true.
 */
"use strict";

const path = require("path");
const Module = require("module");

if (process.env.LOCAL_TEST_TOKEN_BYPASS === "true") {
  const taskRoot = process.env.LOCAL_TEST_TASK_ROOT;
  if (!taskRoot) {
    throw new Error("LOCAL_TEST_TASK_ROOT is required when LOCAL_TEST_TOKEN_BYPASS=true");
  }

  const certUtilsPath = path.join(taskRoot, "utils", "CertificateUtils.js");
  const authenticatePath = path.join(taskRoot, "transferObj", "Authenticate.js");

  class LocalCertificateUtils {
    async getCertificate(authenticationType) {
      const Authenticate = require(authenticatePath);
      if (authenticationType === "TOKEN") {
        const cesToken = process.env.INPUT_CESSECRETTOKEN;
        if (!cesToken) {
          throw new Error(
            "LOCAL_TEST_TOKEN_BYPASS is on but INPUT_CESSECRETTOKEN is empty. Set cesSecretToken in inputs.json."
          );
        }
        console.log("[local-test] Bypassing Azure Key Vault; using cesSecretToken from inputs.json");
        return new Authenticate(undefined, undefined, cesToken);
      }
      throw new Error(
        "CERT authentication cannot use Key Vault bypass. Provide azureEndpoint in inputs.json and set bypassKeyVaultForToken to false."
      );
    }
  }

  require.cache[certUtilsPath] = {
    id: certUtilsPath,
    filename: certUtilsPath,
    loaded: true,
    exports: LocalCertificateUtils,
    children: [],
    paths: [],
  };

  // Ensure relative requires from index resolve to the same cached stub.
  const originalLoad = Module._load;
  Module._load = function (request, parent, isMain) {
    if (
      typeof request === "string" &&
      (request === "./utils/CertificateUtils" ||
        request === "../utils/CertificateUtils" ||
        request.endsWith("/utils/CertificateUtils") ||
        request.endsWith("\\utils\\CertificateUtils"))
    ) {
      return require.cache[certUtilsPath].exports;
    }
    return originalLoad.apply(this, arguments);
  };
}
