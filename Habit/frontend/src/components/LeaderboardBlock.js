import React, { useState } from "react";
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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const LeaderboardBlock = ({ userId, userName, habitName, streak, startDate }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleProfileClick = () => {
    history.push("/profile/" + userId);
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
              <IconButton onClick={handleProfileClick}>
                <AccountCircleIcon />
              </IconButton>
            }
            title={
              <div style={containerLeftStyle}>
                <Typography variant="h5">{userName}</Typography>
              </div>
            } 
            action={
              <div style={containerRightStyle}>
                <Typography variant="h5">Streak: {streak}</Typography>
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
