import React, { useState, useEffect, useDebugValue } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Tab,
  Tabs,
  AppBar,
  Divider,
} from "@material-ui/core";
import {
  Dialog,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
// Components
import HabitBlock from "./HabitBlock";
import LoadingPage from "./LoadingPage";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    margin: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(2),
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
  tabs: {
    backgroundColor: "transparent",
    boxShadow: "none",
    display: "flex",
  },
  divider: {
    marginLeft: theme.spacing(3),
    width: "340px",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function DailyReminders({
  userId,
  userName,
  firstName,
  lastName,
  darkState,
  setDarkState,
}) {
  const params = useParams();
  const history = useHistory();

  const listOfAllHabits = new Set();

  const [listOfHabits, setListOfHabits] = useState(null);
  const [listOfAvailableHabits, setListOfAvailableHabits] = useState([]);
  const [open, setOpen] = useState(false);
  // const [habitAdded, setHabitAdded] = useState();
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const theme = useTheme();
  const tabColor = darkState ? "#ffffff" : "#000000";
  // const [habitsCompletedState, sethabitsCompletedState] = useState(false);
  // const [habitsPending, setHabitsPending] = useState(false);

  useEffect(() => {
    if (userId) {
      getHabits(userId);
    }
  }, [userId]);

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
    fetch("../api/getUserHabits", requestOptions)
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
          for (let habit in data.list_of_habits) {
            listOfAllHabits.add(data.list_of_habits[habit].habit_id.habit_id);
          }
          setListOfHabits(data.list_of_habits.reverse());
          getAllHabits();
        } else {
          console.log("No Data");
          setListOfHabits([]);
        }
      });
  };

  const getAllHabits = () => {
    listOfAvailableHabits.length = 0;
    fetch("../api/getAllHabits")
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
    fetch("../api/addHabit", requestOptions)
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
  };

  const dialogTitleStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const mainStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleListItemClick = (value) => {
    setOpen(false);
    addHabitButtonClicked(value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let tempPending = false;
  let tempCompleted = false;

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">
        {"u/" + userName}
      </Typography>
      <br />

      <AppBar position="static" className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab style={{ marginLeft: "2em", color: tabColor }} label="Pending" />
          <Tab style={{ color: tabColor }} label="Completed" />
          <div style={{ flexGrow: 1 }}></div>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: "2em" }}
            endIcon={<AddCircleIcon />}
            onClick={() => setOpen(true)}
          >
            ADD A HABIT
          </Button>
        </Tabs>
      </AppBar>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          {listOfHabits.map((habit) => {
            let index = listOfHabits.findIndex(
              (habitItem) => habitItem.habit_id === habit.habit_id
            );
            if (!habit.completed) {
              tempPending = true;
              return (
                <div>
                  <HabitBlock
                    habitName={habit.habit_id.habit_name}
                    startDate={habit.start_date}
                    streak={habit.streak}
                    habitId={habit.habit_id.habit_id}
                    userId={userId}
                    getHabits={getHabits}
                    completed={habit.completed}
                  />
                </div>
              );
            } else if (index == listOfHabits.length - 1 && !tempPending) {
              return (
                <div>
                  <h3>No habits here...</h3>
                </div>
              );
            }
          })}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {listOfHabits.map((habit) => {
            let index = listOfHabits.findIndex(
              (habitItem) => habitItem.habit_id === habit.habit_id
            );
            if (habit.completed) {
              tempCompleted = true;
              return (
                <div>
                  <HabitBlock
                    habitName={habit.habit_id.habit_name}
                    startDate={habit.start_date}
                    streak={habit.streak}
                    userId={userId}
                    habitId={habit.habit_id.habit_id}
                    completed={habit.completed}
                    getHabits={getHabits}
                  />
                  <br />
                </div>
              );
            } else if (index == listOfHabits.length - 1 && !tempCompleted) {
              return (
                <div>
                  <h3>No habits here...</h3>
                </div>
              );
            }
          })}
        </TabPanel>
      </SwipeableViews>

      <div style={mainStyle}>
        <div style={reminderStyle}>
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
        </div>
      </div>
    </div>
  );
}

export default DailyReminders;
