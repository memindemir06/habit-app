import React, { useState, useEffect } from "react";
import ProfileSettings from "./ProfileSettings";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  IconButton,
  Typography,
  Grid,
  Paper,
  Card,
  CardHeader,
  Avatar,
} from "@material-ui/core";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(4),
  },
  images: {
    position: "relative",
    display: "flex",
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
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
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
            <img className={classes.profileImage} src={profileImg} />
            <img className={classes.backgroundImage} src={backgroundImg} />
            <Typography
              className={classes.username}
              variant="h5"
              align="center"
            >
              {firstName} {lastName}
            </Typography>
            <IconButton
              onClick={() => setSettingsClicked(!settingsClicked)}
              color="gray"
              size="small"
              className={classes.settings}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
          </div>
          <br />
          <br />
          <br />
          <div className="profile-info">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>{description}</Paper>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardHeader
                      avatar={
                        <IconButton>
                          <FacebookIcon color="primary" />
                        </IconButton>
                      }
                      title={facebook}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardHeader
                      avatar={
                        <IconButton>
                          <InstagramIcon color="secondary" />
                        </IconButton>
                      }
                      title={instagram}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardHeader
                      avatar={
                        <IconButton>
                          <TwitterIcon color="primary" />
                        </IconButton>
                      }
                      title={twitter}
                    />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
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
