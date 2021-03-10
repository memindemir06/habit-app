import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
  Container,
  Tooltip,
} from "@material-ui/core";
import { palette } from "@material-ui/system";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DeleteIcon from "@material-ui/icons/Delete";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

const styles = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  Container: {
    background: "#000000",
  },
};

const HabitBlock = ({
  habitName,
  startDate,
  streak,
  completed,
  habitId,
  userId,
  getHabits,
}) => {
  const [expanded, setExpanded] = useState(false);
  let i = 0;

  const handleExpandClick = () => {
    handleHabitStatus();
    setExpanded(!expanded);
  };

  // setInterval(handleExpandClick, 1000);

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
    fetch("api/removeHabit", requestOptions)
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
          getHabits(userId);
        }
      });
  };

  const handleHabitStatus = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        habit_id: habitId,
        // purpose = increment / decrement / reset
        purpose: "reset",
      }),
    };
    fetch("api/handleCompleted", requestOptions)
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

  return (
    <div>
      {/* <ThemeProvider theme={theme}>
        <Container style={{ backgroundColor: "orange" }}>

        </Container>
      </ThemeProvider> */}
      <Container>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={habitName}
              action={
                <div>
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
                <Typography variant="h6">Start Date: {startDate}</Typography>
                <Typography variant="h6">Streak: {streak}</Typography>
                <Typography variant="h6">
                  Completed: {completed ? "True" : "False"}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

export default HabitBlock;
