import React, { useState, useEffect } from "react";
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
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const LeaderboardBlock = ({
  userId,
  userName,
  habitName,
  streak,
  startDate,
  profileImg,
}) => {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleProfileClick = () => {
    history.push("/profile/" + userName);
  };

  const containerLeftStyle = {
    display: "flex",
    alignItems: "center",
  };

  const containerRightStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <Container>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            avatar={
              <Tooltip title="View Profile">
                <IconButton onClick={handleProfileClick}>
                  <Avatar src={profileImg} />
                </IconButton>
              </Tooltip>
            }
            title={
              <div style={containerLeftStyle}>
                <Typography variant="h6">{userName}</Typography>
              </div>
            }
            action={
              <div style={containerRightStyle}>
                <Typography variant="h6">Streak: {streak}</Typography>
                <IconButton onClick={handleExpandClick}>
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </div>
            }
          />
          <Collapse in={expanded} timeout="auto">
            <CardContent>
              <Typography variant="h6">Habit Name: {habitName}</Typography>
              <Typography variant="h6">Start Date: {startDate}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
      <br />
    </Container>
  );
};

export default LeaderboardBlock;
