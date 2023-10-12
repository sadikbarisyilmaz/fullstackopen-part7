import { useDispatch } from "react-redux";
import { addComment } from "../services/blogs";
import { LikeButton } from "./LikeButton";
import { commentBlog } from "../reducers/blogsReducer";
import { useState } from "react";
import { newNotification } from "../reducers/notificationReducer";

export const Blog = ({ blog, handleLike }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const showNotification = async (msg, type) => {
    dispatch(newNotification([msg, type]));
    setTimeout(() => {
      dispatch(newNotification([]));
    }, 5000);
  };

  const handleComment = (e) => {
    e.preventDefault();
    const commentedBlog = { ...blog, comments: [...blog.comments, comment] };
    addComment(commentedBlog, blog.id).then((e) => {
      if (e.status === 201) {
        showNotification(
          `Posted Comment on "${blog.title}" by ${blog.author}`,
          "success"
        );
        setComment("");
      } else {
        showNotification(`Posting Comment failed`, "fail");
      }
    });
    dispatch(commentBlog(commentedBlog));
  };

  if (!blog) {
    return null;
  }
  return (
    <div className="animate-fadeIn">
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <div className="flex gap-2">
        <span className="likes">{blog.likes}</span>
        <label>Likes</label>
        <LikeButton handleLike={handleLike} blog={blog} />
      </div>
      <p>added by {blog.author}</p>
      <hr />
      <h2>Comments</h2>
      <div>
        <h3>Add Comment</h3>
        <form>
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            required
            minLength={3}
            name="comment"
            value={comment}
          />
          <input onClick={handleComment} type="submit" value="Post" />
        </form>
      </div>
      <div>
        <ul>
          {blog.comments &&
            blog.comments.map((comment, i) => {
              return <li key={i}>{`"${comment}"`}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};
