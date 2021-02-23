import React from "react";

const HabitBlock = ({ habitName, startDate, streak }) => {
  return (
    <div>
      <h1>{habitName}</h1>
      <p>{startDate}</p>
      <p>{streak}</p>
    </div>
  );
};

export default HabitBlock;
