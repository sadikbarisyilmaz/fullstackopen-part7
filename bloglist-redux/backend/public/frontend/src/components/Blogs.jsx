import React from "react";
import { BlogCard } from "./BlogCard";

export const Blogs = ({ handleLike, showNotification, blogs, loggedUser }) => {
  return (
    <div className="blog grid gap-2">
      {[...blogs]
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
  );
};
