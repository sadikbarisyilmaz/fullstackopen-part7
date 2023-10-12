import { Link } from "react-router-dom";

export const Users = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users &&
          [...users].map((user, i) => {
            return (
              <li key={i}>
                <div>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                  <span> {user.blogs.length}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
