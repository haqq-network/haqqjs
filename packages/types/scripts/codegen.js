#!/usr/bin/env node
/* eslint-env es6 */

const { join } = require("path");
const {
  writeFileSync,
  readFileSync,
  promises: { readFile, writeFile },
} = require("fs");
// const { default: telescope } = require("@cosmology/telescope");
const { default: telescope } = require("@osmonauts/telescope");
const { glob } = require("glob");

const outPath = join(__dirname, "/../src");

// Create index.ts
async function generateIndex() {
  const indexTsContent = `
// Auto-generated, see scripts/codegen.js!

// Exports we want to provide at the root of the "@haqqjs/types" package

export { DeepPartial, Exact } from "./helpers";
`;

  await writeFile(`${outPath}/index.ts`, indexTsContent);
}

// Rename cosmjs => haqqjs in generated files
async function replaceCosmjs() {
  try {
    const files = await glob(`${outPath}/**/*.{ts,js}`, { ignore: "node_modules/**" });

    files.forEach(async (file) => {
      const content = await readFile(file, "utf8");
      const modifiedContent = content
        .replace(/@cosmjs\//g, "@haqqjs/")
        .replace(/cosmjs-types/g, "@haqqjs/types");
      await writeFile(file, modifiedContent, "utf8");
    });

    return Promise.resolve();
  } catch (error) {
    if (error) {
      console.error("Error while reading files:", error);
      return;
    }
  }
}

async function patchEthermintEvmQuery() {
  const file = `${outPath}/ethermint/evm/v1/query.ts`;
  const content = await readFile(file, "utf8");
  const modifiedContent = content.replace(
    /import { MsgEthereumTx } from "\.\/tx";/g,
    'import { MsgEthereumTx, MsgEthereumTxResponse } from "./tx";',
  );

  await writeFile(file, modifiedContent, "utf8");
}

async function startCodegen() {
  telescope({
    outPath,
    protoDirs: ["proto", "third_party/proto"],
    options: {
      logLevel: 3,
      useSDKTypes: false,
      tsDisable: {
        disableAll: false,
      },
      eslintDisable: {
        disableAll: true,
      },
      bundle: {
        enabled: false,
      },
      prototypes: {
        includePackageVar: true,
        excluded: {
          protos: [
            "cosmos/authz/v1beta1/event.proto",
            "cosmos/base/reflection/v2alpha1/reflection.proto",
            "cosmos/crypto/secp256r1/keys.proto",
            "ibc/core/port/v1/query.proto",
            "ibc/lightclients/solomachine/v2/solomachine.proto",
            "tendermint/libs/bits/types.proto",
            "google/api/httpbody.proto",
            "tendermint/blockchain/types.proto",
            "tendermint/consensus/types.proto",
            "tendermint/consensus/wal.proto",
            "tendermint/mempool/types.proto",
            "tendermint/p2p/conn.proto",
            "tendermint/p2p/pex.proto",
            "tendermint/privval/types.proto",
            "tendermint/rpc/grpc/types.proto",
            "tendermint/state/types.proto",
            "tendermint/statesync/types.proto",
            "tendermint/store/types.proto",
            "tendermint/types/canonical.proto",
            "tendermint/types/events.proto",
          ],
        },
        methods: {
          // There are users who need those functions. CosmJS does not need them directly.
          // See https://github.com/cosmos/cosmjs/pull/1329
          fromJSON: true,
          toJSON: true,
        },
        typingsFormat: {
          useDeepPartial: true,
          useExact: true,
          timestamp: "timestamp",
          duration: "duration",
        },
      },
      lcdClients: {
        enabled: false,
      },
      rpcClients: {
        enabled: true,
        inline: true,
        extensions: false,
        camelCase: false,
        enabledServices: ["Msg", "Query", "Service", "ReflectionService", "ABCIApplication"],
      },
      aminoEncoding: {
        enabled: false,
      },
    },
  })
    .then(generateIndex)
    .then(replaceCosmjs)
    .then(patchEthermintEvmQuery)
    .finally(() => {
      console.log("✨ All Done!");
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

startCodegen();
