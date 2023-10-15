import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Home = ({}) => {
  const loggedUser = useSelector((state) => state.user);

  return (
    <div className="animate-fadeIn w-full flex grow bg-[url('.././public/bg-home.jpg')] bg-no-repeat bg-cover items-center justify-center gap-2 flex-col ">
      <div className="p-6 flex items-center justify-center backdrop-blur-sm w-full grow">
        <div className="bg-white opacity-90 flex gap-3 flex-col p-8 md:p-24 rounded-md justify-center">
          <h1 className="text-[#ff5a19] font-semibold text-3xl md:text-5xl py-2 drop-shadow-lg">
            Welcome to BlogLister !
          </h1>
          <p className="text-justify max-w-md drop-shadow-lg">
            Join us to share your favorite blogs and connect with fellow
            enthusiasts who share your passion for the written word !
          </p>

          {!loggedUser && (
            <button className="btn-primary w-20 drop-shadow-lg mt-2">
              {" "}
              <Link to="/login">Login</Link>
            </button>
          )}

          {loggedUser && (
            <button className="btn-primary w-28 drop-shadow-lg mt-2">
              <Link to="/blogs">See Blogs</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
