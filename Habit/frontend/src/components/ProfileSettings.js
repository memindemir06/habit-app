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
} from "@material-ui/core";
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
  backButton: {
    alignSelf: "flex-end",
  },
  title: {
    alignSelf: "flex-start",
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
  loaded,
  setUserId,
  setUserName,
  setFirstName,
  setLastName,
  setEmail,
  setDescription,
  setFacebook,
  setInstagram,
  setTwitter,
  setProfileImg,
  setBackgroundImg,
  setLoaded,
  setSettingsClicked,
  darkState,
  setDarkState,
}) => {
  // const [open, setOpen] = useState(false);
  const [profileImgOpen, setProfileImgOpen] = useState(false);
  const [backgroundImgOpen, setBackgroundImgOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [blankField, setBlankField] = useState(false);
  const [value, setValue] = useState(0);
  const tabColor = darkState ? "#ffffff" : "#000000";
  const classes = useStyles();
  const theme = useTheme();

  const userNameChange = (e) => {
    setUserName(e.target.value);
  };
  const firstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          if (data) {
            console.log(data);
            setUserId("");
            // Add Alert -> profile updated!
          } else {
            console.log("No Data!");
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
        // return res.json();
        // causes useEffect to be called -> update all the states
        // setUserId("");
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
    setValue(index);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
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
      <Button
        variant="contained"
        color="secondary"
        startIcon={<ArrowBackIcon />}
        onClick={backToProfile}
        className={classes.backButton}
      >
        Back to Profile
      </Button>
      <Typography className={classes.title} variant="h4" align="center">
        Profile Settings
      </Typography>
      <Divider
        style={{
          width: "100%",
          margin: theme.spacing(1),
          alignSelf: "flex-start",
        }}
      />

      <AppBar position="static" className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            style={{ marginLeft: "2em", color: tabColor }}
            label="Required"
          />
          <Tab style={{ color: tabColor }} label="Optional" />
          <div style={{ flexGrow: 1 }}></div>
        </Tabs>
      </AppBar>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <div className="required" className={classes.profileStyle}>
            <br />
            <br />
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
              onChange={userNameChange}
              required={true}
              className={classes.input}
            />
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
            />
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
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              endIcon={<SaveIcon />}
              onClick={handleSaveChangesRequired}
              disableElevation
            >
              Save Changes
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="optionals" className={classes.profileStyle}>
            <Typography variant="h4" align="center">
              Optional Fields
            </Typography>
            <br />
            <UploadProfileImg />
            <br />
            <UploadBackgroundImg />
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
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              endIcon={<SaveIcon />}
              onClick={handleOptionalSubmit}
              disableElevation
            >
              Save Changes
            </Button>
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default ProfileSettings;

//   const handleCancelClicked = () => {
//     // setEdit(true);
//     setSettingsClicked(false);
//     // change userId -> to execute useEffect -> reset all states which have been changed
//     setUserId("");
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//    const handleSave = (file) => {
//    console.log(file[0]);
//    handleSaveChanges(file[0], file[0]);
//    setProfileImg(file[0]);
//    setBackgroundImg(file[0]);
//    setOpen(false);
//     file.preventDefault();
//     console.log(this.state);
//     let form_data = new FormData();
//     form_data.append("image", this.state.image, this.state.image.name);
//     form_data.append("title", this.state.title);
//     form_data.append("content", this.state.content);
//     let url = "http://localhost:8000/api/updateProfile";
//     axios
//       .post(url, form_data, {
//         headers: {
//           "content-type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   };
// const UploadFile = () => {
//   return (
//     <div style={profileStyle}>
//       <Button onClick={handleOpen}>Add Image</Button>
//       <DropzoneDialog
//         open={open}
//         onSave={handleSave}
//         filesLimit={1}
//         acceptedFiles={["image/jpeg", "image/png", "image/bmp", "image/webp"]}
//         showPreviews={true}
//         maxFileSize={5000000}
//         onClose={handleClose}
//       />
//     </div>
//   );
// };

//   if (!loaded) {
//     return <LoadingPage />;
//   }

//   return (
//     <div style={profileStyle}>
//       {/* <div> */}

//         {/* <Button
//           variant="contained"
//           color="secondary"
//           endIcon={<CancelIcon />}
//           onClick={handleCancelClicked}
//           disableElevation
//         >
//           Cancel
//         </Button> */}
//       {/* </div> */}
//       {/* <br />
//       <UploadFile />
//       <br /> */}
//       <TextField
//         disabled={edit}
//         label="Username"
//         style={{ margin: 8 }}
//         margin="normal"
//         variant="outlined"
//         multiline={true}
//         value={userName}
//         onChange={userNameChange}
//       />
//       <br />
//       <TextField
//         disabled={edit}
//         label="Email"
//         style={{ margin: 8 }}
//         margin="normal"
//         variant="outlined"
//         multiline={true}
//         value={email}
//         onChange={emailChange}
//       />
//       <br />
//       <TextField
//         disabled={edit}
//         label="First Name"
//         style={{ margin: 8 }}
//         margin="normal"
//         variant="outlined"
//         multiline={true}
//         value={firstName}
//         onChange={firstNameChange}
//       />
//       <br />
//       <TextField
//         disabled={edit}
//         label="Last Name"
//         style={{ margin: 8 }}
//         margin="normal"
//         variant="outlined"
//         multiline={true}
//         value={lastName}
//         onChange={lastNameChange}
//       />
//        <Button
//           variant="contained"
//           color="primary"
//           endIcon={<SaveIcon />}
//           // onClick={handleSaveChanges}
//           onClick={handleSaveChangesRequired}
//           disableElevation
//         >
//           Save Changes Required
//         </Button>
//       {/* <br />
//       <TextField
//         disabled={edit}
//         label="Description"
//         style={{ margin: 8 }}
//         margin="normal"
//         variant="outlined"
//         multiline={true}
//         value={description}
//         onChange={descriptionChange}
//       />
//       <br />
//       <TextField
//         disabled={edit}
//         label="Facebook"
//         style={{ margin: 8 }}
//         margin="normal"
//         variant="outlined"
//         multiline={true}
//         value={facebook}
//         onChange={facebookChange}
//       />
//       <br />
//       <TextField
//         disabled={edit}
//         label="Instagram"
//         style={{ margin: 8 }}
//         margin="normal"
//         variant="outlined"
//         multiline={true}
//         value={instagram}
//         onChange={instagramChange}
//       />
//       <br />
//       <TextField
//         disabled={edit}
//         label="Twitter"
//         style={{ margin: 8 }}
//         margin="normal"
//         variant="outlined"
//         multiline={true}
//         value={twitter}
//         onChange={twitterChange}
//       />
//       <br /> */}
//     </div>
//   );
// }
// export default ProfileSettings;
