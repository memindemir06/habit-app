import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { Button, Typography, TextField, IconButton } from "@material-ui/core";
import axios from "axios";
// import EditIcon from "@material-ui/icons/EditRounded";
import SaveIcon from "@material-ui/icons/SaveRounded";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import CancelIcon from "@material-ui/icons/Cancel";

const profileStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

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
  setInstgram,
  setTwitter,
  setProfileImg,
  setBackgroundImg,
  setLoaded,
  setSettingsClicked,
}) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [blankField, setBlankField] = useState(false);

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
        // return res.json();
        // causes useEffect to be called -> update all the states
        // setUserId("");
      })
      .catch((err) => console.log(err));
  };

  const handleProfileImgSubmit = (file) => {
    handleImageUpdate(file[0], null);
    setOpen(false);
    // setProfileImg(file[0]);
  };

  const handleBackgroundImgSubmit = (file) => {
    handleImageUpdate(null, file[0]);
    setOpen(false);
    // setBackgroundImg(file[0]);
  };

  const backToProfile = () => {
    setUserId("");
    setSettingsClicked(false);
  };

  const UploadFile = ({ profile }) => {
    return (
      <div style={profileStyle}>
        <Button
          onClick={() => setOpen(true)}
          color="primary"
          variant="outlined"
          size="large"
        >
          {profile
            ? profileImg
              ? "Change Profile Picture"
              : "Add Profile Picture"
            : backgroundImg
            ? "Change Background Picture"
            : "Add Background Picture"}
        </Button>
        <DropzoneDialog
          open={open}
          onSave={profile ? handleProfileImgSubmit : handleBackgroundImgSubmit}
          filesLimit={1}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp", "image/webp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  };

  return (
    <div className="App">
      <div className="required" style={profileStyle}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={backToProfile}
        >
          Back to Profile
        </Button>
        <Typography variant="h3" align="center">
          Profile Settings
        </Typography>
        <br />
        <Typography variant="h4" align="center">
          Required Fields
        </Typography>
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
          required={true}
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
          required={true}
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
          required={true}
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
          required={true}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SaveIcon />}
          onClick={handleSaveChangesRequired}
          disableElevation
        >
          Save Changes Required
        </Button>
      </div>
      <br />
      <div className="optionals" style={profileStyle}>
        <Typography variant="h4" align="center">
          Optional Fields
        </Typography>
        <br />
        <UploadFile profile={true} />
        <br />
        <UploadFile profile={false} />
        <br />
        <TextField
          disabled={edit}
          label="Description"
          style={{ margin: 8 }}
          margin="normal"
          variant="outlined"
          multiline={true}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          onChange={(e) => setFacebook(e.target.value)}
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
          onChange={(e) => setInstagram(e.target.value)}
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
          onChange={(e) => setTwitter(e.target.value)}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SaveIcon />}
          onClick={handleOptionalSubmit}
          disableElevation
        >
          Save Changes Optional
        </Button>
      </div>
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
