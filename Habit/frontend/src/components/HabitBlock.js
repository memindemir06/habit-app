import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  Divider,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  habitContainer: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
}));

const HabitBlock = ({
  habitName,
  startDate,
  streak,
  completed,
  habitId,
  userId,
  getHabits,
  setHabitStatus,
  setAlertOpen,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [streakClicked, setStreakClicked] = useState(completed);
  const classes = useStyles();
  const theme = useTheme();

  const handleStreakClicked = (event) => {
    setStreakClicked(!streakClicked);
    if (streakClicked) {
      handleHabitStatus("decrement");
    } else {
      handleHabitStatus("increment");
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClicked = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        habit_id: habitId,
      }),
    };
    fetch("../api/removeHabit", requestOptions)
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
          console.log(habitName);
          setHabitStatus(false);
          setAlertOpen(true);
          getHabits(userId);
        }
      });
  };

  const handleHabitStatus = (purpose) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        habit_id: habitId,
        // purpose = increment / decrement / reset
        purpose: purpose,
      }),
    };
    fetch("../api/handleCompleted", requestOptions)
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
          getHabits(userId);
        }
      });
  };

  const parseDate = (dateString) => {
    const b = dateString.split(/\D+/);
    const offsetMult = dateString.indexOf("+") !== -1 ? -1 : 1;
    const hrOffset = offsetMult * (+b[7] || 0);
    const minOffset = offsetMult * (+b[8] || 0);
    return new Date(
      Date.UTC(
        +b[0],
        +b[1] - 1,
        +b[2],
        +b[3] + hrOffset,
        +b[4] + minOffset,
        +b[5],
        +b[6] || 0
      )
    );
  };

  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Card className={classes.habitContainer}>
            <CardHeader
              title={habitName}
              action={
                <div>
                  <Tooltip title="Update streak">
                    <Checkbox
                      onChange={handleStreakClicked}
                      checked={streakClicked}
                    >
                      <DeleteIcon />
                    </Checkbox>
                  </Tooltip>
                  <Tooltip title="Delete habit">
                    <IconButton onClick={handleDeleteClicked}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton onClick={handleExpandClick}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </div>
              }
            />
            <Collapse in={expanded} timeout="auto">
              <CardContent>
                <Typography variant="h6">
                  Start Date: {parseDate(startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="h6">Streak: {streak}</Typography>
                <Typography variant="h6">
                  Completed: {completed ? "True" : "False"}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

export default HabitBlock;
