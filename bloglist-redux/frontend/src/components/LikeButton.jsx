import { newNotification } from "../reducers/notificationReducer";
import { likeBlog } from "../reducers/blogsReducer";
import { updateBlog } from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";

export const LikeButton = ({ blog, handleLike }) => {
  const showNotification = async (msg, type) => {
    dispatch(newNotification([msg, type]));
    setTimeout(() => {
      dispatch(newNotification([]));
    }, 5000);
  };

  const dispatch = useDispatch();
  return (
    <div>
      <button className="likeBtn" onClick={() => handleLike(blog)}>
        Like
      </button>
    </div>
  );
};
