import { newNotification } from "../reducers/notificationReducer";
import { likeBlog } from "../reducers/blogsReducer";
import { updateBlog } from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";

export const LikeButton = ({ blog }) => {
  const handleLike = async (blog, token) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(likedBlog, token, blog.id).then((e) => {
      if (e.status === 201) {
        showNotification(`Liked "${blog.title}" by ${blog.author}`, "success");
      } else {
        showNotification(`Like failed`, "fail");
      }
    });
    dispatch(likeBlog(likedBlog));
  };

  const showNotification = async (msg, type) => {
    dispatch(newNotification([msg, type]));
    setTimeout(() => {
      dispatch(newNotification([]));
    }, 5000);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <div>
      <span className="likes"> {blog.likes} Likes </span>
      <button onClick={() => handleLike(blog, user.token)}>Like</button>
    </div>
  );
};
