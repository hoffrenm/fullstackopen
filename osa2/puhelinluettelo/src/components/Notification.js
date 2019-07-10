import React from "react";

const base = {
  color: "black",
  background: "lightgrey",
  fontSize: 24,
  borderRadius: 7,
  borderStyle: "solid",
  padding: 20,
  marginBottom: 10,
  width: 800
};

const success = { ...base, color: "green", borderColor: "green" };
const fail = { ...base, color: "red", borderColor: "red" };

const Notification = ({ notification }) => {
  const message = notification.message;
  const type = notification.type;

  if (!message) {
    return <div />;
  }

  let style = base;

  if (type === "success") {
    style = success;
  } else if (type === "fail") {
    style = fail;
  }

  return (
    <div className="notification" style={style}>
      {message}
    </div>
  );
};

export default Notification;
