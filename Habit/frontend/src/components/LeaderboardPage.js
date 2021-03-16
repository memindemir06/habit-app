import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
//import LeaderboardBlock from "./LeaderboardBlock";

function LeaderboardPage({ leaveAccountCallback }) {
  let params = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState(null);
  const [leaderboardList, setLeaderboardList] = useState(null);
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

  // Call this to filter and get leaderboard
  const getLeaderboard = (user_id, purpose) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        purpose: purpose,
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
          console.log(data.user_habits);
          setLeaderboardList(data.user_habits);
        } else {
          console.log("No Data");
        }
      });
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      {/* Display Filter using listOfFilters */} 
    </div>
  );
}

export default LeaderboardPage;
