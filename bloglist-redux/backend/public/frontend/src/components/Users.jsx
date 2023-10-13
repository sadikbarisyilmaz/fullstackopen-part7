import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Users = ({ users, loggedUser, showNotification }) => {
  const navigate = useNavigate();

  if (!loggedUser) {
    return (
      <div className="text-center">
        <h2>Please Login to Browse Users</h2>
        <button>
          <Link to="/login">Login</Link>
        </button>
      </div>
    );
  }
  return (
    <>
      {loggedUser && (
        <div className="animate-fadeIn flex flex-col justify-center items-center w-full">
          {/* <h1>Users</h1> */}
          <ul>
            {users &&
              [...users].map((user, i) => {
                return (
                  <li key={i}>
                    <div>
                      <Link to={`/users/${user.id}`}>{user.username}</Link>
                      <span> {user.blogs.length}</span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};
