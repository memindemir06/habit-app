import React, { useState, useEffect } from "react";
import ProfileSettings from "./ProfileSettings";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import { useParams } from "react-router-dom";
import {
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  isWidthUp,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import HabitBlock from "./HabitBlock";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    margin: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(2),
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
  images: {
    position: "relative",
    display: "flex",
    background: "rgb(252,0,255)",
    background:
      "-moz-radial-gradient(circle, rgba(252,0,255,1) 0%, rgba(205,47,255,1) 22%, rgba(146,107,255,1) 50%, rgba(67,186,255,1) 77%, rgba(0,254,255,1) 100%)",
    background:
      "-webkit-radial-gradient(circle, rgba(252,0,255,1) 0%, rgba(205,47,255,1) 22%, rgba(146,107,255,1) 50%, rgba(67,186,255,1) 77%, rgba(0,254,255,1) 100%)",
    background:
      "radial-gradient(circle, rgba(252,0,255,1) 0%, rgba(205,47,255,1) 22%, rgba(146,107,255,1) 50%, rgba(67,186,255,1) 77%, rgba(0,254,255,1) 100%)",
    filter:
      "progid:DXImageTransform.Microsoft.gradient(startColorstr='#fc00ff',endColorstr='#00feff',GradientType=1)",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  profileImage: {
    position: "absolute",
    top: "100px",
    left: "50px",
    width: 150,
    height: 150,
    borderRadius: "50%",
    border: "4px solid white",
    background: "#e0e0e0",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    [theme.breakpoints.down("sm")]: {
      left: "calc(50% - 75px)",
    },
  },
  backgroundImage: {
    height: 200,
    maxWidth: "100%",
  },
  settings: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
  },
  username: {
    position: "absolute",
    color: "white",
    bottom: "20px",
    left: "225px",
    [theme.breakpoints.down("sm")]: {
      left: "calc(50% - 45px)",
      top: "260px",
      color: "black",
    },
  },
  profileInfo: {
    marginTop: theme.spacing(12),
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  summary: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
      justifyContent: "left",
    },
  },
  description: {
    minHeight: 200,
    maxWidth: "50%",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      minHeight: 0,
      maxWidth: "100%",
    },
  },
  socials: {
    minHeight: 200,
    maxWidth: "50%",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      minHeight: 0,
      maxWidth: "100%",
    },
    habitList: {
      display: "flex",
      flexDirection: "column",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Profile({
  userId,
  userName,
  firstName,
  lastName,
  email,
  setUserId,
  setUserName,
  setFirstName,
  setLastName,
  setEmail,
  isUser,
}) {
  const [tempUserId, setTempUserId] = useState("");
  const [tempUserName, setTempUserName] = useState("");
  const [tempFirstName, setTempFirstName] = useState();
  const [tempLastName, setTempLastName] = useState();
  const [tempEmail, setTempEmail] = useState();
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [settingsClicked, setSettingsClicked] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  let params = useParams();
  const [listOfHabits, setListOfHabits] = useState([]);

  useEffect(() => {
    if (userId && isUser) {
      getUserOptionals(userId);
    }
    if (!isUser) {
      getOtherUser();
    }
  }, [userId]);

  const getOtherUser = () => {
    fetch("../api/getOtherUserInfo" + "?user_name=" + params.username)
      .then((response) => {
        if (!response.ok) {
          console.log("Not ok");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setTempUserId(data.user_id);
          setTempUserName(data.user_name);
          setTempFirstName(data.first_name);
          setTempLastName(data.last_name);
          setTempEmail(data.email);
          getUserOptionals(data.user_id);
          // getHabits(data.user_id);
        }
      });
  };

  const getUserOptionals = (user_id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    };
    fetch("../api/getUserOptionals", requestOptions)
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
          setDescription(data.description);
          setFacebook(data.facebook);
          setInstagram(data.instagram);
          setTwitter(data.twitter);
          setProfileImg(data.profile_img);
          setBackgroundImg(data.background_img);
        } else {
          console.log("No Data");
        }
        setLoaded(true);
        getHabits(user_id);
      });
  };

  const getHabits = (user_id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    };
    fetch("../api/getUserHabits", requestOptions)
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
          // for (let habit in data.list_of_habits) {
          //   listOfAllHabits.add(data.list_of_habits[habit].habit_id.habit_id);
          // }
          setListOfHabits(data.list_of_habits);
        } else {
          console.log("No Data");
          setListOfHabits([]);
        }
      });
  };

  let tempCompleted = false;
  return (
    <div className={classes.root}>
      {!settingsClicked ? (
        <div>
          <div className={classes.images}>
            <img className={classes.profileImage} src={profileImg} />
            <img className={classes.backgroundImage} src={backgroundImg} />
            <Typography
              className={classes.username}
              variant="h4"
              align="center"
            >
              {isUser ? firstName : tempFirstName}{" "}
              {isUser ? lastName : tempLastName}
            </Typography>
            {isUser ? (
              <IconButton
                onClick={() => setSettingsClicked(!settingsClicked)}
                color="gray"
                size="medium"
                className={classes.settings}
              >
                <SettingsIcon fontSize="small" />
              </IconButton>
            ) : null}
          </div>
          <div className={classes.profileInfo}>
            <Divider className={classes.divider} />
            <div className={classes.summary}>
              <div className={classes.description}>
                <Typography variant="h6" style={{ maxWidth: "100%" }}>
                  {"u/" + (isUser ? userName : tempUserName)}
                </Typography>
                <br />
                <Typography variant="body1" style={{ maxWidth: "100%" }}>
                  {description}
                </Typography>
              </div>
              <div className={classes.socials}>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem
                    button
                    onClick={() => (window.location.href = facebook)}
                  >
                    <ListItemIcon>
                      <FacebookIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Facebook" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => (window.location.href = instagram)}
                  >
                    <ListItemIcon>
                      <InstagramIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Instagram" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => (window.location.href = twitter)}
                  >
                    <ListItemIcon>
                      <TwitterIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Twitter" />
                  </ListItem>
                </List>
              </div>
              <div className={classes.habitList}></div>
            </div>
            <Divider className={classes.divider} />
            <Typography
              variant="h4"
              align="center"
            > User Habits</Typography>
            <br />
            {listOfHabits.map((habit) => {
              let index = listOfHabits.findIndex(
                (habitItem) => habitItem.habit_id === habit.habit_id
              );
              if (habit.completed) {
                tempCompleted = true;
                return (
                  <div>
                    <HabitBlock
                      habitName={habit.habit_id.habit_name}
                      startDate={habit.start_date}
                      streak={habit.streak}
                      habitId={habit.habit_id.habit_id}
                      userId={userId}
                      getHabits={getHabits}
                      completed={habit.completed}
                    />
                    <br />
                  </div>
                );
              } else if (index == listOfHabits.length - 1 && !tempCompleted) {
                return (
                  <div>
                    <h3>No habits here...</h3>
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <ProfileSettings
          userId={userId}
          userName={userName}
          firstName={firstName}
          lastName={lastName}
          email={email}
          description={description}
          facebook={facebook}
          instagram={instagram}
          twitter={twitter}
          profileImg={profileImg}
          backgroundImg={backgroundImg}
          loaded={loaded}
          setUserId={setUserId}
          setUserName={setUserName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setDescription={setDescription}
          setFacebook={setFacebook}
          setInstgram={setInstagram}
          setTwitter={setTwitter}
          setProfileImg={setProfileImg}
          setBackgroundImg={setBackgroundImg}
          setLoaded={setLoaded}
          setSettingsClicked={setSettingsClicked}
        />
      )}
    </div>
  );
}

export default Profile;
