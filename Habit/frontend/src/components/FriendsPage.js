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
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";

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
    Jogging: false,
    Drugs: false,
  });

  const { No_Filter, Gym, Jogging, Drugs } = checkedHabits;

  const error = [No_Filter, Gym, Jogging, Drugs].filter((v) => v).length !== 1;

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
          console.log(data);
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

  // const getAllHabits = () => {
  //   fetch("api/getAllHabits")
  //     .then((response) => {
  //       if (!response.ok) {
  //         console.log(response);
  //       } else {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => {
  //       if (data) {
  //         console.log(data.list_of_all_habits);
  //       } else {
  //         console.log("No Data");
  //       }
  //     });
  // };

  if (!userId || !friendsList) {
    return <LoadingPage />;
  }

  if (friendsList.length == 0) {
    return (
      <div>
        <h1>No Friends Added</h1>
        <h1>Add some Friends...</h1>
      </div>
    );
  }

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
            filterFriends(userId);
            setFriendAlreadyExists("success");
            setDisplayExists("success");
            setDisplayMessageExists("Friend added successfully!");
          }
        } else {
          console.log("No Data");
        }
      });
  };

  const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const friendSearchStyle = {
    display: "flex",
  };

  const noBorder = {
    marginRight: "10px",
  };

  const handleHabitCheck = (event) => {
    setCheckedHabits({
      ...checkedHabits,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div style={buttonStyle}>
      <Typography variant="h2" align="center">
        {userName}
      </Typography>
      <Typography variant="h3" align="center">
        FRIEND LIST
      </Typography>
      <br />
      <div style={friendSearchStyle}>
        <TextField
          style={noBorder}
          id="filled-basic"
          label="Type Friend Username"
          onChange={friendSearchChange}
          variant="outlined"
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
          disableElevation
        >
          {" "}
          ADD A FRIEND{" "}
        </Button>
      </div>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenFilter(true)}
        endIcon={<FilterListIcon />}
      >
        Filter Friends
      </Button>
      <Dialog open={openFilter} onClose={() => setOpenFilter(false)} fullWidth>
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
      <br />
      <Grid item xs={12} align="center">
        <Collapse in={friendAlreadyExists}>
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
        </Collapse>
      </Grid>
      <br />
      {friendsList.map((friend) => {
        return (
          <div>
            <FriendBlock
              userName={friend.user_name}
              firstName={friend.first_name}
              lastName={friend.last_name}
              email={friend.email}
              userId={userId}
              friendUserId={friend.user_id}
              filterFriends={filterFriends}
            />
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default FriendsPage;
