import React, { useEffect, useState } from "react";

export const UserMenu = ({ loggedUser, logout }) => {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    console.log("mounted", hidden);
  }, []);

  return (
    <div
      className={`fixed h-fit transition-all ease-in-out duration-300 right-2 text-sm  top-12 rounded-2xl p-3 border z-50 animate-fadeIn`}
    >
      <div className="grid gap-2 ">
        <div>{loggedUser.name} Logged In</div>
        <hr />
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};
