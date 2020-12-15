import express from "express";
import path from "path";
import compression from "compression";
import fetch from "node-fetch";
import manifest from "./public/js/rmanifest.json"

import { renderToString, generateHydrationScript } from "solid-js/web";
import App from "../shared/src/App";

const app = express();
const port = 8080;
const lang = "en";
globalThis.fetch = fetch;

app.use(compression());
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  if (!manifest[req.url]) return res.status(404).send();
  let html;
  try {
    const string = renderToString(() => <App url={req.url} />);
    html = `<html lang="${lang}">
      <head>
        <title>🔥 Solid SSR 🔥</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        ${manifest[req.url].map(m => `<link rel="modulepreload" href="${m.href}" />`).reverse()}
        <script>${generateHydrationScript()}</script>
      </head>
      <body><div id="app">${string}</div></body>
      <script type="module" src="/js/index.js"></script>
    </html>`;
  } catch (err) {
    console.error(err);
  } finally {
    res.send(html);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
