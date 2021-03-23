import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { Button } from "@material-ui/core";
import axios from "axios";
// import { TextField, Button } from "@material-ui/core";
// import EditIcon from "@material-ui/icons/EditRounded";
// import SaveIcon from "@material-ui/icons/SaveRounded";
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
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (file) => {
    // console.log(event);
    // file.preventDefault();

    setSettingsClicked(false);
    setOpen(false);

    let form_data = new FormData();
    form_data.append("user_id", userId);
    form_data.append("description", description);
    form_data.append("facebook", facebook);
    form_data.append("instagram", instagram);
    form_data.append("twitter", twitter);
    form_data.append("profile_img", file[0]);
    form_data.append("background_img", backgroundImg);

    let url = "../api/updateProfile";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        // causes useEffect to be called -> update all the states
        setUserId("");
      })
      .catch((err) => console.log(err));
  };

  const handleFileChange = (file) => {
    if (file.length > 0) {
      setProfileImg(file);
      console.log(file[0]);
    }
  };

  const handleSave = (file) => {
    // e.preventDefault();
    // setOpen(false);
    // console.log(e);
    console.log(file);
    file.preventDefault();
  };

  const UploadFile = () => {
    return (
      <div style={profileStyle}>
        <Button
          onClick={() => setOpen(true)}
          color="primary"
          variant="outlined"
          size="large"
        >
          {profileImg ? "Change Profile Picture" : "Add Profile Picture"}
        </Button>
        <DropzoneDialog
          open={open}
          onSave={handleSubmit}
          filesLimit={1}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp", "image/webp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={() => setOpen(false)}
          // onChange={handleFileChange}
        />
      </div>
    );
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Change Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          {"   " + description}
        </p>
        <br />
        <UploadFile />
        <br />
        <p>
          <input
            type="file"
            // id="image"
            accept="image/png, image/jpeg, image/webp"
            onChange={(event) => setProfileImg(event.target.files[0])}
            required
          />
        </p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default ProfileSettings;

//   const handleSaveChanges = (img1, img2) => {
//     // setEdit(true);
//     setSettingsClicked(false);
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user_id: userId,
//         user_name: userName,
//         email: email,
//         first_name: firstName,
//         last_name: lastName,
//         description: description,
//         facebook: facebook,
//         instagram: instagram,
//         twitter: twitter,
//         profile_img: img1,
//         background_img: img2,
//       }),
//     };

//     fetch("../api/updateProfile", requestOptions)
//       .then((response) => {
//         if (!response.ok) {
//           console.log("Bad Request: ", response);
//         } else {
//           return response.json();
//         }
//       })
//       .then((data) => {
//         if (data) {
//           console.log(data);
//           // Add Alert -> profile updated!
//         } else {
//           console.log("No Data!");
//         }
//       });
//   };

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
//       <div>
//         <Button
//           variant="contained"
//           color="primary"
//           endIcon={<SaveIcon />}
//           // onClick={handleSaveChanges}
//           onClick={handleSave}
//           disableElevation
//         >
//           Save Changes
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           endIcon={<CancelIcon />}
//           onClick={handleCancelClicked}
//           disableElevation
//         >
//           Cancel
//         </Button>
//       </div>
//       <br />
//       <UploadFile />
//       <br />
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
//       <br />
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
//       <br />
//     </div>
//   );
// }
// export default ProfileSettings;
