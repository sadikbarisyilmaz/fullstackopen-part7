import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

export const CreateNew = ({ setAnecdotes }) => {
  const [notification, setNotification] = useContext(NotificationContext);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

  const navigate = useNavigate();
  function setId() {
    return Math.floor(Math.random() * 1000);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setAnecdotes((prev) => [
      ...prev,
      {
        content,
        author,
        info,
        votes: 0,
        id: setId(),
      },
    ]);
    setNotification(`Anecdote "${content}" created.`);
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            required
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            required
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            required
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
