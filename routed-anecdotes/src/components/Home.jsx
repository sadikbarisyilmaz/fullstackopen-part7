import React from "react";
import { AnecdoteList } from "./AnecdoteList";

export const Home = ({ anecdotes, setAnecdotes }) => {
  return (
    <div>
      <AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
    </div>
  );
};
