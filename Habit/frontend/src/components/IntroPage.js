import React from "react";
import {
  Typography,
  Divider,
  withTheme,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  introSummary: {
    marginTop: "-20px",
    padding: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    background: "rgb(41,51,236)",
    background:
      "-moz-linear-gradient(150deg, rgba(41,51,236,1) 0%, rgba(20,255,252,1) 100%)",
    background:
      "-webkit-linear-gradient(150deg, rgba(41,51,236,1) 0%, rgba(20,255,252,1) 100%)",
    background:
      "linear-gradient(150deg, rgba(41,51,236,1) 0%, rgba(20,255,252,1) 100%)",
    filter:
      "progid:DXImageTransform.Microsoft.gradient(startColorstr='#2933ec',endColorstr='#14fffc',GradientType=1)",
    color: "white",
  },
  introText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
  },
  btn: {
    width: "300px",
    fontSize: "17px",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    margin: "20px",
    height: "55px",
    textAlign: "center",
    border: "none",
    backgroundSize: "300% 100%",
    backgroundImage:
      "linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19)",
    boxShadow: "0 4px 15px 0 rgba(229, 66, 10, 0.75)",
    borderRadius: "50px",
    mozTransition: "all .4s ease-in-out",
    oTransition: "all .4s ease-in-out",
    webkitTransition: "all .4s ease-in-out",
    transition: "all .4s ease-in-out",
    "&:hover": {
      backgroundPosition: "100% 0",
      mozTransition: "all .4s ease-in-out",
      oTransition: "all .4s ease-in-out",
      webkitTransition: "all .4s ease-in-out",
      transition: "all .4s ease-in-out",
    },
    "&:focus": {
      outline: "none",
    },
  },

  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  friendImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  textStyle: {
    margin: theme.spacing(2),
    fontWeight: "bold",
  },

  introHome: {
    padding: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    background: "#fffdd0",
    color: "black",
  },

  introHomeText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "right",
  },
}));

function IntroPage() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.introSummary}>
        <Grid container spacing={6}>
          <Grid item className={classes.introText} xs={12} sm={6}>
            <Typography align="left" className={classes.textStyle} variant="h3">
              Welcome to Hab!ts
            </Typography>
            <Typography
              align="left"
              className={classes.textStyle}
              variant="subtitle"
            >
              We help you in achieving you ideal lifestyle
            </Typography>
            <Typography align="left" className={classes.textStyle} variant="h5">
              Take on new Hab!ts
            </Typography>
            <Typography
              align="left"
              className={classes.textStyle}
              variant="subtitle"
            >
              And help others
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              className={classes.btn}
              component={Link}
              to="/register"
            >
              Create an Account
            </Button>
          </Grid>
          <Grid item className={classes.imageContainer} xs={12} sm={6}>
            <img src="section-1.svg" width="100%" height="100%" />
          </Grid>
        </Grid>
      </div>
      <div className={classes.introHome}>
        <Grid container spacing={6}>
          <Grid item className={classes.imageContainer} xs={12} sm={6}>
            <img src="section-2.svg" width="100%" height="100%" />
          </Grid>
          <Grid
            item
            className={classes.introHomeText}
            style={{ marginBottom: "30px" }}
            xs={12}
            sm={6}
          >
            <Typography
              align="right"
              className={classes.textStyle}
              variant="h3"
            >
              Track your Hab!ts
            </Typography>
            <Typography
              align="right"
              className={classes.textStyle}
              variant="subtitle"
            >
              Set up new Hab!ts
            </Typography>
            <Typography
              align="right"
              className={classes.textStyle}
              variant="h5"
            >
              Keep track of your development
            </Typography>
            <Typography
              align="right"
              className={classes.textStyle}
              variant="subtitle"
            >
              Maintain your Hab!t streaks
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.introSummary}>
        <Grid container spacing={6}>
          <Grid item className={classes.introText} xs={12} sm={6}>
            <Typography align="left" className={classes.textStyle} variant="h3">
              Compete with Friends
            </Typography>
            <Typography
              align="left"
              className={classes.textStyle}
              variant="subtitle"
            >
              Make new friends
            </Typography>
            <Typography align="left" className={classes.textStyle} variant="h5">
              Take on new Hab!ts
            </Typography>
            <Typography
              align="left"
              className={classes.textStyle}
              variant="subtitle"
            >
              And help others
            </Typography>
          </Grid>
          <Grid item className={classes.friendImageContainer} xs={12} sm={6}>
            <img src="friend1.svg" width="80%" height="80%" />
            <img src="friend2.svg" width="80%" height="80%" />
          </Grid>
        </Grid>
      </div>
      <div className={classes.introHome}>
        <Grid container spacing={6}>
          <Grid item className={classes.imageContainer} xs={12} sm={6}>
            <img src="leaderboard.svg" width="100%" height="100%" />
          </Grid>
          <Grid item className={classes.introHomeText} xs={12} sm={6}>
            <Typography
              align="right"
              className={classes.textStyle}
              variant="h3"
            >
              Engage with others
            </Typography>
            <Typography
              align="right"
              className={classes.textStyle}
              variant="subtitle"
            >
              Meet similar people
            </Typography>
            <Typography
              align="right"
              className={classes.textStyle}
              variant="h5"
            >
              Compare progress
            </Typography>
            <Typography
              align="right"
              className={classes.textStyle}
              variant="subtitle"
              style={{ marginBottom: "20px" }}
            >
              Make new connections
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default IntroPage;
