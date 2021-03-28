import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import {
  Button,
  Typography,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  Divider,
} from "@material-ui/core";
import clsx from "clsx";
import LeaderboardBlock from "./LeaderboardBlock";
import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
    margin: theme.spacing(16),
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      marginLeft: theme.spacing(7),
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
  block: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "500px",
    margin: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    border: "3px solid",
    borderColor: theme.palette.secondary.main,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  filterButton: {
    alignSelf: "flex-end",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    textTransform: "none",
  },
  lightCard: {
    background: "#172036",
  },
  darkCard: {
    background: "#691b7e",
  },
  lbHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "3px solid",
    borderBottomColor: theme.palette.secondary.main,
  },
  lbHeaderContent: {
    color: "#fafafa",
    textTransform: "uppercase",
    margin: theme.spacing(1),
  },
  lbTitles: {
    width: "100%",
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2),
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    color: "rgba(255,255,255,0.9)",
  },
  lbTitleContent: {
    textTransform: "uppercase",
  },
}));

function LeaderboardPage({
  leaveAccountCallback,
  userId,
  darkState,
  setDarkState,
}) {
  let params = useParams();
  let history = useHistory();
  const [leaderboardList, setLeaderboardList] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [listOfFilters, setListOfFilters] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const [filterChosen, setFilterChosen] = useState("No_Filter");
  const classes = useStyles();
  const theme = useTheme();

  const [checkedHabits, setCheckedHabits] = useState({
    No_Filter: true,
    Friends: false,
    Gym: false,
    Smoking: false,
    Drugs: false,
    Attendence: false,
  });

  const { No_Filter, Friends, Gym, Smoking, Drugs, Attendence } = checkedHabits;

  const error =
    [No_Filter, Friends, Gym, Smoking, Drugs, Attendence].filter((v) => v)
      .length !== 1;

  // const [checkedHabits, setCheckedHabits] = useState({
  //   Smoking: false,
  //   Jogging: false,
  //   Drinking: false,
  //   Drugs: false,
  //   Reading: false,
  //   Cycling: false,
  //   Programming: false,
  //   Walking: false,
  //   Eating_Healthily: false,
  //   Gaming: false,
  //   Watching: false,
  //   Learning: false,
  // });

  // const {
  //   Smoking,
  //   Jogging,
  //   Drinking,
  //   Drugs,
  //   Reading,
  //   Cycling,
  //   Programming,
  //   Walking,
  //   Eating_Healthily,
  //   Gaming,
  //   Watching,
  //   Learning,
  // } = checkedHabits;

  // const error =
  //   [
  //     Smoking,
  //     Jogging,
  //     Drinking,
  //     Drugs,
  //     Reading,
  //     Cycling,
  //     Programming,
  //     Walking,
  //     Eating_Healthily,
  //     Gaming,
  //     Watching,
  //     Learning,
  //   ].filter((v) => v).length !== 1;

  useEffect(() => {
    if (userId) {
      getLeaderboard(userId, "No_Filter");
    }
  }, [userId]);

  const getLeaderboard = (user_id, filter) => {
    setOpenFilter(false);
    setFilterChosen(filter);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        purpose: filter,
      }),
    };
    fetch("../api/getLeaderboard", requestOptions)
      .then((response) => {
        if (!response.ok) {
          setLeaderboardList([]);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          setLeaderboardList(data.user_habits);
        } else {
          console.log("No Data");
        }
      });
  };

  const handleHabitCheck = (event) => {
    setCheckedHabits({
      ...checkedHabits,
      [event.target.name]: event.target.checked,
    });
  };

  const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const NoFilterMessage = () => {
    if (leaderboardList.length == 0) {
      if (filterChosen == "No_Filter") {
        return (
          <div>
            <Typography variant="h5" align="center">
              No Users on Leaderboard
            </Typography>
          </div>
        );
      } else if (filterChosen == "Friends") {
        return (
          <div>
            <Typography variant="h5" align="center">
              No Friends Added
            </Typography>
            <Typography variant="h5" align="center">
              Add some Friends...
            </Typography>
          </div>
        );
      } else {
        return (
          <div>
            <Typography variant="h5" align="center">
              No Existing Users for filter: {filterChosen}
            </Typography>
          </div>
        );
      }
    }
  };

  if (leaderboardList == null) {
    return <LoadingPage />;
  } else {
    return (
      <div className={classes.root}>
        <div
          className={clsx(classes.block, {
            [classes.lightCard]: !darkState,
            [classes.darkCard]: darkState,
          })}
        >
          <div className={classes.lbHeader}>
            <Typography
              variant="h3"
              align="center"
              className={classes.lbHeaderContent}
              style={{ marginBottom: 0 }}
            >
              Users
            </Typography>
            <Typography
              variant="h4"
              align="center"
              className={classes.lbHeaderContent}
            >
              Leaderboard
            </Typography>
          </div>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenFilter(true)}
            startIcon={<FilterListIcon />}
            className={classes.filterButton}
          >
            Filters
          </Button>

          <div className={classes.lbTitles}>
            <Typography
              variant="h6"
              align="center"
              className={classes.lbTitleContent}
            >
              Rank
            </Typography>
            <Typography
              variant="h6"
              align="center"
              className={classes.lbTitleContent}
              style={{ marginRight: theme.spacing(6) }}
            >
              Name
            </Typography>
            <Typography
              variant="h6"
              align="center"
              className={classes.lbTitleContent}
            >
              Streak
            </Typography>
          </div>

          <Dialog
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            fullWidth
          >
            <DialogTitle>{"Filter Leaderboard"}</DialogTitle>
            <DialogContent dividers>
              <FormControl component="fieldset" error={error}>
                <FormLabel component="legend">Pick 1 option</FormLabel>
                <FormGroup>
                  {Object.keys(checkedHabits).map(function (key, index) {
                    return (
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={key}
                              checked={checkedHabits[key]}
                              onChange={handleHabitCheck}
                              disabled={false}
                            />
                          }
                          label={key}
                        />
                      </div>
                    );
                  })}
                </FormGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenFilter(false);
                }}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  Object.keys(checkedHabits).map(function (key, index) {
                    if (checkedHabits[key]) {
                      getLeaderboard(userId, key);
                    }
                  });
                }}
                color="primary"
                disabled={error ? true : false}
                autoFocus
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          {leaderboardList.length == 0 ? (
            <NoFilterMessage />
          ) : (
            leaderboardList.map((user, index) => {
              return (
                <LeaderboardBlock
                  userId={user.user_id}
                  userName={user.user_id.user_name}
                  habitName={user.habit_id.habit_name}
                  streak={user.streak}
                  startDate={user.start_date}
                  profileImg={user.profile_img}
                  darkState={darkState}
                  setDarkState={setDarkState}
                  userIndex={index}
                />
              );
            })
          )}
          {/* {leaderboardList.map((user) => {
          return (
            <LeaderboardBlock
              userId={user.user_id}
              userName={user.user_id.user_name}
              habitName={user.habit_id.habit_name}
              streak={user.streak}
              startDate={user.start_date}
            />
          );
        })} */}
        </div>
      </div>
    );
  }
}

export default LeaderboardPage;
