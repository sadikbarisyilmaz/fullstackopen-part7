import { useState } from "react";

export const BlogForm = ({ handleSubmit, setShowBlogForm, loading }) => {
  const [blogForm, setBlogForm] = useState({
    title: "",
    author: "",
    url: "",
  });
  console.log(loading);
  const fireSubmit = (e) => {
    e.preventDefault();
    handleSubmit(blogForm, setBlogForm);
  };

  return (
    <div className="z-10 bg-black text-black bg-opacity-70 h-screen w-screen flex justify-center items-center fixed top-0 left-0 animate-fadeIn">
      <div className="p-10 grid bg-white rounded-2xl">
        <h3 className="text-2xl text-center font-semibold mb-6">
          Create New Blog
        </h3>
        <form className="grid gap-2" onSubmit={fireSubmit}>
          <div className="grid">
            <label className="text-[#ff5a19]   font-bold">Title</label>
            <input
              className="input"
              id="title"
              type="text"
              value={blogForm.title}
              name="Title"
              placeholder="Title"
              onChange={({ target }) =>
                setBlogForm((prev) => ({
                  ...prev,
                  title: target.value,
                }))
              }
            />
          </div>

          <div className="grid">
            <label className="text-[#ff5a19]   font-bold">Author</label>

            <input
              className="input"
              id="author"
              type="text"
              value={blogForm.author}
              name="author"
              placeholder="author"
              onChange={({ target }) =>
                setBlogForm((prev) => ({
                  ...prev,
                  author: target.value,
                }))
              }
            />
          </div>
          <div className="grid">
            <label className="text-[#ff5a19]   font-bold">Url</label>
            <input
              className="input"
              id="url"
              type="text"
              value={blogForm.url}
              name="url"
              placeholder="url"
              onChange={({ target }) =>
                setBlogForm((prev) => ({
                  ...prev,
                  url: target.value,
                }))
              }
            />
          </div>

          <button
            disabled={loading}
            className="btn-primary w-full mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>
        <button
          className="btn-secondary w-full mt-1"
          onClick={() => {
            setShowBlogForm(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
