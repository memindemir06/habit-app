import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
//import LeaderboardBlock from "./LeaderboardBlock";

function LeaderboardPage({ leaveAccountCallback }) {
  let params = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState(null);
  const [leaderboardList, setLeaderboardList] = useState(null);

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
          getLeaderboard();
        }
      });
  }, []);

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
          console.log(data.user_habits);
          setLeaderboardList(data.user_habits);
        } else {
          console.log("No Data");
        }
      });
  };

  return (
    <div>
      {/* <h1>{userId}</h1> */}
      <h1>Leaderboard</h1>
    </div>
  );
}

export default LeaderboardPage;
