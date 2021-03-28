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
    background: "#253559",
    "&:hover": {
      borderColor: theme.palette.secondary.main,
    },
  },
  firstShadow: {
    webkitBoxShadow: "inset 0 0 30px #FFBF00",
    mozBoxShadow: "inset 0 0 30px #FFBF00",
    boxShadow: "inset 0 0 30px #FFBF00",
  },
  secondShadow: {
    webkitBoxShadow: "inset 0 0 30px #FFBF00",
    mozBoxShadow: "inset 0 0 30px #FFBF00",
    boxShadow: "inset 0 0 30px #C4CAF3",
  },
  thirdShadow: {
    webkitBoxShadow: "inset 0 0 30px #FFBF00",
    mozBoxShadow: "inset 0 0 30px #FFBF00",
    boxShadow: "inset 0 0 30px #E4624C",
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
    margin: theme.spacing(1),
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
  cardInfoContainer: {
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2),
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    color: "rgba(255,255,255,0.9)",
    fontWeight: "800",
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

  const parseDate = (dateString) => {
    const b = dateString.split(/\D+/);
    const offsetMult = dateString.indexOf("+") !== -1 ? -1 : 1;
    const hrOffset = offsetMult * (+b[7] || 0);
    const minOffset = offsetMult * (+b[8] || 0);
    return new Date(
      Date.UTC(
        +b[0],
        +b[1] - 1,
        +b[2],
        +b[3] + hrOffset,
        +b[4] + minOffset,
        +b[5],
        +b[6] || 0
      )
    );
  };

  return (
    <Container>
      <Grid item xs={12}>
        <Card
          className={clsx(classes.cardContainer, {
            [classes.firstShadow]: userIndex == 0,
            [classes.secondShadow]: userIndex == 1,
            [classes.thirdShadow]: userIndex == 2,
          })}
        >
          <CardHeader
            avatar={
              <div className={classes.cardAvatarContainer}>
                {userIndex == 0 || userIndex == 1 || userIndex == 2 ? (
                  <img
                    src={`trophy${userIndex}.svg`}
                    width="32px"
                    height="32px"
                  />
                ) : (
                  <Typography className={classes.streak} variant="subtitle">
                    {userIndex + 1}
                  </Typography>
                )}
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
            <CardContent className={classes.cardInfoContainer}>
              <Typography variant="subtitle">
                Habit: <span style={{ marginLeft: "1em" }}>{habitName}</span>
              </Typography>
              <Typography variant="subtitle">
                Started on:{" "}
                <span style={{ marginLeft: "1em" }}>
                  {parseDate(startDate).toLocaleDateString()}
                </span>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
      <br />
    </Container>
  );
};

export default LeaderboardBlock;
