import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = ({ store }) => {
  const vote = id => {
    store.dispatch(voteAnecdote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {store
        .getState()
        .sort((a, b) => a.votes < b.votes)
        .map(a => (
          <div key={a.id}>
            <div>{a.content}</div>
            <div>
              has {a.votes}
              <button onClick={() => vote(a.id)}>Vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;

/* <h2>Anecdotes</h2>
  anecdotes
    .sort((a, b) => a.votes < b.votes)
    .map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
)) */
