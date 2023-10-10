import { Routes, Route, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { useEffect } from "react";
import Home from "./components/Home";
import { Users } from "./components/Users";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { User } from "./components/uSER.JSX";
import { loginUser } from "./reducers/userReducer";
import { Blog } from "./components/Blog";
import { Notification } from "./components/Notification";

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

  return (
    <div>
      <Nav user={loggedUser} />
      {notif && <Notification />}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              blogs={blogs}
              user={loggedUser}
              initializeBlogs={initializeBlogs}
            />
          }
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
