import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../services/blogs";
import { removeBlogs } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";
import { LikeButton } from "./LikeButton";

export const BlogList = ({
  blog,
  token,
  username,
  handleLike, //for tests ?
  showNotification,
}) => {
  const [toggle, setToggle] = useState(false);
  const blogStyle = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const dispatch = useDispatch();
  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      dispatch(removeBlogs(blog));
      deleteBlog(token, blog.id).then((e) => {
        if (e.status === 204) {
          showNotification(
            `Removed "${blog.title}" by ${blog.author}`,
            "success"
          );
        } else {
          showNotification(`Blot not found`, "fail");
        }
      });
    } else {
      return;
    }
  };

  return (
    <div style={blogStyle}>
      <div className="flex justify-between">
        <p className="title">
          <Link to={`/blogs/${blog.id}`}>
            <span className="indv-blog">{blog.title}</span>
          </Link>{" "}
          <span className="author"> - {blog.author}</span>
        </p>
        <button
          style={{ marginLeft: 5 }}
          onClick={() => (toggle ? setToggle(false) : setToggle(true))}
        >
          {toggle ? "Hide" : "View"}
        </button>
      </div>
      {toggle && (
        <div>
          <div>
            <label>Url: </label>
            <a href={blog.url} className="url" target="_blank">
              {blog.url}
            </a>
            <div className="flex gap-2">
              <label>Likes: </label>
              <span className="likes">{blog.likes}</span>
              <LikeButton handleLike={handleLike} blog={blog} />
            </div>
          </div>
          <div>
            <label>Created by: </label>
            <span>{blog.user.name}</span>
          </div>
          {username === blog.user.username && (
            <button id="likeButton" onClick={handleDelete}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};
