import { Routes, Route, Link, useMatch } from "react-router-dom";

export const Nav = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <hr />
    </div>
  );
};
