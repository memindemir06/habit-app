import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
//import List from '@material-ui/core/List';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemText from '@material-ui/core/ListItemText';
import {
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
  Container,
  Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import LeaderboardBlock from "./LeaderboardBlock";

function LeaderboardPage({ leaveAccountCallback }) {
  let params = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState(null);
  const [leaderboardList, setLeaderboardList] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [listOfFilters, setListOfFilters] = useState();

  useEffect(() => {
    // Investigate issue with request -> friends/api/userIdValid -> check View
    fetch("../api/userIdValid" + "?user_id=" + params.userId)
      .then((response) => {
        if (!response.ok) {
          leaveAccountCallback();
          history.push("/ErrorPage");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (!data) {
          console.log("");
        } else {
          setUserId(data.user_id);
          getAllHabits();
          getLeaderboard(data.user_id, "No Filter");
        }
      });
  }, []);

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
          let tempArray = [];
          let listOfHabits = data.list_of_all_habits;
          tempArray.push("No Filter");
          tempArray.push("Friends");
          for (let habitObj in listOfHabits) {
            tempArray.push(listOfHabits[habitObj].habit_name);
          }
          setListOfFilters(tempArray);
        } else {
          console.log("No Data");
        }
      });
  };

  const getLeaderboard = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: "No Filter",
      }),
    };
    fetch("../api/getLeaderboard", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("No User ID: ", response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setLeaderboardList(data.user_habits);
          {
            for (let user in data.user_habits) {
              leaderboardList.add(user);
            }
          }
        } else {
          console.log("No Data");
        }
      });
  };

  if (leaderboardList != null) {
    {
      leaderboardList.map((user) => {
        return (
          <div>
            <LeaderboardBlock
              userName={user.user_id.user_name}
              habitName={user.habit_id.habit_name}
              streak={user.streak}
              startDate={user.startDate}
            />
          </div>
        );
      });
    }
  } else {
    return (
      <div>
        {" "}
        <h1></h1>{" "}
      </div>
    );
  }
}

export default LeaderboardPage;
