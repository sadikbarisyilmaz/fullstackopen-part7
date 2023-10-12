import { BiLike } from "react-icons/bi";
export const LikeButton = ({ blog, handleLike }) => {
  return (
    <div>
      <button
        className="likeBtn px-2 bg-blue-400 hover:bg-blue-500 text-white
   rounded-md flex gap-1 transition-all duration-150 ease-in-out;"
        onClick={() => handleLike(blog)}
      >
        <span>Like</span>
        <span className="mt-1">
          <BiLike />
        </span>
      </button>
    </div>
  );
};
