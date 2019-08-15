const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

const productionUrl =
  process.env.URL || "https://sleepy-jennings-39e0ef.netlify.com";

const manifest = fs.readFileSync(path.join(root, "manifest.xml"), "utf-8");
const newManifest = manifest.replace(
  /https:\/\/localhost:3000/g,
  productionUrl
);
fs.writeFileSync(path.join(root, "dist/manifest.xml"), newManifest);
