import React, { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import FriendBlock from "./FriendBlock";
import {
  Button,
  Typography,
  TextField,
  Grid,
  Collapse,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  InputAdornment,
  Divider,
  Container,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FilterListIcon from "@material-ui/icons/FilterList";
import Footer from "./Footer";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    padding: theme.spacing(1),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(8),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },

  pageTitleContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
    },
  },

  pageTitle: {
    marginTop: 32,
    textTransform: "uppercase",
    fontWeight: "800",
  },

  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: 75,
    minHeight: 75,
    paddingTop: 24,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      flexDirection: "column",
    },
  },

  inputField: {
    marginRight: "10px",
  },

  inputButton: {
    marginTop: 16,
    maxHeight: 32,
    minHeight: 32,
  },

  filterButton: {
    marginTop: 40,
    maxHeight: 32,
    minHeight: 32,
    [theme.breakpoints.down("sm")]: {
      width: "60%",
      alignSelf: "center",
    },
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    minHeight: 100,
    display: "flex",
    width: "100vw",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-100px",
  },
}));

function FriendsPage({ leaveAccountCallback, userId, userName }) {
  const [friendsList, setFriendsList] = useState(null);
  const [friendSearch, setFriendSearch] = useState("");
  // const [filterHabitName, setFilterHabitName] = useState("No Filter");
  const [friendAlreadyExists, setFriendAlreadyExists] = useState(null);
  const [displayExists, setDisplayExists] = useState("success");
  const [displayMessageExists, setDisplayMessageExists] = useState(
    "Friend added successfully"
  );
  const [openFilter, setOpenFilter] = useState(false);

  const [checkedHabits, setCheckedHabits] = useState({
    No_Filter: true,
    Gym: false,
    Smoking: false,
    Drugs: false,
  });

  const { No_Filter, Gym, Smoking, Drugs } = checkedHabits;

  const error = [No_Filter, Gym, Smoking, Drugs].filter((v) => v).length !== 1;
  const classes = useStyles();
  const theme = useTheme();

  // var filterChosen = "No_Filter";
  const [filterChosen, setFilterChosen] = useState("No_Filter");
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
      filterFriends(userId, "No_Filter");
    }
  }, [userId]);

  const filterFriends = (user_id, habit_name) => {
    setOpenFilter(false);
    setFilterChosen(habit_name);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        habit_name: habit_name,
      }),
    };
    fetch("../api/filterFriends", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("No User ID: ", response);
        } else {
          console.log(response);
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          // console.log(data);
          // Function to sort the list of friends by 1st Name
          let tempFriendList = data.list_of_friends;
          tempFriendList = tempFriendList.sort((a, b) => {
            if (a.user_name < b.user_name) {
              return -1;
            } else if (a.user_name > b.user_name) {
              return 1;
            }
            return 0;
          });
          setFriendsList(data.list_of_friends);
        } else {
          console.log("No Data");
        }
      });
  };

  const friendSearchChange = (event) => {
    setFriendSearch(event.target.value);
  };

  const submitFriendSearch = () => {
    // Use friendSearch variable as friend name
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        user_name: friendSearch,
      }),
    };
    fetch("../api/addFriend", requestOptions)
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
          if (data.Good_Request == "Friend already exists") {
            setFriendAlreadyExists("error");
            setDisplayExists("error");
            setDisplayMessageExists("Friend already exists!");
          } else {
            filterFriends(userId, "No_Filter");
            setFriendAlreadyExists("success");
            setDisplayExists("success");
            setDisplayMessageExists("Friend added successfully!");
          }
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

  const NoFilterMessage = () => {
    if (friendsList.length == 0) {
      if (filterChosen == "No_Filter") {
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
              No Friends Added for filter: {filterChosen}
            </Typography>
            <Typography variant="h5" align="center">
              Add some Friends...
            </Typography>
          </div>
        );
      }
    }
  };

  if (!userId || !friendsList) {
    return <LoadingPage />;
  }

  return (
    <div style={{ position: "relative", minHeight: "100%" }}>
      <div className={classes.root}>
        <div className={classes.pageTitleContainer}>
          <Typography className={classes.pageTitle} variant="h4" align="center">
            Your friends
          </Typography>
          <div className={classes.inputContainer}>
            <TextField
              className={classes.inputField}
              id="filled-basic"
              label="Type Friend Username"
              onChange={friendSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              endIcon={<AddCircleIcon />}
              onClick={submitFriendSearch}
              className={classes.inputButton}
              disableElevation
            >
              {" "}
              ADD A FRIEND{" "}
            </Button>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.filterButton}
            onClick={() => setOpenFilter(true)}
            endIcon={<FilterListIcon />}
          >
            Filter Friends
          </Button>
        </div>
        <Divider
          style={{
            width: "99%",
            margin: "0 1em 1em 1em",
            alignSelf: "flex-start",
          }}
        />
        <Dialog
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          fullWidth
        >
          <DialogTitle>{"Filter by habit"}</DialogTitle>
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
              // Needs to be changed
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
                    filterFriends(userId, key);
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
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={friendAlreadyExists}
          autoHideDuration={2000}
          onClose={() => {
            setFriendAlreadyExists(null);
          }}
        >
          <Alert
            severity={
              friendAlreadyExists == "success"
                ? "success"
                : friendAlreadyExists == "error"
                ? "error"
                : displayExists
            }
            onClose={() => {
              setFriendAlreadyExists(null);
            }}
          >
            {friendAlreadyExists == "success"
              ? "Friend added successfully!"
              : friendAlreadyExists == "error"
              ? "Friend already exists!"
              : displayMessageExists}
          </Alert>
        </Snackbar>
        <div style={{ width: "100%" }}>
          <Grid container spacing={1}>
            {friendsList.length == 0 ? (
              <NoFilterMessage />
            ) : (
              friendsList.map((friend) => {
                return (
                  <Grid item xs={12}>
                    <FriendBlock
                      userName={friend.user_name}
                      firstName={friend.first_name}
                      lastName={friend.last_name}
                      email={friend.email}
                      userId={userId}
                      friendUserId={friend.user_id}
                      filterFriends={filterFriends}
                      profileImg={friend.profile_img}
                    />
                    <br />
                  </Grid>
                );
              })
            )}
          </Grid>
        </div>
      </div>
      <Footer className={classes.footer} />
    </div>
  );
}

export default FriendsPage;
