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
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { purple, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    borderRadius: "36px",
    boxShadow: "none",
    "&:hover": {
      borderColor: theme.palette.secondary.main,
    },
  },
  darkCard: {
    background: "#4460a2",
  },
  lightCard: {
    background: "#bf57db",
  },
  cardHeader: {
    padding: "0 1em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fafafa",
  },
  cardAvatarContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streak: {
    fontWeight: "800",
    margin: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
  containerLeftStyle: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "800",
    alignItems: "center",
  },
  containerRightStyle: {
    display: "flex",
    marginTop: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
  },
}));

const LeaderboardBlock = ({
  userId,
  userName,
  habitName,
  streak,
  startDate,
  profileImg,
  darkState,
  setDarkState,
  userIndex,
}) => {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleProfileClick = () => {
    history.push("/profile/" + userName);
  };

  return (
    <Container>
      <Grid item xs={12}>
        <Card
          className={clsx(classes.cardContainer, {
            [classes.darkCard]: !darkState,
            [classes.lightCard]: darkState,
          })}
        >
          <CardHeader
            avatar={
              <div className={classes.cardAvatarContainer}>
                <Typography className={classes.streak} variant="subtitle">
                  {userIndex + 1}
                </Typography>
                <Tooltip title="View Profile">
                  <IconButton onClick={handleProfileClick}>
                    <Avatar src={profileImg} />
                  </IconButton>
                </Tooltip>
              </div>
            }
            title={
              <div className={classes.containerLeftStyle}>
                <Typography variant="subtitle">{userName}</Typography>
                <Typography variant="subtitle">{streak}</Typography>
              </div>
            }
            action={
              <div className={classes.containerRightStyle}>
                <IconButton onClick={handleExpandClick}>
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </div>
            }
            className={classes.cardHeader}
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
