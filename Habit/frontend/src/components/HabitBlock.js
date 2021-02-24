import React from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import { palette } from "@material-ui/system";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

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

const HabitBlock = ({ habitName, startDate, streak }) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container style={{ backgroundColor: "orange" }}>
          <Typography variant="h1">{habitName}</Typography>
          <Typography variant="h2">Start Date: {startDate}</Typography>
          <Typography variant="h2">Streak: {streak}</Typography>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default HabitBlock;
