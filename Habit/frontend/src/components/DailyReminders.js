import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import HabitBlock from "./HabitBlock";
import LoadingPage from "./LoadingPage";
import { Button, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function DailyReminders({ leaveAccountCallback }) {
  const params = useParams();
  const history = useHistory();

  const listOfAllHabits = new Set();

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [listOfHabits, setListOfHabits] = useState(null);
  const [listOfAvailableHabits, setListOfAvailableHabits] = useState([]);

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
          // console.log(data);
          setUserName(data.user_name);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setUserId(data.user_id);
          getHabits(data.user_id);
          // getAllHabits();
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
          for (let habit in data.list_of_habits) {
            listOfAllHabits.add(data.list_of_habits[habit].habit_id.habit_id);
          }
          setListOfHabits(data.list_of_habits);
          getAllHabits();
        } else {
          console.log("No Data");
          setListOfHabits([]);
        }
      });
  };

  const getAllHabits = () => {
    fetch("api/getAllHabits")
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          for (let habit in data.list_of_all_habits) {
            if (
              !listOfAllHabits.has(
                data.list_of_all_habits[habit].habit_id
              )
            ) {
              listOfAvailableHabits.push(data.list_of_all_habits[habit].habit_name);
            }
          }

          console.log(listOfAvailableHabits);
        } else {
          console.log("No Data");
        }
      });
  };

  const addHabitButtonClicked = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        habit_name: "Gym",
      }),
    };
    fetch("api/addHabit", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("Bad Response: ", response);
        } else {
          console.log("Good Response: ", response);
          return response.json();
        }
      })
      .then((data) => {
        if (!data) {
          console.log("No Data!");
        } else {
          console.log(data);
          getHabits(userId);
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

  const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };


  return (
    <div style={buttonStyle}>
      <Typography variant="h3" align="center">
        {userName}
      </Typography>
      <br />
      {/* Add a Autocomplete Componenent to display all available Habits to choose from when adding a Habit
        Link - https://material-ui.com/components/autocomplete/ */}
      <Button
        variant="contained"
        color="secondary"
        endIcon={<AddCircleIcon />}
        onClick={addHabitButtonClicked}
      >
        ADD A HABIT
      </Button>
      <br />
      <br />
      {listOfHabits.map((habit) => {
        return (
          <div>
            <HabitBlock
              habitName={habit.habit_id.habit_name}
              startDate={habit.start_date}
              streak={habit.streak}
              habitId={habit.habit_id.habit_id}
              userId={userId}
              getHabits={getHabits}
            />
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default DailyReminders;
