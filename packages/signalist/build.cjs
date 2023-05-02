const fs = require("fs");
const { build } = require("esbuild");

const pkg = require("./package.json");
const dep = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
};

const runBuild = () => {
  build({
    entryPoints: ["index.ts"],
    bundle: true,
    target: "es6",
    format: "cjs",
    external: Object.keys(dep),
    outfile: "cjs/index.js",
    minify: true,
    loader: {
      ".svg": "dataurl",
    },
    logLevel: "info",
  }).catch(() => process.exit(1));

  build({
    entryPoints: ["index.ts"],
    bundle: true,
    target: "es6",
    format: "esm",
    external: Object.keys(dep),
    outfile: "esm/index.js",
    minify: true,
    loader: {
      ".svg": "dataurl",
    },
    logLevel: "info",
  }).catch(() => process.exit(1));
};

fs.watch("./", { recursive: true }, (eventType, filename) => {
  if (/\.(js|cjs|mjs)$/.test(filename)) {
    return;
  }
  runBuild();
});
runBuild();
