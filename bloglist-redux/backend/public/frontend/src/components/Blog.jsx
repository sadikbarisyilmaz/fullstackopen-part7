import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../services/blogs";
import { LikeButton } from "./LikeButton";
import { commentBlog } from "../reducers/blogsReducer";
import { useState } from "react";
import { newNotification } from "../reducers/notificationReducer";
import { Loader } from "./Loader";
import { RiDeleteBinLine } from "react-icons/ri";

export const Blog = ({ blog, handleLike }) => {
  const [comment, setComment] = useState("");
  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const showNotification = async (msg, type) => {
    dispatch(newNotification([msg, type]));
    setTimeout(() => {
      dispatch(newNotification([]));
    }, 5000);
  };
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
  const handleComment = (e) => {
    e.preventDefault();
    if (comment.length < 5) {
      showNotification(`Your comment should be more than 5 characters`, "fail");
      return;
    }
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
          <div className="flex bg-white flex-col md:py-10 md:px-10 p-4 shadow-xl rounded-md">
            <h1 className="py-10 text-3xl md:text-5xl text-[#ff5a19]">
              {blog.title}
            </h1>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg mb-4 md:text-2xl">
                  Blog by <span className="font-bold">{blog.author}</span>
                </h2>
                <div className="flex gap-2 ">
                  <h2 className="font-bold">Link: </h2>
                  <a href="blog.url" target="_blank">
                    {`${blog.url}`}
                  </a>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Likes: </h2>
                  <span className="likes">{blog.likes}</span>
                  <LikeButton handleLike={handleLike} blog={blog} />
                </div>
                {loggedUser.username === blog.user.username && (
                  <div className="flex gap-2">
                    <h2 className="font-bold">Delete post </h2>
                    <button
                      className="w-fit hover:border-red-600 hover:text-red-600
          rounded-md text-sm flex gap-1 transition-all duration-150 ease-in-out;"
                      id="likeButton"
                      onClick={handleDelete}
                    >
                      <span className=" text-xl mr-1 mt-[2px]">
                        <RiDeleteBinLine />
                      </span>
                    </button>
                  </div>
                )}
                {loggedUser.username !== blog.user.username && (
                  <>
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
                  </>
                )}
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
