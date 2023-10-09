import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../services/blogs";
import { removeBlogs } from "../reducers/blogsReducer";
import { newNotification } from "../reducers/notificationReducer";

export const Blog = ({
  blog,
  token,
  username,
  handleLike,
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
    <div className="indv-blog" style={blogStyle}>
      <div>
        <span className="title">{blog.title}</span> -{" "}
        <span className="author">{blog.author}</span>
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
            URL:
            <a href={blog.url} className="url" target="_blank">
              {blog.url}
            </a>
          </div>
          <div>
            Likes:<span className="likes"> {blog.likes} </span>
            <button onClick={() => handleLike(blog, token)}>Like</button>
          </div>
          <div>Created by: {blog.user.name}</div>
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
