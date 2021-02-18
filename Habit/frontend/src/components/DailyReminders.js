import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function DailyReminders({ leaveAccountCallback }) {
  const params = useParams();
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [listOfHabits, setListOfHabits] = useState({});
  const [habitId, setHabitId] = useState(null);

  useEffect(() => {
    fetch("api/userIdValid" + "?user_id=" + params.userId)
      .then((response) => {
        if (!response.ok) {
          leaveAccountCallback();
          history.push("/ErrorPage");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (!data) {
          setUserId(null);
        } else {
          setUserId(data.user_id);
          getHabits(data.user_id);
        }
      });
  }, []);

  const getHabits = (user_id) => {
    console.log(user_id);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    };
    fetch("api/getUserHabits", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("No User ID: ", response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          setListOfHabits(data);
          setHabitId(data.habit_id);
        } else {
          console.log("No Data");
        }
      });
  };

  if (!userId) {
    return null;
  }

  if (!listOfHabits) {
    return (
      <div>
        <h1>{habitId}</h1>
        <h2>No Habits added..</h2>
        <h2>Add a Habit</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>{userId}</h1>
      <p>{habitId}</p>
    </div>
  );
}

export default DailyReminders;
