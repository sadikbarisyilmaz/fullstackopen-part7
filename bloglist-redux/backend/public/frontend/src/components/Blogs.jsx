import React, { useEffect } from "react";
import { BlogCard } from "./BlogCard";
import { useNavigate } from "react-router-dom";

export const Blogs = ({ handleLike, showNotification, blogs, loggedUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedUser) {
      showNotification("Please Login to browse blogs", "fail");
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (!loggedUser) {
      showNotification("Please Login to browse blogs", "fail");
      navigate("/");
    }
  }, [loggedUser]);

  return (
    <>
      {loggedUser && (
        <div className="blog grid gap-2 animate-fadeIn">
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
      )}
    </>
  );
};
