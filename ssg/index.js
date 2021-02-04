import fetch from "node-fetch";
import { renderToStringAsync } from "solid-js/web";
import App from "../shared/src/App";

import manifest from "./public/js/rmanifest.json"
const lang = "en";
globalThis.fetch = fetch;

// entry point for server render
export default async req => {
  const { html, script } = await renderToStringAsync(() => <App url={req.url} />);
  return `<html lang="${lang}">
    <head>
      <title>🔥 Solid SSR 🔥</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/styles.css" />
      ${manifest[req.url].map(m => `<link rel="modulepreload" href="${m.href}" />`).reverse()}
      ${script}
    </head>
    <body><div id="app">${html}</div></body>
    <script type="module" src="/js/index.js"></script>
  </html>`;
};
