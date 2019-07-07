import React, { useState } from "react";
import ReactDOM from "react-dom";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const TopAnecdote = ({ anecdotes, points }) => {
  if (points.reduce((a, b) => a + b) === 0) {
    return <div>Nothing has been voted yet</div>;
  }

  const i = points.indexOf(Math.max(...points));

  return (
    <div>
      {anecdotes[i]}
      <p>Has {points[i]} votes</p>
    </div>
  );
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleRandomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVote = index => {
    const temp = [...points];
    temp[index] += 1;
    setPoints(temp);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <p>Has {points[selected]} votes</p>
      <button onClick={() => handleRandomAnecdote()}>Next anecdote</button>
      <button onClick={() => handleVote(selected)}>Vote</button>

      <h1>Anecdote with the most votes</h1>
      <TopAnecdote anecdotes={props.anecdotes} points={points} />
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
