import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
  Container,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const FriendBlock = ({
  userName,
  firstName,
  lastName,
  email,
  friendUserId,
  userId,
  filterFriends, 
}) => {
  const [expanded, setExpanded] = useState(false);
  let history = useHistory();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleProfileClick = () => {
    history.push("/profile/" + friendUserId);
  };

  const handleDeleteClicked = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id1: userId,
        user_id2: friendUserId,
      }),
    };
    fetch("../api/removeFriend", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("Bad Response: ", response);
        } else {
          console.log("Good Response: ", response);
          return response.json();
        }
      })
      .then((data) => {
        if (!data) {
          console.log("No Data!");
        } else {
          console.log(data);
          filterFriends(userId);
        }
      });
  };

  return (
    <div>
      <Container>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              avatar={<Avatar> {userName[0]} </Avatar>}
              title={userName}
              action={
                <div>
                  <Tooltip title="View profile">
                    <IconButton onClick={handleProfileClick}>
                      <AccountCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete friend">
                    <IconButton onClick={handleDeleteClicked}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton onClick={handleExpandClick}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </div>
              }
            />
            <Collapse in={expanded} timeout="auto">
              <CardContent>
                <Typography variant="h6">
                  {firstName + " " + lastName}
                </Typography>
                <Typography variant="h6">Email: {email}</Typography>
                <Typography variant="h6">
                  Twitter: twitter.com/twitter
                </Typography>
                <Typography variant="h6">
                  Instagram: instagram.com/instagram
                </Typography>
                <Typography variant="h6">
                  Facebook: facebook.com/facebook
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

export default FriendBlock;
