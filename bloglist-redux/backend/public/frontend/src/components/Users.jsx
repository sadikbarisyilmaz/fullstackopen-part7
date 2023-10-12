import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Users = ({ users, loggedUser, showNotification }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedUser) {
      showNotification("Please Login to browse users", "fail");
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (!loggedUser) {
      showNotification("Please Login to browse blogs", "fail");
      navigate("/");
    }
  }, [loggedUser]);
  return (
    <>
      {loggedUser && (
        <div className="animate-fadeIn">
          <h1>Users</h1>
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
