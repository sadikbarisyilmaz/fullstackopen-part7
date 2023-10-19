import { FcLike } from "react-icons/fc";
export const LikeButton = ({ blog, handleLike }) => {
  return (
    <div>
      <button
        className="likeBtn px-2  
   rounded-md flex group gap-1 transition-all duration-150 ease-in-out;"
        onClick={() => handleLike(blog)}
      >
        <span>Like</span>
        <span className=" group-hover:opacity-100 opacity-50 transition-all duration-150 ease-in-out text-lg mt-[2px]">
          <FcLike />
        </span>
      </button>
    </div>
  );
};
