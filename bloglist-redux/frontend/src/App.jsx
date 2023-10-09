import { useState, useEffect } from "react";
import { Blog } from "./components/Blog";
import { createBlog, getAll, updateBlog } from "./services/blogs";
import { login } from "./services/login";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { BlogForm } from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { newNotification } from "./reducers/notificationReducer";
import { addBlog, initializeBlogs, likeBlog } from "./reducers/blogsReducer";

const App = () => {
  const [user, setUser] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    // dispatch(setInitialBlogs());
    dispatch(initializeBlogs());
    if (window.localStorage.getItem("loggedUser")) {
      const loggedUser = window.localStorage.getItem("loggedUser");
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleLike = async (blog, token) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(likedBlog, token, blog.id).then((e) => {
      if (e.status === 201) {
        dispatch(
          newNotification([
            `Liked "${blog.title}" by ${blog.author}`,
            "success",
          ])
        );
      } else {
        dispatch(newNotification([`Like failed`, "fail"]));
      }
    });
    dispatch(likeBlog(likedBlog));
  };

  const showNotification = (msg, type) => {
    setErrorMessage(msg);
    setNotification(type);
    setTimeout(() => {
      setErrorMessage(null);
    }, 1000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(loginFormData);

    if (response.status === 200) {
      showNotification("Login Successfull", "success");
      const cridentials = response.data;
      setUser(cridentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(cridentials));
      setLoginFormData({
        username: "",
        password: "",
      });
    } else {
      showNotification(response.data.error, "fail");
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    showNotification("Logout Successful", "success");
  };

  const handleSubmit = async (blogForm, setBlogForm) => {
    const response = await createBlog(blogForm, user.token);
    const newBlog = { ...blogForm, id: Math.floor(Math.random() * 1000) };
    if (response.status === 201) {
      dispatch(addBlog(newBlog));
      dispatch(
        newNotification([
          `A new blog "${blogForm.title}" by "${blogForm.author}" added`,
          "success",
        ])
      );
      setBlogForm({
        title: "",
        author: "",
        url: "",
      });
      setShowBlogForm(false);
      return blogForm;
    } else {
      dispatch(newNotification([response.data.error, "fail"]));
    }
  };

  const notif = useSelector((state) => state.notification);
  return (
    <div>
      <div>
        <h1>Blogssss</h1>
        {notif && <Notification />}

        {user && (
          <>
            <h2>
              {user.name} logged in <button onClick={logout}>Logout</button>
            </h2>

            {!showBlogForm && (
              <button onClick={() => setShowBlogForm(true)}>New Blog</button>
            )}
            {showBlogForm && (
              <>
                <BlogForm handleSubmit={handleSubmit} />
                <button
                  onClick={() => {
                    setShowBlogForm(false);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
            <br />
            <h3>Blogs</h3>
            <div className="blog">
              {blogs
                // .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    token={user.token}
                    username={user.username}
                    handleLike={handleLike}
                  />
                ))}
            </div>
          </>
        )}
        <br />

        {!user && (
          <>
            <LoginForm
              handleLogin={handleLogin}
              loginFormData={loginFormData}
              setLoginFormData={setLoginFormData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
