import { Routes, Route, Link, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { initializeUsers } from "./reducers/usersReducer";
import { useEffect } from "react";
import Home from "./components/Home";
import { Users } from "./components/Users";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { User } from "./components/uSER.JSX";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("App mounted");
    dispatch(initializeUsers());
  }, []);

  const users = useSelector((state) => state.users);
  const match = useMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
