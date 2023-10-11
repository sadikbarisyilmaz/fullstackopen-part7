import { useState } from "react";
import { BlogList } from "./BlogList";
import { createBlog } from "../services/blogs";
import { login } from "../services/login";
import { LoginForm } from "./LoginForm";
import { BlogForm } from "./BlogForm";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

export const Home = ({
  blogs,
  initializeBlogs,
  loggedUser,
  handleLike,
  showNotification,
}) => {
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

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

  return (
    <div>
      <div>
        {loggedUser && (
          <>
            {!showBlogForm && (
              <button className=" z-50" onClick={() => setShowBlogForm(true)}>
                New Blog
              </button>
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
                    token={loggedUser.token}
                    username={loggedUser.username}
                    handleLike={handleLike}
                    showNotification={showNotification}
                  />
                ))}
            </div>
          </>
        )}
        <br />

        {!loggedUser && (
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
