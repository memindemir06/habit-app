import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    background: "#E3F2FD",
  },
}));

const ErrorPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <h1>Hmm.</h1>
        <p>
          It seems that you're lost in a perpetual black hole. Let us help guide
          you out and get you back home.
        </p>
        <div className={classes.buttons}>
          <a href="#">back</a>
          <a href="#">home</a>
          <br />
          <span>Help me out</span>
        </div>
      </div>
      <div className={classes.space}>
        <div className={classes.blackhole}></div>
        <div className={classes.ship}></div>
      </div>
    </div>
  );
};

export default ErrorPage;
