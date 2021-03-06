const Profile = props => (
  <>
    <h1>{props.user?.name}'s Profile</h1>
    <p>This section could be about you.</p>
    <Suspense fallback={<span class="loader">Loading Info...</span>}>
      <ul>
        <For each={props.info}>{film => <li>{film.title}</li>}</For>
      </ul>
    </Suspense>
  </>
);

export default Profile;
