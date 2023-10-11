import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { newNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import { BsFillPersonFill } from "react-icons/bs";
import { useState } from "react";
import { UserMenu } from "./UserMenu";

export const Nav = ({ loggedUser }) => {
  const [toggle, setToggle] = useState(false);

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
        <div className="flex justify-center items-center gap-2">
          <Link to="/">Blogs</Link>
          <Link to="/users">Users</Link>
          <Link to="/new">Nev Blog</Link>
          {!loggedUser && <Link to="/Login">Loğin</Link>}
        </div>
        {loggedUser ? (
          <div
            tabIndex={0}
            onBlur={() =>
              setTimeout(() => {
                setToggle(false);
              }, 100)
            }
            onFocus={() => setToggle(true)}
            className="flex items-center text-xl border border-gray-500 text-gray-500 rounded-full p-1 toggle cursor-pointer"
          >
            <span className="relative">
              <BsFillPersonFill />
              {toggle && (
                // <UserMenu loggedUser={loggedUser} logout={logout} />
                <></>
              )}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`fixed h-fit right-2 text-sm top-12 bg-white rounded-2xl p-3 border z-50 ${
          toggle ? "animate-fadeIn opacity-100" : "animate-fadeOut opacity-0"
        }`}
      >
        <div className="grid gap-2 justify-center">
          {loggedUser ? (
            <>
              {loggedUser.name} Logged In <br />
              {toggle && <button onClick={logout}>Logout</button>}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
