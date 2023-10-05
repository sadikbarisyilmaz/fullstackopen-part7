import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const Menu = () => {
  const padding = {
    padding: "10px",
  };
  return (
    <div>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/createNew">
        Create New
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
    </div>
  );
};
