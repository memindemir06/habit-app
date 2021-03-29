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
import Slide from "@material-ui/core/Slide";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  introSummary: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-84px",
    padding: theme.spacing(16),
    paddingTop: theme.spacing(12),
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      padding: "12em 0",
    },
    /*
    background: "rgb(106,48,147)",
    background:
      "-moz-linear-gradient(150deg, rgba(106,48,147,1) 0%, rgba(160,68,255,1) 100%)",
    background:
      "-webkit-linear-gradient(150deg, rgba(106,48,147,1) 0%, rgba(160,68,255,1) 100%)",
    background:
      "linear-gradient(150deg, rgba(106,48,147,1) 0%, rgba(160,68,255,1) 100%)",
    filter:
      "progid:DXImageTransform.Microsoft.gradient(startColorstr='#6a3093',endColorstr='#a044ff',GradientType=1)",
    color: "white",
    */
    background: "rgb(23,32,54)",
    background:
      "-moz-linear-gradient(150deg, rgba(23,32,54,1) 0%, rgba(37,53,89,1) 100%)",
    background:
      "-webkit-linear-gradient(150deg, rgba(23,32,54,1) 0%, rgba(37,53,89,1) 100%)",
    background:
      "linear-gradient(150deg, rgba(23,32,54,1) 0%, rgba(37,53,89,1) 100%)",
    filter:
      "progid:DXImageTransform.Microsoft.gradient(startColorstr='#172036',endColorstr='#253559',GradientType=1)",
    color: "white",
  },
  introText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    height: "100%",
  },
  btn: {
    width: "150px",
    fontSize: "17px",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    margin: "20px",
    height: "50px",
    textAlign: "center",
    border: "none",
    backgroundSize: "300% 100%",
    backgroundImage:
      "linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19)",
    boxShadow: "0 4px 15px 0 rgba(229, 66, 10, 0.75)",
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

  getStarted: {
    width: "150px",
    cursor: "pointer",
    background: "none",
    border: "2px solid",
    font: "inherit",
    lineHeight: 1,
    margin: "0.5em",
    padding: "1em 2em",
    color: "white",
    transition: "0.25s",

    "&:hover, &:focus": {
      border: "2px solid",
      borderColor: "yellow",
      color: "yellow",
      boxShadow: "0 0.5em 0.5em -0.4em yellow",
      transform: "translateY(-0.25em)",
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
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },

  pStyle: {
    margin: theme.spacing(2),
    fontWeight: 400,
    textAlign: "justify",
    letterSpacing: "1.5px",
  },

  introHome: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(16),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(12),
    },
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      padding: "12em 0",
    },
    background: "#fafafa",
    color: "black",
  },

  introHomeText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  mainGrid: {
    height: "80%",
  },
}));

function IntroPage() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <div className={classes.introSummary}>
          <Grid className={classes.mainGrid} spacing={6} container>
            <Slide
              direction="right"
              in={true}
              timeout={{
                appear: 500,
                enter: 1000,
              }}
            >
              <Grid item className={classes.introText} xs={12} sm={6}>
                <Typography
                  align="left"
                  className={classes.textStyle}
                  variant="h3"
                >
                  A NEW JOURNEY STARTS HERE
                </Typography>
                <Divider
                  style={{
                    alignSelf: "left",
                    width: "200px",
                    height: "2px",
                    background: "#fff",
                    margin: "1em",
                  }}
                />
                <Typography
                  align="left"
                  className={classes.pStyle}
                  variant="subtitle"
                >
                  Take on something new, and meet others who share the same{" "}
                  <span
                    style={{
                      color: "yellow",
                      fontWeight: 600,
                      textShadow:
                        "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px yellow",
                    }}
                  >
                    HAB!TS
                  </span>{" "}
                  as you
                </Typography>
                <div
                  style={{
                    height: "100px",
                    display: "flex",
                    marginTop: "2em",
                    justifySelf: "flex-end",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.getStarted}
                    component={Link}
                    to="/register"
                  >
                    Get Started
                  </Button>
                </div>
              </Grid>
            </Slide>
            <Slide
              direction="left"
              in={true}
              timeout={{
                appear: 800,
                enter: 1000,
              }}
            >
              <Grid item className={classes.imageContainer} xs={12} sm={6}>
                <img src="section-1.svg" width="100%" height="100%" />
              </Grid>
            </Slide>
          </Grid>
        </div>
        <div className={classes.introHome}>
          <Grid container>
            <Slide
              direction="right"
              in={true}
              timeout={{
                appear: 500,
                enter: 1000,
              }}
            >
              <Grid item className={classes.imageContainer} xs={12} sm={6}>
                <img src="section-2.svg" width="100%" height="100%" />
              </Grid>
            </Slide>
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
                TRACK
              </Typography>
              <Divider
                style={{
                  alignSelf: "right",
                  width: "200px",
                  height: "2px",
                  background: "rgb(106,48,147)",
                  margin: "1em",
                }}
              />
              <Typography
                align="right"
                className={classes.pStyle}
                style={{ textAlign: "right" }}
                variant="subtitle"
              >
                Set up new{" "}
                <span
                  style={{
                    color: "yellow",
                    fontWeight: 600,
                    textShadow: "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px yellow",
                  }}
                >
                  HAB!TS
                </span>{" "}
                to help keep track of, and maintain, your personal development
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className={classes.introSummary}>
          <Grid container>
            <Grid item className={classes.introText} xs={12} sm={6}>
              <Typography
                align="left"
                className={classes.textStyle}
                variant="h3"
              >
                COMPETE
              </Typography>
              <Divider
                style={{
                  alignSelf: "left",
                  width: "200px",
                  height: "2px",
                  background: "#fff",
                  margin: "1em",
                }}
              />
              <Typography
                align="left"
                className={classes.pStyle}
                variant="subtitle"
              >
                Stay on track with your{" "}
                <span
                  style={{
                    color: "yellow",
                    fontWeight: 600,
                    textShadow: "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px yellow",
                  }}
                >
                  HAB!TS
                </span>{" "}
                and make your way up the leaderboard
              </Typography>
            </Grid>
            <Grid item className={classes.friendImageContainer} xs={12} sm={6}>
              <img src="friend1.svg" width="80%" height="80%" />
              <img src="friend2.svg" width="80%" height="80%" />
            </Grid>
          </Grid>
        </div>
        <div className={classes.introHome}>
          <Grid container>
            <Grid item className={classes.imageContainer} xs={12} sm={6}>
              <img src="leaderboard.svg" width="100%" height="100%" />
            </Grid>
            <Grid item className={classes.introHomeText} xs={12} sm={6}>
              <Typography
                align="right"
                className={classes.textStyle}
                variant="h3"
              >
                EXPLORE
              </Typography>
              <Divider
                style={{
                  alignSelf: "right",
                  width: "200px",
                  height: "2px",
                  background: "rgb(106,48,147)",
                  margin: "1em",
                }}
              />
              <Typography
                align="right"
                className={classes.pStyle}
                variant="subtitle"
              >
                Explore our map to meet nearby people who share similar{" "}
                <span
                  style={{
                    color: "yellow",
                    fontWeight: 600,
                    textShadow: "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px yellow",
                  }}
                >
                  HAB!TS
                </span>{" "}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer className={classes.footer} />
    </div>
  );
}

export default IntroPage;
