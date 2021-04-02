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
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import LeaderboardBlock from "./LeaderboardBlock";
import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(7),
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
    background: "#172036",
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
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    minHeight: 100,
    display: "flex",
    width: "100vw",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  const [filterChosen, setFilterChosen] = useState("No_Filter");
  const [filterHabitOpen, setFilterHabitOpen] = useState(false);
  const [listOfFilters, setListOfFilters] = useState(["No Filter", "Friends"]);
  const [filterOpen, setFilterOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    if (userId) {
      getLeaderboard(userId, "No Filter");
      getAllHabits();
    }
  }, [userId]);

  const getLeaderboard = (user_id, filter) => {
    setFilterOpen(false);
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

  const getAllHabits = () => {
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
            listOfFilters.push(data.list_of_all_habits[habit].habit_name);
          }
          console.log(listOfFilters);
        } else {
          console.log("No Data");
        }
      });
  };

  const handleFilterHabitOpen = () => {
    setFilterHabitOpen(!filterHabitOpen);
  };

  const handleFilterDialogClose = () => {
    setFilterHabitOpen(false);
    setFilterOpen(false);
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
      <div>
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
              onClick={() => setFilterOpen(true)}
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
            <Dialog onClose={handleFilterDialogClose} open={filterOpen}>
                <MuiDialogTitle>
                  <div
                    style={{
                      height: "100px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography style={{ alignSelf: "flex-end" }} variant="h6">
                      Filter the users on Leaderboard:
                    </Typography>
                    {filterOpen ? (
                      <IconButton
                        style={{ alignSelf: "flex-start" }}
                        onClick={() => setFilterOpen(false)}
                      >
                        <CloseIcon />
                      </IconButton>
                    ) : null}
                  </div>
                </MuiDialogTitle>
                <List>
                  <ListItem
                    button
                    alignItems="center"
                    onClick={() => getLeaderboard(userId, listOfFilters[0])}
                    key={listOfFilters[0]}
                  >
                    <ListItemText primary="List all users" />
                  </ListItem>
                  <ListItem
                    button
                    alignItems="center"
                    onClick={() => getLeaderboard(userId, listOfFilters[1])}
                    key={listOfFilters[1]}
                  >
                    <ListItemText primary={listOfFilters[1]} />
                  </ListItem>
                  <ListItem button onClick={handleFilterHabitOpen}>
                    <ListItemText primary="Habits:" />
                    {filterHabitOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={filterHabitOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {listOfFilters.map((filter) => {
                        return filter == "No Filter" ? null : filter ==
                          "Friends" ? null : (
                          <ListItem
                            button
                            alignItems="center"
                            onClick={() => getLeaderboard(userId, filter)}
                            key={filter}
                            className={classes.nested}
                          >
                            <ListItemText primary={filter} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </List>
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
          </div>
        </div>
      </div>
    );
  }
}

export default LeaderboardPage;
