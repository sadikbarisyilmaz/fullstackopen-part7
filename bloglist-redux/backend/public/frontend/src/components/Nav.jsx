import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { newNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import { BsFillPersonFill } from "react-icons/bs";
import { useState } from "react";
import { BlogForm } from "./BlogForm";
import { createBlog } from "../services/blogs";

export const Nav = ({ loggedUser, initializeBlogs }) => {
  const [toggle, setToggle] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (blogForm, setBlogForm) => {
    const response = await createBlog(blogForm, loggedUser.token);
    if (response.status === 201) {
      dispatch(initializeBlogs());
      showNotification(
        `A new blog "${blogForm.title}" by "${blogForm.author}" added`,
        "success"
      );
      setBlogForm({
        title: "",
        author: "",
        url: "",
      });
      setShowBlogForm(false);
      return blogForm;
    } else {
      showNotification(response.data.error, "fail");
    }
  };

  const showNotification = async (msg, type) => {
    dispatch(newNotification([msg, type]));
    setTimeout(() => {
      dispatch(newNotification([]));
    }, 2000);
  };

  const logout = () => {
    console.log("logout");
    dispatch(loginUser(null));
    window.localStorage.removeItem("loggedUser");
    showNotification("Logout Successful", "success");
  };

  return (
    <div className="flex text-white justify-between md:px-10 p-4 bg-[#ff5a19] fixed top-0 w-full shadow-lg">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-semibold font-family: 'Open Sans', sans-serif; h-max align-middle">
          <Link to="/">BlogLister</Link>
        </h1>
      </div>
      <div className="flex gap-4">
        <div className="flex font-family: 'Open Sans', sans-serif; justify-center items-center gap-2">
          <Link to="/blogss">Blogs</Link>
          <Link to="/users">Users</Link>
          {!loggedUser && <Link to="/login">Login</Link>}
        </div>
        {loggedUser ? (
          <>
            <div
              tabIndex={0}
              onBlur={() =>
                setTimeout(() => {
                  setToggle(false);
                }, 100)
              }
              onFocus={() => setToggle(true)}
              className="flex items-center text-xl border border-white text-white rounded-full p-1 toggle cursor-pointer"
            >
              <span className="relative text-white">
                <BsFillPersonFill />
              </span>
            </div>
            {
              <div
                className={`fixed shadow-md h-fit right-2 text-sm top-12 bg-white rounded-lg p-3 border z-50 ${
                  toggle
                    ? "animate-fadeIn opacity-100"
                    : "animate-fadeOut opacity-0"
                }`}
              >
                <div className="grid gap-2 justify-center  text-black ">
                  {loggedUser ? (
                    <>
                      {toggle && (
                        <>
                          <p className=" cursor-default hover-bg">
                            {loggedUser.name} Logged In
                          </p>
                          <hr />
                          <button
                            className="hover-bg z-40"
                            onClick={() => setShowBlogForm(true)}
                          >
                            New Blog
                          </button>
                          <hr />
                          <button className="hover-bg" onClick={logout}>
                            Logout
                          </button>{" "}
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            }
          </>
        ) : (
          ""
        )}
      </div>
      {showBlogForm && (
        <BlogForm
          setShowBlogForm={setShowBlogForm}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
