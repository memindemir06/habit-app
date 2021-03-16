import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
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

const LeaderboardBlock = ({
  userName,
  habitName,
  streak,
  startDate,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
            {leaderboardList.map((user) => {
                return (
                <Container>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title={user.user_id.user_name}
                        action={
                          <div style={{display: "flex"}}>
                            <Typography variant="h6">Streak: {user.streak}</Typography>
                            <IconButton onClick={handleExpandClick}>
                              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                          </div>
                        }
                      />
                      <Collapse in={expanded} timeout="auto">
                        <CardContent>
                          <Typography variant="h6">Habit Name: {user.habit_id.habit_name}</Typography>
                          <Typography variant="h6">Start Date: {user.start_date}</Typography>
                          
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                </Container>
                )
            })}
        <br />
    </div>
  );
};


export default LeaderboardBlock;