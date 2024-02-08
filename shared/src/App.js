import { HydrationScript, isServer } from "solid-js/web";
import { A, Router, useIsRouting, useLocation } from "@solidjs/router";
import routes from "./routes";

const App = (manifest) => (props) => {

  const location = useLocation();
  const isRouting = useIsRouting();

  return (
    <html lang="en">
      <head>
        <title>🔥 Solid SSR 🔥</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        {/*manifest.map(m => <A href={m.href} />).reverse()*/}
        <HydrationScript />
      </head>
      <body>
        <div id="app">
          <ul class="inline">
            <li classList={{ selected: location.pathname === "/" }}>
              <A class="link" href="/">Home</A>
            </li>
            <li classList={{ selected: location.pathname === "/profile" }}>
              <A class="link" href="/profile">Profile</A>
            </li>
            <li classList={{ selected: location.pathname === "/settings" }}>
              <A class="link" href="/settings">Settings</A>
            </li>
          </ul>
          <div class="tab" classList={{ pending: isRouting() }}>
            <Suspense
              fallback={
                <span class="loader" style={"opacity: 0"}>
                  Loading...
                </span>
              }
            >
              {props.children}
            </Suspense>
          </div>
        </div>
        <script type="module" src="/js/index.js" async></script>
      </body>
    </html>
  );
};

export default props => {
  return <Router root={App(props.manifest)} url={isServer ? props.url : ""}>{routes}</Router>
}