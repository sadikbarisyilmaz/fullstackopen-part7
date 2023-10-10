import { Routes, Route, Link, useMatch } from "react-router-dom";

import Home from "./components/Home";
import { Users } from "./components/Users";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
