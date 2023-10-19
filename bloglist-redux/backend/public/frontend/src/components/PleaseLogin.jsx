import React from "react";
import { Link } from "react-router-dom";
export const PleaseLogin = () => {
  return (
    <div className="animate-fadeIn w-full flex grow bg-[url('.././public/bg-home.jpg')] bg-no-repeat bg-cover items-center justify-center gap-2 flex-col ">
      <div className="p-6 flex items-center justify-center backdrop-blur-sm w-full grow">
        <div className="bg-white flex gap-3 flex-col p-8 md:p-24 rounded-md justify-center items-center">
          <h1 className="text-[#ff5a19] font-semibold text-center text-xl md:text-3xl py-2 drop-shadow-lg">
            Please Login to Continue
          </h1>

          <button className="btn-primary w-20 drop-shadow-lg mt-2">
            <Link to="/Login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
