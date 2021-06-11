import express from "express";
import path from "path";
import compression from "compression";
import fetch from "node-fetch";
import manifest from "./public/js/rmanifest.json";

import { pipeToNodeWritable } from "solid-js/web";
import App from "../shared/src/App";

const app = express();
const port = 8080;
globalThis.fetch = fetch;

app.use(compression());
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  if (!manifest[req.url]) return res.status(404).send();
  pipeToNodeWritable(() => <App url={req.url} manifest={manifest[req.url]} />, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
