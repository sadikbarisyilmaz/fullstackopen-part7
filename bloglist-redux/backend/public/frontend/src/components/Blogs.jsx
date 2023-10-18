import React, { useState } from "react";
import { BlogCard } from "./BlogCard";
import { useNavigate } from "react-router-dom";
import { PleaseLogin } from "./PleaseLogin";
import { Loader } from "./Loader";

export const Blogs = ({ handleLike, showNotification, blogs, loggedUser }) => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  console.log(blogs);
  if (!loggedUser) {
    return <PleaseLogin />;
  }

  return (
    <div className="w-full pt-[70px] animate-fadeIn flex bg-[#fffdfa] flex-col justify-center grow">
      <div className="pt-20 md:px-44 px-6 pb-16 flex flex-col text-center py-4 justify-center items-center gap-8 md:gap-14">
        <h2 className="text-3xl md:text-7xl text-[#ff5a19]">
          Discover Shared Blogs !
        </h2>
        <p className="max-w-xl  indent-8">
          Explore a world of interesting blogs, where users share their favorite
          reads. Whether you're into travel, food, or thought-provoking essays,
          our platform has a variety of content that fellow users have enjoyed.
          Join the conversation, discover new things, and connect with
          like-minded folks by commenting on your favorite blogs !
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
      <div className="md:px-36 px-6 py-12 ">
        {blogs.length > 0 ? (
          <div className="blog justify-center grid">
            <div className="grid lg:grid-cols-3 justify-center gap-4">
              {[...blogs]
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
                ))}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
