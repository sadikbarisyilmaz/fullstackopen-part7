import { Routes, Route, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { Users } from "./components/Users";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { User } from "./components/User.jsx";
import { loginUser } from "./reducers/userReducer";
import { Blog } from "./components/Blog";
import { Notification } from "./components/Notification";
import { updateBlog } from "./services/blogs";
import { newNotification } from "./reducers/notificationReducer";
import { likeBlog } from "./reducers/blogsReducer";
import { LoginForm } from "./components/LoginForm";
import { login } from "./services/login";
import { SignupForm } from "./components/SignupForm";
import { Blogs } from "./components/Blogs";
import { BlogCard } from "./components/BlogCard";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
    if (window.localStorage.getItem("loggedUser")) {
      const loggedUser = window.localStorage.getItem("loggedUser");
      dispatch(loginUser(JSON.parse(loggedUser)));
    }
  }, []);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const notif = useSelector((state) => state.notification);
  const loggedUser = useSelector((state) => state.user);

  const matchUser = useMatch("/users/:id");
  const matchBlog = useMatch("/blogs/:id");
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;
  const navigate = useNavigate();

  const handleLike = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(likedBlog, blog.id).then((e) => {
      if (e.status === 201) {
        showNotification(`Liked "${blog.title}" by ${blog.author}`, "success");
      } else {
        showNotification(`Like failed`, "fail");
      }
    });
    dispatch(likeBlog(likedBlog));
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
        navigate("/blogs");
      } else {
        showNotification("invalid username or password", "fail");
      }
    });
  };

  const showNotification = async (msg, type) => {
    dispatch(newNotification([msg, type]));
    setTimeout(() => {
      dispatch(newNotification([]));
    }, 2000);
  };

  return (
    <div className="h-screen ">
      <div className=" grid items-center relative">
        <Nav initializeBlogs={initializeBlogs} loggedUser={loggedUser} />
        {notif && <Notification />}
        <div className="grid p-20 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/users"
              element={
                <Users
                  loggedUser={loggedUser}
                  showNotification={showNotification}
                  users={users}
                />
              }
            />
            <Route
              path="/blogs"
              element={
                <Blogs
                  loggedUser={loggedUser}
                  blogs={blogs}
                  handleLike={handleLike}
                  showNotification={showNotification}
                />
              }
            />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="/login"
              element={
                <LoginForm
                  loginFormData={loginFormData}
                  handleLogin={handleLogin}
                  setLoginFormData={setLoginFormData}
                />
              }
            />
            <Route path="/users/:id" element={<User user={user} />} />
            <Route
              path="/blogs/:id"
              element={<Blog handleLike={handleLike} blog={blog} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
