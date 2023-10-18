import { useDispatch } from "react-redux";
import { addComment } from "../services/blogs";
import { LikeButton } from "./LikeButton";
import { commentBlog } from "../reducers/blogsReducer";
import { useState } from "react";
import { newNotification } from "../reducers/notificationReducer";
import { Loader } from "./Loader";

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
    return (
      <div className="animate-fadeIn grow bg-[#fffdfa] px-6 md:px-28 pt-28 pb-4 flex flex-col justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      {blog !== undefined ? (
        <div className="animate-fadeIn grow bg-[#fffdfa] px-6 md:px-28 pt-28 pb-4 flex flex-col justify-center items-center">
          <div className="flex bg-white flex-col md:py-10 md:px-10 px-4 shadow-xl rounded-md">
            <h1 className="py-10 text-3xl md:text-5xl text-[#ff5a19]">
              {blog.title}
            </h1>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl mb-4 md:text-2xl">
                  Post by {blog.author}
                </h2>
                <div className="flex gap-2 ">
                  <h2 className="font-bold">Blog Link: </h2>
                  <a className=" " href="blog.url" target="_blank">
                    <p className="break-normal">{blog.url}</p>
                  </a>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Lİkes: </h2>
                  <span className="likes">{blog.likes}</span>
                  <LikeButton handleLike={handleLike} blog={blog} />
                </div>
                <h3>Add Comment</h3>
                <form>
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    required
                    placeholder="Leave a comment"
                    minLength={3}
                    name="comment"
                    value={comment}
                    className="mt-2 w-full p-2 rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                  />
                </form>
                <input
                  className="btn-primary w-20"
                  onClick={handleComment}
                  type="submit"
                  value="Post"
                />
              </div>
              <div className="max-h-[250px] overflow-y-scroll no-scrollbar">
                {blog.comments.length > 0 && (
                  <>
                    <h2 className="text-xl mb-4 md:text-2xl">Comments</h2>
                    <ul className="max-h-[200px] overflow-y-scroll no-scrollbar">
                      {blog.comments &&
                        blog.comments.map((comment, i) => {
                          return <li key={i}>{`"${comment}"`}</li>;
                        })}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
