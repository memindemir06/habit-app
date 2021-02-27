import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function FriendsPage({ leaveAccountCallback }) {
  let params = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState(null);
  const [friendsList, setfriendsList] = useState(null);

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
          //   setUserId(null);
        } else {
          console.log(data);
          setUserId(data.user_id);
          //   setFirstName(data.first_name);
          //   setLastName(data.last_name);
          getFriends(data.user_id);
        }
      });
  }, []);

  const getFriends = (user_id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    };
    fetch("../api/getFriends", requestOptions)
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
          setfriendsList(data);
        } else {
          console.log("No Data");
        }
      });
  };

  if (!userId || !friendsList) {
    return <LoadingPage />;
  }

  return (
    <div>
      <h1>{userId}</h1>
      <h1>Friends</h1>
    </div>
  );
}

export default FriendsPage;
