import { Link } from "react-router-dom";

export const Home = ({ loggedUser }) => {
  return (
    <div>
      <h1>Welcome to BlogLister !</h1>
      {!loggedUser && <Link to="/Login">Login</Link>}
    </div>
  );
};
