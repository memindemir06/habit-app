import React from "react";

const FriendBlock = ({ firstName, lastName }) => {
  return (
    <div>
      <h2>{firstName + " " + lastName}</h2>
    </div>
  );
};

export default FriendBlock;
