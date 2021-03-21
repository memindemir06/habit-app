import React, { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";
import { TextField, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditRounded";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";
import { DropzoneDialog } from "material-ui-dropzone";

function ProfileSettings({
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
  setInstgram,
  setTwitter,
  setProfileImg,
  setBackgroundImg,
  setLoaded,
}) {
  const [edit, setEdit] = useState(true);
  const [open, setOpen] = useState(false);

  const profileStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const userNameChange = (event) => {
    setUserName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const firstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const lastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const facebookChange = (event) => {
    setFacebook(event.target.value);
  };
  const instagramChange = (event) => {
    setInstagram(event.target.value);
  };
  const twitterChange = (event) => {
    setTwitter(event.target.value);
  };

  const handleSaveChanges = (img1, img2) => {
    setEdit(true);
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
        description: description,
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
        profile_img: img1,
        background_img: img2,
      }),
    };

    fetch("../api/updateProfile", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("Bad Request: ", response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          // Add Alert -> profile updated!
        } else {
          console.log("No Data!");
        }
      });
  };

  const handleCancelClicked = () => {
    setEdit(true);
    // change userId -> to execute useEffect -> reset all states which have been changed
    setUserId("");
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (file) => {
    console.log(file[0]);
    handleSaveChanges(file[0], file[0]);
    setProfileImg(file[0]);
    setBackgroundImg(file[0]);
    setOpen(false);
  };

  const UploadFile = () => {
    return (
      <div style={profileStyle}>
        <Button onClick={handleOpen}>Add Image</Button>
        <DropzoneDialog
          open={open}
          onSave={handleSave}
          filesLimit={1}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp", "image/webp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={handleClose}
        />
      </div>
    );
  };

  if (!loaded) {
    return <LoadingPage />;
  }

  return (
    <div style={profileStyle}>
      {edit ? (
        <Button
          variant="contained"
          color="secondary"
          endIcon={<EditIcon />}
          onClick={() => setEdit(false)}
          disableElevation
        >
          Edit Profile
        </Button>
      ) : (
        <div>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SaveIcon />}
            onClick={handleSaveChanges}
            disableElevation
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<CancelIcon />}
            onClick={handleCancelClicked}
            disableElevation
          >
            Cancel
          </Button>
        </div>
      )}
      <br />
      {edit ? null : <UploadFile />}
      {/* <UploadFile disabled={edit} /> */}
      <br />
      <TextField
        disabled={edit}
        label="Username"
        style={{ margin: 8 }}
        margin="normal"
        variant="outlined"
        multiline={true}
        value={userName}
        onChange={userNameChange}
      />
      <br />
      <TextField
        disabled={edit}
        label="Email"
        style={{ margin: 8 }}
        margin="normal"
        variant="outlined"
        multiline={true}
        value={email}
        onChange={emailChange}
      />
      <br />
      <TextField
        disabled={edit}
        label="First Name"
        style={{ margin: 8 }}
        margin="normal"
        variant="outlined"
        multiline={true}
        value={firstName}
        onChange={firstNameChange}
      />
      <br />
      <TextField
        disabled={edit}
        label="Last Name"
        style={{ margin: 8 }}
        margin="normal"
        variant="outlined"
        multiline={true}
        value={lastName}
        onChange={lastNameChange}
      />
      <br />
      <TextField
        disabled={edit}
        label="Description"
        style={{ margin: 8 }}
        margin="normal"
        variant="outlined"
        multiline={true}
        value={description}
        onChange={descriptionChange}
      />
      <br />
      <TextField
        disabled={edit}
        label="Facebook"
        style={{ margin: 8 }}
        margin="normal"
        variant="outlined"
        multiline={true}
        value={facebook}
        onChange={facebookChange}
      />
      <br />
      <TextField
        disabled={edit}
        label="Instagram"
        style={{ margin: 8 }}
        margin="normal"
        variant="outlined"
        multiline={true}
        value={instagram}
        onChange={instagramChange}
      />
      <br />
      <TextField
        disabled={edit}
        label="Twitter"
        style={{ margin: 8 }}
        margin="normal"
        variant="outlined"
        multiline={true}
        value={twitter}
        onChange={twitterChange}
      />
      <br />
    </div>
  );
}
export default ProfileSettings;
