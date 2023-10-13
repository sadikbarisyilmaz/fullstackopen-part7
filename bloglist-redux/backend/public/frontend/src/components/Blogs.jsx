import React, { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";

export const Blogs = ({ handleLike, showNotification, blogs, loggedUser }) => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  if (!loggedUser) {
    return (
      <div className="text-center">
        <h2>Please Login to Browse Blogs</h2>
        <button>
          <Link to="/login">Login</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full animate-fadeIn gap-6 resp-container">
      <div className="border-b text-center md:text-left py-4 justify-center md:justify-start  gap-4">
        <h2 className="text-7xl">Blogs</h2>
        <span className="flex p-4 w-fit rounded-md  gap-2">
          <input
            placeholder="Find Blogs"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="input p-2"
            type="text"
          />
        </span>
      </div>
      <div className="">
        {loggedUser && (
          <div className="blog grid">
            <div className="grid justify-center gap-2">
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
        )}
      </div>
    </div>
  );
};
