import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { newNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import { BsFillPersonFill } from "react-icons/bs";
import { useState } from "react";
import { BlogForm } from "./BlogForm";
import { createBlog } from "../services/blogs";
export const Nav = ({ loggedUser, initializeBlogs }) => {
  const [toggle, setToggle] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (blogForm, setBlogForm) => {
    setloading(true);
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
      navigate("blogs");
      setShowBlogForm(false);
      setloading(false);
      return blogForm;
    } else {
      showNotification(response.data.error, "fail");
      setloading(false);
    }
  };

  const showNotification = async (msg, type) => {
    dispatch(newNotification([msg, type]));
    setTimeout(() => {
      dispatch(newNotification([]));
    }, 2000);
  };

  const logout = () => {
    dispatch(loginUser(null));
    window.localStorage.removeItem("loggedUser");
    showNotification("Logout Successful", "success");
  };

  return (
    <div className="flex text-white justify-between md:px-10 p-4 bg-[#ff5a19] fixed top-0 w-full shadow-lg z-20">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-semibold font-family: 'Open Sans', sans-serif; h-max align-middle border-[3px] px-3 py-1">
          <Link to="/">BlogLister</Link>
        </h1>
      </div>
      <div className="flex gap-4">
        <div className="flex font-family: 'Open Sans', sans-serif; justify-center items-center gap-2">
          <Link id="go-to-blogs" to="/blogs">
            Blogs
          </Link>
          <Link to="/users">Users</Link>
          {!loggedUser && <Link to="/login">Login</Link>}
        </div>
        {loggedUser ? (
          <>
            <div
              id="user-menu"
              tabIndex={0}
              onBlur={() =>
                setTimeout(() => {
                  setToggle(false);
                }, 100)
              }
              onFocus={() => setToggle(true)}
              className="flex justify-center w-[42px]  items-center text-xl border border-white text-white rounded-full p-1 toggle cursor-pointer"
            >
              <span className="relative text-2xl text-white">
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
                          <p className="cursor-default hover-bg group">
                            {" "}
                            <span className="text-[#ff5a19] font-bold group-hover:text-white">
                              {loggedUser.name}{" "}
                            </span>
                            Logged In
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
          loading={loading}
          setShowBlogForm={setShowBlogForm}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
