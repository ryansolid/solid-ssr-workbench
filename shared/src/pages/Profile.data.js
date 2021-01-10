import { createResource } from "solid-js";

export default () => {
  const [user, loadUser] = createResource(undefined, { name: "profile" }),
    [info, loadInfo] = createResource([], { name: "profile_info" });
  loadUser(() =>
    // simulate data loading
    fetch(`https://jsonplaceholder.typicode.com/users/2/`).then(r => r.json())
  );
  loadInfo(() => fetch(`https://jsonplaceholder.typicode.com/users/2/todos`).then(r => r.json()));
  return {
    get user() {
      return user();
    },
    get info() {
      return info();
    }
  };
};
