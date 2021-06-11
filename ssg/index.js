import fetch from "node-fetch";
import { renderToStringAsync } from "solid-js/web";
import App from "../shared/src/App";

import manifest from "./public/js/rmanifest.json";
globalThis.fetch = fetch;

// entry point for server render
export default req => {
  return renderToStringAsync(() => <App url={req.url} manifext={manifest[req.url]} />);
};
