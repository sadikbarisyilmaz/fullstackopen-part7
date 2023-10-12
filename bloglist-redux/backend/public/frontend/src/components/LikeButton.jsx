export const LikeButton = ({ blog, handleLike }) => {
  return (
    <div>
      <button className="likeBtn" onClick={() => handleLike(blog)}>
        Like
      </button>
    </div>
  );
};
