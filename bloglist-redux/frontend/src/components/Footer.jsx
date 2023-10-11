import React from "react";

export const Footer = () => {
  return (
    <footer className="h-20 w-full px-10 border-t bottom-0 fixed flex justify-end items-center">
      <div className="">
        <p>
          Created By{" "}
          <a
            className="font-semibold"
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
