import { LikeButton } from "./LikeButton";

export const Blog = ({ blog }) => {
  if (!blog) {
    return null;
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <LikeButton blog={blog} />
      <p>added by {blog.author}</p>
    </div>
  );
};
