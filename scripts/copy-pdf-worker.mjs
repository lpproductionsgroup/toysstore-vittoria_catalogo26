import { copyFile, mkdir, readFile, readdir, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const require = createRequire(join(root, "node_modules/react-pdf/package.json"));
const source = require.resolve("pdfjs-dist/build/pdf.worker.min.mjs");
const pdfjsPackage = JSON.parse(await readFile(join(dirname(source), "../package.json"), "utf8"));
const publicDirectory = join(root, "public");
const workerName = `pdf.worker.${pdfjsPackage.version.replace(/\./g, "-")}.mjs`;
const destination = join(publicDirectory, workerName);
const wasmSource = join(dirname(source), "../wasm");
const wasmDestination = join(publicDirectory, "wasm");
const wasmFiles = [
  "openjpeg.wasm",
  "openjpeg_nowasm_fallback.js",
  "jbig2.wasm",
  "jbig2_nowasm_fallback.js",
  "qcms_bg.wasm"
];

await mkdir(publicDirectory, { recursive: true });
await copyFile(source, destination);
await mkdir(wasmDestination, { recursive: true });
await Promise.all(wasmFiles.map((file) => copyFile(join(wasmSource, file), join(wasmDestination, file))));
for (const file of await readdir(publicDirectory)) {
  if (/^pdf\.worker\..+\.mjs$/.test(file) && file !== workerName) {
    await rm(join(publicDirectory, file));
  }
}
