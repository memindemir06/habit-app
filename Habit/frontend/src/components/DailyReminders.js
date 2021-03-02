import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import HabitBlock from "./HabitBlock";
import LoadingPage from "./LoadingPage";
import { Button, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function DailyReminders({ leaveAccountCallback }) {
  const params = useParams();
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [listOfHabits, setListOfHabits] = useState(null);
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
          console.log(data);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setUserId(data.user_id);
          getHabits(data.user_id);
        }
      });
  }, []);

  const getHabits = (user_id) => {
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
          setListOfHabits(data.list_of_habits);
          setHabitId(data.list_of_habits[0].habit_id.habit_id);
        } else {
          console.log("No Data");
          setListOfHabits([]);
        }
      });
  };
  
  if (!userId || !listOfHabits) {
    return <LoadingPage />;
  }

  // If no Habits yet added
  if (listOfHabits == []) {
    return (
      <div>
        <h2>No Habits added..</h2>
        <h2>Add a Habit</h2>
      </div>
    );
  }

  return (
    <div>      
      <Typography variant="h3" align="center">{firstName + " " + lastName}</Typography>
      <br />
      <Button variant="contained" color="secondary" endIcon={<AddCircleIcon />} > ADD A HABIT </Button>
      {listOfHabits.map((habit) => {
        return (
          <div>
            <HabitBlock
              habitName={habit.habit_id.habit_name}
              startDate={habit.start_date}
              streak={habit.streak}
            />
            <br/>
          </div>
        );
      })}
    </div>
  );
}

export default DailyReminders;
