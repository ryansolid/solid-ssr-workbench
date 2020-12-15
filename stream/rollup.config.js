import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import manifest from "rollup-route-manifest";

export default [
  {
    input: "shared/src/index.js",
    output: [
      {
        dir: "stream/public/js",
        format: "esm"
      }
    ],
    preserveEntrySignatures: false,
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: "bundled",
        presets: [["solid", { generate: "dom", hydratable: true }]]
      }),
      copy({
        targets: [
          {
            src: ["shared/static/*"],
            dest: "stream/public"
          }
        ]
      }),
      manifest({
        inline: false,
        merge: false,
        publicPath: "/js/",
        routes: file => {
          file = file.replace(path.join(__dirname, "../shared/src"), "").replace(/\.[tj]sx?$/, "");
          if (!file.includes("/pages/")) return "*"; // commons
          let name = "/" + file.replace("/pages/", "").toLowerCase();
          return name === "/home" ? "/" : name;
        }
      }),
      terser()
    ]
  },
  {
    input: "stream/index.js",
    output: [
      {
        dir: "stream/lib",
        format: "cjs"
      }
    ],
    external: [
      "solid-js",
      "solid-js/web",
      "path",
      "express",
      "stream",
      "compression",
      "node-fetch"
    ],
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      babel({
        babelHelpers: "bundled",
        presets: [["solid", { generate: "ssr", hydratable: true }]]
      }),
      json()
    ],
    preserveEntrySignatures: false
  }
];
