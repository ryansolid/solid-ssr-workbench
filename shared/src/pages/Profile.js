const Profile = (props) => {

  const { user, info } = props.data;

  return (
    <>
      <h1>{user()?.name}'s Profile</h1>
      <p>This section could be about you.</p>
      <Suspense fallback={<span class="loader">Loading Info...</span>}>
        <ul>
          <For each={info()}>{film => <li>{film.title}</li>}</For>
        </ul>
      </Suspense>
    </>
  );
};

export default Profile;
