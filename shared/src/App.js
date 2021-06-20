import { HydrationScript, NoHydration } from "solid-js/web";
import { Link, Router, Route, useRouter } from "solid-app-router";
import routes from "./routes";

const App = ({ manifest = [] }) => {
  const router = useRouter();
  return (
    <html lang="en">
      <head>
        <title>🔥 Solid SSR 🔥</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <NoHydration>{
          manifest
          .map(m => <link rel="modulepreload" href={m.href} />)
          .reverse()
        }</NoHydration>
        <HydrationScript />
      </head>
      <body>
        <div id="app">
          <ul class="inline">
            <li classList={{ selected: router.location === "/" }}>
              <Link class="link" href="/">Home</Link>
            </li>
            <li classList={{ selected: router.location === "/profile" }}>
              <Link class="link" href="/profile">Profile</Link>
            </li>
            <li classList={{ selected: router.location === "/settings" }}>
              <Link class="link" href="/settings">Settings</Link>
            </li>
          </ul>
          <div class="tab" classList={{ pending: router.pending }}>
            <Suspense
              fallback={
                <span class="loader" style={"opacity: 0"}>
                  Loading...
                </span>
              }
            >
              <Route />
            </Suspense>
          </div>
        </div>
      </body>
      <script type="module" src="/js/index.js" async></script>
    </html>
  );
};

export default props => (
  <Router routes={routes} initialURL={props.url}>
    <App url={props.url} manifest={props.manifest} />
  </Router>
);
