import express from "express";
import path from "path";
import compression from "compression";
import fetch from "node-fetch";
import manifest from "./public/js/rmanifest.json";

import { renderToStream } from "solid-js/web";
import App from "../shared/src/App";

function preload(res, resources) {
  res.setHeader("Link", resources.map((resource) =>
    `<${resource.href}>; rel="preload"; as="script"; crossorigin=""`
  ).join(","))
}

const app = express();
const port = 8080;
globalThis.fetch = fetch;

app.use(compression());
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  if (!manifest[req.url]) return res.status(404).send();
  // preload(res, manifest[req.url]);
  // res.setHeader('transfer-encoding', 'chunked')
  // res.flushHeaders();
  renderToStream(() => <App url={req.url} manifest={manifest[req.url]} />).pipe(res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
