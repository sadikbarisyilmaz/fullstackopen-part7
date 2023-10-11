export const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog, i) => {
          return (
            <li key={i}>
              <div>{blog.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
