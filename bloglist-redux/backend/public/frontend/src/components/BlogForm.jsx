import { useState } from "react";

export const BlogForm = ({ handleSubmit, setShowBlogForm }) => {
  const [blogForm, setBlogForm] = useState({
    title: "",
    author: "",
    url: "",
  });

  const fireSubmit = (e) => {
    e.preventDefault();
    handleSubmit(blogForm, setBlogForm);
  };

  return (
    <div className="z-50 bg-black bg-opacity-70 h-screen w-screen flex justify-center items-center fixed top-0 left-0">
      <div className="p-10 bg-white rounded-2xl">
        <h3>Create new</h3>
        <form onSubmit={fireSubmit}>
          <div>
            Title
            <br />
            <input
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

          <div>
            Author
            <br />
            <input
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
          <div>
            Url
            <br />
            <input
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
          <br />
          <button type="submit">Submit</button>
        </form>
        <button
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
