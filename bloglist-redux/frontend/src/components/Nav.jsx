import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { newNotification } from "../reducers/notificationReducer";

export const Nav = ({ user }) => {
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
    <div>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      {user && user.name} logged in <button onClick={logout}>Logout</button>
      <hr />
    </div>
  );
};
