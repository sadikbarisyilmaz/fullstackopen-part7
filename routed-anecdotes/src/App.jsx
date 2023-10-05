import { useState } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import { Home } from "./components/Home";
import { CreateNew } from "./components/CreateNew";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Anecdote } from "./components/Anecdote";
import { Menu } from "./components/Menu";
import Notification from "./components/Notification";
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />
      <div style={{ padding: "50px 0px 50px 0px" }}>
        <Routes>
          <Route
            path="/"
            element={<Home anecdotes={anecdotes} setAnecdotes={setAnecdotes} />}
          />
          <Route
            path="/createNew"
            element={<CreateNew setAnecdotes={setAnecdotes} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdote={anecdote} element={Anecdote} />}
          />
        </Routes>
      </div>
      <Footer />

      {/* 
      <Menu />
      <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer /> */}
    </div>
  );
};

export default App;
