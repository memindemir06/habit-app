import React, { useState, useEffect, useDebugValue } from "react";
import { useParams, useHistory } from "react-router-dom";
import HabitBlock from "./HabitBlock";
import LoadingPage from "./LoadingPage";
import { Button, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
  const [open, setOpen] = useState(false);
  const [habitAdded, setHabitAdded] = useState();

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
          setUserName(data.user_name);
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
          for (let habit in data.list_of_habits) {
            listOfAllHabits.add(data.list_of_habits[habit].habit_id.habit_id);
          }
          setListOfHabits(data.list_of_habits.reverse());
          // listOfHabits.reverse();
          getAllHabits();
        } else {
          console.log("No Data");
          setListOfHabits([]);
        }
      });
  };

  const getAllHabits = () => {
    listOfAvailableHabits.length = 0;
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
            if (!listOfAllHabits.has(data.list_of_all_habits[habit].habit_id)) {
              listOfAvailableHabits.push(
                data.list_of_all_habits[habit].habit_name
              );
            }
          }
          console.log(listOfAvailableHabits);
        } else {
          console.log("No Data");
        }
      });
  };

  const addHabitButtonClicked = (habitName) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        habit_name: habitName,
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
          console.log("No Data: ", data);
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

  const reminderStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid rgba(0,0,0,0.5)",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.05)",
  };

  const dialogTitleStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const handleListItemClick = (value) => {
    setOpen(false);
    addHabitButtonClicked(value);
  };

  return (
    <div style={reminderStyle}>
      <Typography variant="h3" align="center">
        {userName}
      </Typography>
      <br />
      <Button
        variant="contained"
        color="secondary"
        endIcon={<AddCircleIcon />}
        onClick={() => setOpen(true)}
      >
        ADD A HABIT
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <MuiDialogTitle
          style={dialogTitleStyle}
          disableTypography
          id="simple-dialog-title"
        >
          <Typography variant="h6">Select a Habit</Typography>
          {open ? (
            <IconButton aria-label="close" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
        <List>
          {listOfAvailableHabits.map((habit) => (
            <ListItem
              button
              onClick={() => handleListItemClick(habit)}
              key={habit}
            >
              <ListItemText primary={habit} />
            </ListItem>
          ))}
        </List>
      </Dialog>
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
