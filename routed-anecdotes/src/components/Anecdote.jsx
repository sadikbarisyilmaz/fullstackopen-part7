import React from "react";
import { useParams } from "react-router-dom";

export const Anecdote = ({ anecdote }) => {
  const params = useParams();
  return (
    <div>
      <h1>"{anecdote.content}"</h1>
      <p>- Has {anecdote.votes} votes.</p>
    </div>
  );
};
