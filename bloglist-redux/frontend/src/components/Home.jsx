import { useState } from "react";
import { BlogList } from "./BlogList";
import { createBlog, updateBlog } from "../services/blogs";
import { login } from "../services/login";
import { LoginForm } from "./LoginForm";
import { BlogForm } from "./BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { likeBlog } from "../reducers/blogsReducer";
import { loginUser } from "../reducers/userReducer";

const Home = ({ blogs, initializeBlogs }) => {
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLike = async (blog, token) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(likedBlog, token, blog.id).then((e) => {
      if (e.status === 201) {
        showNotification(`Liked "${blog.title}" by ${blog.author}`, "success");
      } else {
        showNotification(`Like failed`, "fail");
      }
    });
    dispatch(likeBlog(likedBlog));
  };

  const showNotification = async (msg, type) => {
    dispatch(newNotification([msg, type]));
    setTimeout(() => {
      dispatch(newNotification([]));
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    login(loginFormData).then((e) => {
      if (e.status === 200) {
        showNotification("Login Successfull", "success");
        const cridentials = e.data;
        dispatch(loginUser(cridentials));
        window.localStorage.setItem("loggedUser", JSON.stringify(cridentials));
        setLoginFormData({
          username: "",
          password: "",
        });
      } else {
        showNotification("invalid username or password", "fail");
      }
    });
  };

  const logout = () => {
    dispatch(loginUser(null));
    window.localStorage.removeItem("loggedUser");
    showNotification("Logout Successful", "success");
  };

  const handleSubmit = async (blogForm, setBlogForm) => {
    const response = await createBlog(blogForm, user.token);
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

  return (
    <div>
      <div>
        <h1>Blogssss</h1>
        {user && (
          <>
            <h2>
              {user && user.name} logged in{" "}
              <button onClick={logout}>Logout</button>
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
              {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <BlogList
                    key={blog.id}
                    blog={blog}
                    token={user.token}
                    username={user.username}
                    handleLike={handleLike}
                    showNotification={showNotification}
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

export default Home;
