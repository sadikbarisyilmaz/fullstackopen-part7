import { Routes, Route, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { useEffect } from "react";
import { Home } from "./components/Home";
import { Users } from "./components/Users";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { User } from "./components/uSER.JSX";
import { loginUser } from "./reducers/userReducer";
import { Blog } from "./components/Blog";
import { Notification } from "./components/Notification";
import { updateBlog } from "./services/blogs";
import { newNotification } from "./reducers/notificationReducer";
import { likeBlog } from "./reducers/blogsReducer";

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

  const showNotification = async (msg, type) => {
    dispatch(newNotification([msg, type]));
    setTimeout(() => {
      dispatch(newNotification([]));
    }, 5000);
  };

  return (
    <div className="h-screen ">
      <div className=" grid items-center relative">
        <Nav loggedUser={loggedUser} />
        {notif && <Notification />}
        <div className="grid p-20 ">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  showNotification={showNotification}
                  blogs={blogs}
                  loggedUser={loggedUser}
                  initializeBlogs={initializeBlogs}
                  handleLike={handleLike}
                />
              }
            />
            <Route path="/users" element={<Users users={users} />} />
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
