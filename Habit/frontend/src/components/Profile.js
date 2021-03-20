import React, { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";
import { TextField, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditRounded";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";

function Profile({
  leaveAccountCallback,
  userId,
  userName,
  firstName,
  lastName,
  email,
}) {
  
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");

  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(true);

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
          //setLoaded(true);
        } else {
          console.log("No Data");
        }
        setLoaded(true);
      });
  };

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

  const handleSaveChanges = () => {
    setEdit(true);
    const requestOptions = {
      method: "PATCH",
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
          // console.log(data);
          // Below call may not be needed..
          // getRequiredData();
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

export default Profile;
