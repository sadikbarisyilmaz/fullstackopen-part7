import { Link } from "react-router-dom";

export const Home = ({ loggedUser }) => {
  return (
    <div className="animate-fadeIn w-full flex  items-center gap-2 flex-col">
      <h1 className="text-6xl py-8">Welcome to BlogLister !</h1>
      {!loggedUser && <Link to="/Login">Login</Link>}
    </div>
  );
};
