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
} from "@material-ui/core";
import LeaderboardBlock from "./LeaderboardBlock";
import FilterListIcon from "@material-ui/icons/FilterList";

function LeaderboardPage({ leaveAccountCallback, userId }) {
  let params = useParams();
  let history = useHistory();
  const [leaderboardList, setLeaderboardList] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [listOfFilters, setListOfFilters] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const [filterChosen, setFilterChosen] = useState("No_Filter");

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
      <div style={buttonStyle}>
        <Typography variant="h3" align="center">
          Leaderboard
        </Typography>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenFilter(true)}
          endIcon={<FilterListIcon />}
        >
          Filter Leaderboard
        </Button>
        <br />
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
          leaderboardList.map((user) => {
            return (
              <LeaderboardBlock
                userId={user.user_id}
                userName={user.user_id.user_name}
                habitName={user.habit_id.habit_name}
                streak={user.streak}
                startDate={user.start_date}
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
    );
  }
}

export default LeaderboardPage;
