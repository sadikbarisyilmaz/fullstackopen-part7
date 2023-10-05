import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";
import { useField } from "../hooks";

export const CreateNew = ({ setAnecdotes }) => {
  const [notification, setNotification] = useContext(NotificationContext);

  const content = useField("text");
  const info = useField("text");
  const author = useField("text");

  const navigate = useNavigate();

  function setId() {
    return Math.floor(Math.random() * 1000);
  }

  const reset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnecdotes((prev) => [
      ...prev,
      {
        content: content.value,
        auhtor: author.value,
        info: info.value,
        votes: 0,
        id: setId(),
      },
    ]);
    setNotification(`Anecdote "${content.value}" created.`);
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} reset="" />
        </div>
        <div>
          author
          <input name="author" {...author} reset="" />
        </div>
        <div>
          url for more info
          <input name="info" {...info} reset="" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
