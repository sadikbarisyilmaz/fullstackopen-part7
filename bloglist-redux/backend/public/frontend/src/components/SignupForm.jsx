import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { initializeUsers } from "../reducers/usersReducer";
import { newUser } from "../services/users";

export const SignupForm = ({ showNotification }) => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    newUser(formData).then((e) => {
      if (e.username === formData.username) {
        showNotification("Signup Successfull", "success");
        dispatch(initializeUsers());
        setFormData({
          username: "",
          name: "",
          password: "",
        });
        navigate("/login");
      } else {
        showNotification("Sigup Failed", "fail");
      }
    });
  };
  return (
    <div className="animate-fadeIn w-full flex grow bg-[url('.././public/bg-home.jpg')] bg-no-repeat bg-cover items-center justify-center gap-2 flex-col ">
      <div className="p-6 flex items-center justify-center backdrop-blur-sm w-full grow">
        <div className="bg-white h-fit shadow-xl py-10 md:py-20 px-6 md:px-12 rounded-md">
          <h2 className=" text-xl md:text-3xl font-bold ">
            Sign Up to BlogLister
          </h2>
          <div className="border my-6 mx-4"></div>
          <form className="grid gap-4" onSubmit={handleSignup}>
            <div className="grid w-full">
              <label className="text-[#ff5a19]   font-bold">Name</label>
              <input
                className="input"
                id="name"
                type="text"
                value={formData.name}
                name="name"
                placeholder="Name"
                onChange={({ target }) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: target.value,
                  }))
                }
              />
            </div>
            <div className="grid w-full">
              <label className="text-[#ff5a19]   font-bold">Username</label>
              <input
                className="input"
                id="username"
                type="text"
                value={formData.username}
                name="Username"
                placeholder="Username"
                onChange={({ target }) =>
                  setFormData((prev) => ({
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
                placeholder="Password"
                value={formData.password}
                name="Password"
                onChange={({ target }) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: target.value,
                  }))
                }
              />
            </div>
            <button className="btn-primary" type="submit">
              Sign Up
            </button>
            <div className="mt-2 text-sm text-center">
              Already Have an Account ?{" "}
              <Link to="/login">
                <span className="text-[#ff5a19]   font-bold">Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
