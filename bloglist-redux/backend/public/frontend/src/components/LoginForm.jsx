import { Link } from "react-router-dom";

export const LoginForm = ({ handleLogin, loginFormData, setLoginFormData }) => {
  return (
    <div className="animate-fadeIn w-full flex grow bg-[url('.././public/bg-home.jpg')] bg-no-repeat bg-cover items-center justify-center gap-2 flex-col ">
      <div className="p-6 flex items-center justify-center backdrop-blur-sm w-full grow">
        <div className="bg-white h-fit shadow-xl py-10 md:py-20 px-6 md:px-12 rounded-md">
          <h2 className=" text-2xl md:text-3xl font-bold ">
            Log In to BlogLister
          </h2>
          <div className="border my-6 mx-4"></div>
          <form className="grid gap-4" onSubmit={handleLogin}>
            <div className="grid w-full">
              <label className="text-[#ff5a19]   font-bold">Username</label>
              <input
                className="input"
                id="username"
                type="text"
                value={loginFormData.username}
                name="Username"
                onChange={({ target }) =>
                  setLoginFormData((prev) => ({
                    ...prev,
                    username: target.value,
                  }))
                }
              />
            </div>
            <div className="grid w-full">
              <label className="text-[#ff5a19]   font-bold">Password</label>
              <input
                className="input"
                id="password"
                type="password"
                value={loginFormData.password}
                name="Password"
                onChange={({ target }) =>
                  setLoginFormData((prev) => ({
                    ...prev,
                    password: target.value,
                  }))
                }
              />
            </div>
            <button className="btn-primary" id="login-button" type="submit">
              Login
            </button>
            <div className="mt-2 text-sm text-center">
              Don't Have an Account ?{" "}
              <Link to="/signup">
                <span className="text-[#ff5a19]   font-bold">Sign Up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
