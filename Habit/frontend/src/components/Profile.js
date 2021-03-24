import React, { useState, useEffect } from "react";
import ProfileSettings from "./ProfileSettings";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import { IconButton, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

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
}) {
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

  useEffect(() => {
    if (userId) {
      getUserOptionals(userId);
    }
  }, [userId]);

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
      });
  };

  return (
    <div className={classes.root}>
      {!settingsClicked ? (
        <div>
          <div className={classes.images}>
            <img
              className={classes.profileImage}
              src="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png"
              alt="Image not found"
            />
            <img
              className={classes.backgroundImage}
              src={backgroundImg}
              alt=""
            />
            <Typography
              className={classes.username}
              variant="h4"
              align="center"
            >
              {firstName} {lastName}
            </Typography>
            <IconButton
              onClick={() => setSettingsClicked(!settingsClicked)}
              color="gray"
              size="medium"
              className={classes.settings}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
          </div>
          <div className={classes.profileInfo}>
            <Divider className={classes.divider} />
            <div className={classes.summary}>
              <div className={classes.description}>
                <Typography variant="body1" style={{ maxWidth: "100%" }}>
                  I'm 6'1 sexy boi who loves smoking, jogging and yoga. Add me
                  if you want to do yoga with me. xx
                </Typography>
              </div>
              <div className={classes.socials}>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <ListItemIcon>
                      <FacebookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Facebook" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <TwitterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Twitter" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <InstagramIcon />
                    </ListItemIcon>
                    <ListItemText primary="Instagram" />
                  </ListItem>
                </List>
              </div>
              <div className={classes.habitList}></div>
            </div>
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
