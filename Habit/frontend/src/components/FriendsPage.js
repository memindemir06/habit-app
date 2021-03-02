import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import FriendBlock from "./FriendBlock";

function FriendsPage({ leaveAccountCallback }) {
  let params = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState(null);
  const [friendsList, setFriendsList] = useState(null);

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
          setUserId(data.user_id);
          // getFriends(data.user_id);
          filterFriends(data.user_id, "Smoking") // This is for testing the filter
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
          console.log(data.list_of_friends);
          // (Lambda?) Function to sort the list of friends by 1st Name
          let tempFriendList = data.list_of_friends;
          tempFriendList = tempFriendList.sort((a, b) => {
            if (a.first_name < b.first_name) {
              return -1;
            } else if (a.first_name > b.first_name) {
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

  const filterFriends = (user_id, habit_name) => {
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
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data.list_of_friends);
          // (Lambda?) Function to sort the list of friends by 1st Name
          let tempFriendList = data.list_of_friends;
          tempFriendList = tempFriendList.sort((a, b) => {
            if (a.first_name < b.first_name) {
              return -1;
            } else if (a.first_name > b.first_name) {
              return 1;
            }
            return 0;
          });
          console.log(data.list_of_friends)
          setFriendsList(data.list_of_friends);
        } else {
          console.log("No Data");
        }
      });
  };

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

  return (
    <div>
      <h1>{userId}</h1>
      <h1>Your Friend List</h1>
      {friendsList.map((friend) => {
        return (
          <FriendBlock
            firstName={friend.first_name}
            lastName={friend.last_name}
          />
        );
      })}
    </div>
  );
}

export default FriendsPage;
