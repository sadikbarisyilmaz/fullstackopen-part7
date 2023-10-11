import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { newNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";

export const Nav = ({ loggedUser }) => {
  const dispatch = useDispatch();
  const showNotification = async (msg, type) => {
    dispatch(newNotification([msg, type]));
    setTimeout(() => {
      dispatch(newNotification([]));
    }, 5000);
  };
  const logout = () => {
    dispatch(loginUser(null));
    window.localStorage.removeItem("loggedUser");
    showNotification("Logout Successful", "success");
  };

  return (
    <div className="flex justify-between md:px-10 p-4 border-b ">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-semibold  h-max align-middle">
          BlogLister
        </h1>
      </div>
      <div className="flex gap-4">
        {loggedUser ? (
          <div className="grid">
            <div>{loggedUser.name} Logged In</div>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          "Login"
        )}
        <div className="flex justify-center items-center gap-2">
          <Link to="/">Blogs</Link>
          <Link to="/users">Users</Link>
        </div>
      </div>
    </div>
  );
};
