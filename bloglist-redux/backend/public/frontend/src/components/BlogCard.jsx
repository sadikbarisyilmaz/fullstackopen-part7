import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../services/blogs";
import { removeBlogs } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiBookmark3Fill } from "react-icons/ri";

export const BlogCard = ({
  blog,
  token,
  username,
  handleLike, //for tests
  showNotification,
}) => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
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

  return (
    <div className="p-4 max-w-md border flex gap-2 transition ease-in-out delay-150 rounded-lg bg-white shadow-md">
      <div className="text-3xl md:text-4xl text-yellow-500">
        <Link to={`/blogs/${blog.id}`}>
          <RiBookmark3Fill />
        </Link>
      </div>
      <div className="w-full grid gap-2">
        <div className="flex gap-2 justify-between">
          <p className="title grid">
            <span className="author text-xs md:text-sm">
              Author: {blog.author}
            </span>
            <Link to={`/blogs/${blog.id}`}>
              <span className="indv-blog font-bold text-sm md:text-lg">
                {blog.title}
              </span>
            </Link>
          </p>
          <div className="-mt-1">
            <button
              onClick={() => (toggle ? setToggle(false) : setToggle(true))}
            >
              {toggle ? (
                <>
                  <div className="flex gap-1  items-center">
                    <span className="font-semibold text-sm md:text-md">
                      Hide
                    </span>
                    <span className="mt-[1px]">
                      <IoIosArrowUp />
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-1 items-center">
                    <span className="font-semibold text-sm md:text-md">
                      View
                    </span>
                    <span className="mt-[1px]">
                      <IoIosArrowDown />
                    </span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
        <div
          className={`${
            toggle ? " h-20" : "h-0"
          } transition-all duration-300 overflow-hidden w-full`}
        >
          <div className="text-sm flex flex-col gap-1">
            <div>
              <label>URL: </label>
              <a href={blog.url} className="url" target="_blank">
                {blog.url}
              </a>
            </div>
            <div className="flex gap-2">
              <label>Likes: </label>
              <span className="likes">{blog.likes}</span>
              <LikeButton handleLike={handleLike} blog={blog} />
            </div>
            <div>
              <label>Created by: </label>
              <Link to={`/users/${blog.user.id}`}>
                <span>{blog.user.name}</span>
              </Link>
            </div>
            {username === blog.user.username && (
              <button
                className="likeBtn w-fit px-2 border border-black hover:border-red-600 hover:text-red-600
          rounded-md text-sm flex gap-1 transition-all duration-150 ease-in-out;"
                id="likeButton"
                onClick={handleDelete}
              >
                <span>Remove</span>
                <span className="mt-[3.5px]">
                  <RiDeleteBinLine />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
