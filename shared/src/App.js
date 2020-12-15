import { Link, Router, Route, useRouter } from "solid-app-router";
import routes from "./routes";

const App = () => {
  const router = useRouter();
  return (
    <>
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
    </>
  );
};

export default (props) => (
  <Router routes={routes} initialURL={props.url}>
    <App />
  </Router>
);
