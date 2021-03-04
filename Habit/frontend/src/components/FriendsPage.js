import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import FriendBlock from "./FriendBlock";
import {
  Button,
  Typography,
  TextField,
  Grid,
  Collapse,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function FriendsPage({ leaveAccountCallback }) {
  let params = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState(null);
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [friendsList, setFriendsList] = useState(null);
  const [friendSearch, setFriendSearch] = useState("");
  const [filterHabitName, setFilterHabitName] = useState("No Filter");
  const [friendAlreadyExists, setFriendAlreadyExists] = useState(null);
  const [displayExists, setDisplayExists] = useState("success");
  const [displayMessageExists, setDisplayMessageExists] = useState(
    "Friend added successfully"
  );

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
          setUserFirstName(data.first_name);
          setUserLastName(data.last_name);
          filterFriends(data.user_id); // This is for testing the filter
        }
      });
  }, []);

  const filterFriends = (user_id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        habit_name: filterHabitName,
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

  return (
    <div style={buttonStyle}>
      <Typography variant="h2" align="center">
        {userFirstName + " " + userLastName}
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
          variant="filled"
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
