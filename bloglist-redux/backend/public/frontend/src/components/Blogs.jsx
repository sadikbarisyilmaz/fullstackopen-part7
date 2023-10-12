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
    <div className="grid h-fit animate-fadeIn gap-6">
      <div className="border-b py-4">
        <h2 className="text-white text-4xl">Blogs</h2>
      </div>
      {loggedUser && (
        <div className="blog flex gap-2 ">
          <div className="grid gap-2">
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
          <div className="bg-white rounded-md h-fit p-4">asdad</div>
        </div>
      )}
    </div>
  );
};
