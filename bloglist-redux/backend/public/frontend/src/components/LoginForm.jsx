import { Link } from "react-router-dom";

export const LoginForm = ({ handleLogin, loginFormData, setLoginFormData }) => {
  return (
    <div className="animate-fadeIn flex justify-center">
      <div className="bg-white shadow-xl py-10 md:py-20 px-6 md:px-12 rounded-md">
        <h2 className=" text-2xl md:text-3xl font-bold mb-10">
          Log In to BlogLister
        </h2>
        <form className="grid gap-4" onSubmit={handleLogin}>
          <div className="grid w-full">
            <label>Username</label>
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
            <label>Password</label>
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
            Don't Have an Account ? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
