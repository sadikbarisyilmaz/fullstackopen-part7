import React from "react";

export const Footer = () => {
  return (
    <footer className="h-9 w-full px-10 bg-gray-950 flex sm:justify-end justify-center items-center">
      <div className="text-xs text-white">
        <p>
          Created By{" "}
          <a
            className="font-bold"
            target="_blank"
            href="https://sadikbarisyilmaz.dev/"
          >
            Sadık Barış Yılmaz
          </a>
        </p>
      </div>
    </footer>
  );
};
