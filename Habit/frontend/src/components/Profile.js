import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { Typography, TextField, Button, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditRounded";
import SaveIcon from "@material-ui/icons/SaveRounded";

function Profile({ leaveAccountCallback }) {
  const params = useParams();
  const history = useHistory();

  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  //   const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [description, setDescription] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [twitter, setTwitter] = useState(null);

  const [edit, setEdit] = useState(true);
  let pageLoaded = false;

  //   const [usernameEditClicked, setUsernameEditClicked] = useState(true);
  //   const [nameEditClicked, setNameEditClicked] = useState(true);
  //   const [emailEditClicked, setEmailEditClicked] = useState(true);
  //   const [descriptionEditClicked, setDescriptionEditClicked] = useState(true);
  //   const [facebookEditClicked, setFacebookEditClicked] = useState(true);
  //   const [instagramEditClicked, setInstagramEditClicked] = useState(true);
  //   const [twitterEditClicked, setTwitterEditClicked] = useState(true);

  useEffect(() => {
    fetch("../api/userIdValid" + "?user_id=" + params.userId)
      .then((response) => {
        if (!response.ok) {
          leaveAccountCallback();
          history.push("/ErrorPage");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (!data) {
          setUserId(null);
        } else {
          setUserName(data.user_name);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setUserId(data.user_id);
          setEmail(data.email);
          getUserOptionals(data.user_id);
        }
      });
  }, []);

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
          pageLoaded = true;
        } else {
          console.log("No Data");
        }
      });
  };

  // Bug -> if description is blank -> infinite load
  if (!description && !pageLoaded) {
    return <LoadingPage />;
  }
  
  const profileStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  //   const handleUsernameEditClicked = () => {
  //     setUsernameEditClicked(!usernameEditClicked);
  //   };
  //   const handleNameEditClicked = () => {
  //     setNameEditClicked(!nameEditClicked);
  //   };
  //   const handleEmailEditClicked = () => {
  //     setEmailEditClicked(!emailEditClicked);
  //   };
  //   const handleDescriptionEditClicked = () => {
  //     setDescriptionEditClicked(!descriptionEditClicked);
  //   };
  //   const handleFacebookEditClicked = () => {
  //     setFacebookEditClicked(!facebookEditClicked);
  //   };
  //   const handleInstagramEditClicked = () => {
  //     setInstagramEditClicked(!instagramEditClicked);
  //   };
  //   const handleTwitterEditClicked = () => {
  //     setTwitterEditClicked(!twitterEditClicked);
  //   };

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
          console.log(data);
          // Below call may not be needed..
          getUserOptionals(userId);
        } else {
          console.log("No Data!");
        }
      });
  };

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
        <Button
          variant="contained"
          color="primary"
          endIcon={<SaveIcon />}
          onClick={handleSaveChanges}
          disableElevation
        >
          Save Changes
        </Button>
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
      {/* <Typography variant="h6" align="center">
        {userName + ": Profile Page"}
      </Typography>
      <br /> 
      <form noValidate autoComplete="off">
        <div style={profileStyle}>
          <TextField
            disabled={usernameEditClicked}
            label="Username"
            defaultValue={userName}
          />
          <IconButton onClick={handleUsernameEditClicked}>
            {usernameEditClicked ? <EditIcon /> : <SaveIcon />}
          </IconButton>
          <br />
          <TextField
            disabled={nameEditClicked}
            label="Name"
            defaultValue={firstName + " " + lastName}
          />
          <IconButton onClick={handleNameEditClicked}>
            {nameEditClicked ? <EditIcon /> : <SaveIcon />}
          </IconButton>
          <br />
          <TextField
            disabled={emailEditClicked}
            label="Email"
            defaultValue={email}
          />
          <IconButton onClick={handleEmailEditClicked}>
            {emailEditClicked ? <EditIcon /> : <SaveIcon />}
          </IconButton>
          <br />
          <TextField
            disabled={descriptionEditClicked}
            label="Description"
            defaultValue={description}
          />
          <IconButton onClick={handleDescriptionEditClicked}>
            {descriptionEditClicked ? <EditIcon /> : <SaveIcon />}
          </IconButton>
          <br />
          <TextField
            disabled={facebookEditClicked}
            label="Facebook"
            defaultValue={facebook}
          />
          <IconButton onClick={handleFacebookEditClicked}>
            {facebookEditClicked ? <EditIcon /> : <SaveIcon />}
          </IconButton>
          <br />
          <TextField
            disabled={instagramEditClicked}
            label="Instagram"
            defaultValue={instagram}
          />
          <IconButton onClick={handleInstagramEditClicked}>
            {instagramEditClicked ? <EditIcon /> : <SaveIcon />}
          </IconButton>
          <br />
          <TextField
            disabled={twitterEditClicked}
            label="Twitter"
            defaultValue={twitter}
          />
          <IconButton onClick={handleTwitterEditClicked}>
            {twitterEditClicked ? <EditIcon /> : <SaveIcon />}
          </IconButton>
        </div>
      </form> */}
    </div>
  );
}

export default Profile;
