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

const colourList = ["#E27D60", "#659DBD", "#E8A87C", "#C38D9E", "#41B3A3"];
const useStyles = makeStyles((theme) => ({
  habitContainer: {
    boxShadow: "none",
  },
}));

const ProfileHabitBlock = ({ habitName, startDate, streak, completed }) => {
  const classes = useStyles();
  const theme = useTheme();
  let alignCheck = true;

  const AlignHabitRight = () => {
    alignCheck = !alignCheck;
    return <CardHeader style={{ flexGrow: 1 }} title={habitName} />;
  };

  const AlignHabitLeft = () => {
    alignCheck = !alignCheck;
    return <CardHeader title={habitName} />;
  };

  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={8}>
          <Card
            className={classes.habitContainer}
            style={{
              backgroundColor:
                colourList[Math.floor(Math.random() * colourList.length)],
            }}
          >
            {alignCheck ? <AlignHabitRight /> : <AlignHabitLeft />}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileHabitBlock;
