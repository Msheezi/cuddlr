import React from "react";

const Thread = ({ props, message }) => {
  let threadedMessages = message.map((message) => {
    return (
      <>
        <p>{message.content}</p>
      </>
    );
  });
  return <div>{threadedMessages}</div>;

  // return ("test")
};

export default Thread;
