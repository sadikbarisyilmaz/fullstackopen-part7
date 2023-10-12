import { Link } from "react-router-dom";

export const LoginForm = ({ handleLogin, loginFormData, setLoginFormData }) => {
  return (
    <div className="animate-fadeIn">
      <h1>Log In to BlogLister</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <br />
          <input
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
        <div>
          Password
          <br />
          <input
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
        <br />
        <button id="login-button" type="submit">
          Login
        </button>

        <div>
          Don't Have an Account ? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};
