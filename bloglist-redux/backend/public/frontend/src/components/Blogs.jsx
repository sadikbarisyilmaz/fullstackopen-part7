import React, { useState } from "react";
import { BlogCard } from "./BlogCard";
import { PleaseLogin } from "./PleaseLogin";
import { Loader } from "./Loader";

export const Blogs = ({ handleLike, showNotification, blogs, loggedUser }) => {
  const [filter, setFilter] = useState("");

  if (!loggedUser) {
    return <PleaseLogin />;
  }
  console.log(
    [...blogs].filter((blog) =>
      blog.title.toLowerCase().includes(filter.toLowerCase())
    )
  );
  return (
    <div className="w-full pt-[70px] animate-fadeIn flex bg-[#fffdfa] flex-col  grow">
      <div className="bg-[url('.././public/bg-home.jpg')] bg-no-repeat bg-cover ">
        <div className="flex flex-col text-center w-full justify-center items-center pt-20 md:px-44 px-6 pb-16 py-4  md:gap-14 bg-black bg-opacity-60  gap-8 backdrop-blur-sm">
          <h2 className="text-3xl md:text-7xl drop-shadow-2xl text-[#ff5a19] font-bold">
            Discover Awesome Blogs !
          </h2>
          <p className="max-w-xl text-white drop-shadow-2xl  font-bold md:text-base text-xs">
            Explore a world of interesting blogs, where users share their
            favorite reads. Whether you're into travel, food, or
            thought-provoking essays, our platform has a variety of content that
            fellow users have enjoyed. Join the conversation, discover new
            things, and connect with like-minded folks by commenting on your
            favorite blogs !
          </p>
          <span className="flex w-fit rounded-md gap-2">
            <input
              placeholder="Search Blogs"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="input p-2"
              type="text"
            />
          </span>
        </div>
      </div>
      <div className="md:px-36 px-6 py-12 ">
        {blogs.length > 0 ? (
          <div className="blog justify-center grid">
            <div className="grid lg:grid-cols-3 justify-center gap-4">
              {[...blogs].filter((blog) =>
                blog.title.toLowerCase().includes(filter.toLowerCase())
              ).length > 0 ? (
                [...blogs]
                  .filter((blog) =>
                    blog.title.toLowerCase().includes(filter.toLowerCase())
                  )
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      token={loggedUser.token}
                      username={loggedUser.username}
                      handleLike={handleLike}
                      showNotification={showNotification}
                    />
                  ))
              ) : (
                <>
                  <div className="text-center font-bold"></div>
                  <div className="text-center text-xl font-bold">
                    No Matches Found
                  </div>
                  <div className="text-center font-bold"></div>
                </>
              )}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
