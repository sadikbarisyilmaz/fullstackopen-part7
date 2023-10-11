import React from "react";

export const Footer = () => {
  return (
    <footer className=" h-12 w-full px-10 bg-cyan-950 bottom-0 fixed flex justify-end items-center">
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
