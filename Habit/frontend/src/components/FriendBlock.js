import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  habitContainer: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  emailLink: {
    fontWeight: "800",
    color: theme.palette.text.primary,
  },
}));

const FriendBlock = ({
  userName,
  firstName,
  lastName,
  email,
  friendUserId,
  userId,
  filterFriends,
  profileImg,
}) => {
  const [expanded, setExpanded] = useState(false);
  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleProfileClick = () => {
    history.push("/profile/" + userName);
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
          filterFriends(userId, "No Filter");
        }
      });
  };

  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Card className={classes.habitContainer}>
            <CardHeader
              avatar={
                <Tooltip title="View profile">
                  <IconButton onClick={handleProfileClick}>
                    <Avatar src={profileImg} />
                  </IconButton>
                </Tooltip>
              }
              title={userName}
              action={
                <div>
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
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: "2em",
                  paddingLeft: "2em",
                }}
              >
                <Typography variant="h6">
                  {firstName + " " + lastName}
                </Typography>
                <a className={classes.emailLink} href={`mailto:${email}`}>
                  Email
                </a>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

export default FriendBlock;
