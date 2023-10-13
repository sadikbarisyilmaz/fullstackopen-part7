import { FcLike } from "react-icons/fc";
export const LikeButton = ({ blog, handleLike }) => {
  return (
    <div>
      <button
        className="likeBtn px-2  
   rounded-md flex gap-1 transition-all duration-150 ease-in-out;"
        onClick={() => handleLike(blog)}
      >
        <span>Like</span>
        <span className=" hover:opacity-100 opacity-50 transition-all duration-150 ease-in-out text-lg">
          <FcLike />
        </span>
      </button>
    </div>
  );
};
