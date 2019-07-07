import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <table>
      <tbody>
        <Statistic value={good} text="Good" />
        <Statistic value={neutral} text="Neutral" />
        <Statistic value={bad} text="Bad" />
        <Statistic value={total} text="All" />
        <Statistic value={average} text="Average" />
        <Statistic value={positive} text="Positive" suffix="%" />
      </tbody>
    </table>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ value, text, suffix }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {suffix}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodVote = () => setGood(good + 1);
  const handleNeutralVote = () => setNeutral(neutral + 1);
  const handleBadVote = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodVote} text="Good" />
      <Button handleClick={handleNeutralVote} text="Neutral" />
      <Button handleClick={handleBadVote} text="Bad" />

      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
