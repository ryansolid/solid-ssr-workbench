import express from "express";
import path from "path";
import compression from "compression";
import fetch from "node-fetch";
import manifest from "./public/js/rmanifest.json";

import { renderToNodeStream } from "solid-js/web";
import App from "../shared/src/App";

const app = express();
const port = 8080;
const lang = "en";
globalThis.fetch = fetch;

app.use(compression());
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  if (!manifest[req.url]) return res.status(404).send();
  const { stream, script } = renderToNodeStream(() => <App url={req.url} />);

  const htmlStart = `<html lang="${lang}">
    <head>
      <title>🔥 Solid SSR 🔥</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/styles.css" />
      ${manifest[req.url]
        .map(m => `<link rel="modulepreload" href="${m.href}" />`)
        .reverse()
        .join("")}
      ${script}
      <script async type="module" src="/js/index.js"></script>
    </head>
    <body><div id="app">`;

  res.write(htmlStart);

  stream.pipe(res, { end: false });

  const htmlEnd = `</div></body>
  </html>`;

  stream.on("end", () => {
    res.write(htmlEnd);
    res.end();
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
