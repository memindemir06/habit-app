import React, { useState, useEffect, useDebugValue } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Tab,
  Tabs,
  AppBar,
  Divider,
  Dialog,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Collapse,
  Grid,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import LoadingPage from "./LoadingPage";
import { DropzoneDialog } from "material-ui-dropzone";
import axios from "axios";
// import EditIcon from "@material-ui/icons/EditRounded";
import SaveIcon from "@material-ui/icons/SaveRounded";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(8),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
  profileStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {},
  titleContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "800",
  },
  tabs: {
    backgroundColor: "transparent",
    boxShadow: "none",
    display: "flex",
  },
  input: {
    margin: 8,
    minWidth: 400,
    [theme.breakpoints.down("xs")]: {
      minWidth: 300,
    },
  },
}));

const ProfileSettings = ({
  userId,
  userName,
  firstName,
  lastName,
  email,
  description,
  facebook,
  instagram,
  twitter,
  profileImg,
  backgroundImg,
  setUserId,
  setUserName,
  setFirstName,
  setLastName,
  setEmail,
  setDescription,
  setFacebook,
  setInstagram,
  setTwitter,
  setSettingsClicked,
  darkState,
}) => {
  // const [open, setOpen] = useState(false);
  const [profileImgOpen, setProfileImgOpen] = useState(false);
  const [backgroundImgOpen, setBackgroundImgOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [blankField, setBlankField] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [userNameAlert, setUserNameAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [inputUserName, setInputUserName] = useState("");
  const tabColor = darkState ? "#ffffff" : "#000000";
  const classes = useStyles();
  const theme = useTheme();

  const firstNameChange = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };
  const lastNameChange = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };
  const emailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  const handleSaveChangesRequired = () => {
    if (userName == "" || firstName == "" || lastName == "" || email == "") {
      // set alert for required
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          user_name: userName,
          email: email,
          first_name: firstName,
          last_name: lastName,
        }),
      };

      fetch("../api/updateProfileRequired", requestOptions)
        .then((response) => {
          if (!response.ok) {
            console.log("Bad Request: ", response);
            // Not all fields are updated
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if (data == "Username already exists!") {
            setUserNameAlert(true);
          } else if (data == "Email already used!") {
            setEmailAlert(true);
          } else if (data == "Username and Email already exists") {
            setUserNameAlert(true);
            setEmailAlert(true);
          } else {
            console.log(data);
            setUserId("");
          }
        });
    }
  };

  const handleOptionalSubmit = (profile_img, background_img) => {
    let form_data = new FormData();
    form_data.append("user_id", userId);
    form_data.append("description", description);
    form_data.append("facebook", facebook);
    form_data.append("instagram", instagram);
    form_data.append("twitter", twitter);
    form_data.append("profile_img", profile_img ? profile_img : profileImg);
    form_data.append(
      "background_img",
      background_img ? background_img : backgroundImg
    );

    let url = "../api/updateProfileOptionals";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleImageUpdate = (profile_img, background_img) => {
    let form_data = new FormData();
    form_data.append("user_id", userId);
    form_data.append("profile_img", profile_img ? profile_img : profileImg);
    form_data.append(
      "background_img",
      background_img ? background_img : backgroundImg
    );

    let url = "../api/updateProfileImage";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleProfileImgSubmit = (file) => {
    handleImageUpdate(file[0], null);
    setProfileImgOpen(false);
  };

  const handleBackgroundImgSubmit = (file) => {
    handleImageUpdate(null, file[0]);
    setBackgroundImgOpen(false);
  };

  const backToProfile = () => {
    setUserId("");
    setSettingsClicked(false);
  };

  const UploadProfileImg = () => {
    return (
      <div className={classes.profileStyle}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setProfileImgOpen(true)}
          color="primary"
          fullWidth={true}
        >
          {profileImg ? "Change Profile Picture" : "Add Profile Picture"}
        </Button>
        <DropzoneDialog
          open={profileImgOpen}
          // onSave={handleProfileImgSubmit}
          onSave={handleProfileImgSubmit}
          filesLimit={1}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp", "image/webp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={() => setProfileImgOpen(false)}
        />
      </div>
    );
  };
  const UploadBackgroundImg = () => {
    return (
      <div className={classes.profileStyle}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setBackgroundImgOpen(true)}
          color="primary"
          fullWidth={true}
        >
          {backgroundImg
            ? "Change Background Picture"
            : "Add Background Picture"}
        </Button>
        <DropzoneDialog
          open={backgroundImgOpen}
          onSave={handleBackgroundImgSubmit}
          filesLimit={1}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp", "image/webp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={() => setBackgroundImgOpen(false)}
        />
      </div>
    );
  };

  const handleChangeIndex = (index) => {
    setTabValue(index);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={tabValue !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {tabValue === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography className={classes.title} variant="h4" align="center">
          Profile Settings
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={backToProfile}
          className={classes.backButton}
        >
          Back to Profile
        </Button>
      </div>
      <Divider
        style={{
          width: "100%",
          margin: theme.spacing(1),
          alignSelf: "flex-start",
        }}
      />

      <Grid container style={{ marginTop: "3em" }} spacing={2}>
        <Grid style={{ height: "600px" }} item xs={12} md={6}>
          <Typography variant="h4" align="center">
            Required Fields
          </Typography>
          <br />
          <TextField
            disabled={edit}
            label="Username"
            margin="normal"
            variant="outlined"
            multiline={true}
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            required={true}
            className={classes.input}
            fullWidth={true}
          />
          <br />
          <Collapse in={userNameAlert}>
            <Alert severity="error" onClose={() => setUserNameAlert(false)}>
              Username already used!
            </Alert>
          </Collapse>
          <br />
          <TextField
            disabled={edit}
            label="Email"
            margin="normal"
            variant="outlined"
            multiline={true}
            value={email}
            onChange={emailChange}
            required={true}
            className={classes.input}
            fullWidth={true}
          />
          <br />
          <Collapse in={emailAlert}>
            <Alert severity="error" onClose={() => setEmailAlert(false)}>
              Email already used!
            </Alert>
          </Collapse>
          <br />
          <TextField
            disabled={edit}
            label="First Name"
            margin="normal"
            variant="outlined"
            multiline={true}
            value={firstName}
            onChange={firstNameChange}
            required={true}
            className={classes.input}
            fullWidth={true}
          />
          <br />
          <TextField
            disabled={edit}
            label="Last Name"
            margin="normal"
            variant="outlined"
            multiline={true}
            value={lastName}
            onChange={lastNameChange}
            required={true}
            className={classes.input}
            fullWidth={true}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SaveIcon />}
            onClick={handleSaveChangesRequired}
            disableElevation
            fullWidth={true}
          >
            Save Changes
          </Button>
        </Grid>
        <Grid item style={{ height: "600px" }} xs={12} md={6}>
          <Typography variant="h4" align="center">
            Optional Fields
          </Typography>
          <br />
          <div style={{ width: "100%" }}>
            <UploadProfileImg />
          </div>
          <br />
          <div style={{ width: "100%" }}>
            <UploadBackgroundImg />
          </div>
          <br />
          <TextField
            disabled={edit}
            label="Description"
            margin="normal"
            variant="outlined"
            multiline={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={classes.input}
            fullWidth={true}
          />
          <br />
          <TextField
            disabled={edit}
            label="Facebook"
            margin="normal"
            variant="outlined"
            multiline={true}
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className={classes.input}
            fullWidth={true}
          />
          <br />
          <TextField
            disabled={edit}
            label="Instagram"
            margin="normal"
            variant="outlined"
            multiline={true}
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className={classes.input}
            fullWidth={true}
          />
          <br />
          <TextField
            disabled={edit}
            label="Twitter"
            margin="normal"
            variant="outlined"
            multiline={true}
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className={classes.input}
            fullWidth={true}
          />
          <br />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SaveIcon />}
            onClick={handleOptionalSubmit}
            disableElevation
            fullWidth={true}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileSettings;
