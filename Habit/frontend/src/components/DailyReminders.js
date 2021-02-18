import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function DailyReminders({ leaveAccountCallback }) {
  const params = useParams();
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [listOfHabits, setListOfHabits] = useState(null);

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
        }
      });
  }, []);

  useEffect(() => {
    fetch().then().then();
  }, []);

  if (!userId) {
    return null;
  } else if (!istOfHabits[0]) {
    return (
      <div>
        <h2>No Habits added..</h2>
        <h2>Add a Habit</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>{userId}</h1>
      <p>text</p>
    </div>
  );
}

export default DailyReminders;
