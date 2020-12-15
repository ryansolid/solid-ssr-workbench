import fetch from "node-fetch";
import { awaitSuspense } from "solid-js";
import { renderToString, generateHydrationScript } from "solid-js/web";
import App from "../shared/src/App";

import manifest from "./public/js/rmanifest.json"
const lang = "en";
globalThis.fetch = fetch;

// entry point for server render
export default async req => {
  const string = await renderToString(awaitSuspense(() => <App url={req.url} />));
  return `<html lang="${lang}">
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
};
