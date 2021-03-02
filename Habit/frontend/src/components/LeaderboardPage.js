import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
//import LeaderboardBlock from "./LeaderboardBlock";

function LeaderboardPage({ leaveAccountCallback }) {
  let params = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState(null);
  const [leaderboardList, setleaderboardList] = useState(null);

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
          // console.log(data);
          console.log(data.user_id);
          setUserId(data.user_id);
          getLeaderboard(data.user_id);
          //filterLeaderboard(data.user_id, "Smoking") // This is for testing the filter
        }
      });
  }, []);

  const getLeaderboard = (user_id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
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
          console.log(data.list_of_friends);

          setLeaderboardList(data.list_of_friends);
        } else {
          console.log("No Data");
        }
      });
  };

//   if (!userId || !friendsList) {
//     return <LoadingPage />;
//   }

//   if (friendsList.length == 0) {
//     return (
//       <div>
//         <h1>No Friends Added</h1>
//         <h1>Add some Friends...</h1>
//       </div>
//     );
//   }

  return (
    <div>
      {/* <h1>{userId}</h1> */}
      <h1>Leaderboard</h1>

    </div>
  );
}

export default LeaderboardPage;
