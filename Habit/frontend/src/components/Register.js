import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Collapse,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";

function Register() {
  let history = useHistory();

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [dob, setDob] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // For the design

  // Handles State Changes
  const userNameChange = (event) => {
    setUserName(event.target.value);
  };
  const firstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const lastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
    if (validatePassword == event.target.value) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };
  const validatePasswordChange = (event) => {
    setValidatePassword(event.target.value);
    if (password == event.target.value) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };
  const dobChange = (event) => {
    setDob(event.target.value);
  };

  const submitButtonPressed = () => {
    //Validate textfields, password and dob
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        email: email,
        password: password,
        dob: dob,
      }),
    };

    fetch("api/register", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("Invalid data");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        history.push("/home");
      });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Create an Account
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Collapse in={!passwordsMatch}>
          <Alert severity="error">Passwords do not match!</Alert>
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        {/* <form autoComplete="on"> */}
        <TextField
          required
          label="User Name"
          variant="outlined"
          margin="normal"
          onChange={userNameChange}
        />
        <br />
        <TextField
          required
          label="First Name"
          variant="outlined"
          margin="normal"
          onChange={firstNameChange}
        />
        <br />
        <TextField
          required
          label="Last Name"
          variant="outlined"
          margin="normal"
          onChange={lastNameChange}
        />
        <br />
        <TextField
          required
          label="Enter Email"
          variant="outlined"
          margin="normal"
          onChange={emailChange}
        />
        <br />
        <TextField
          required
          label="Enter Password"
          variant="outlined"
          margin="normal"
          onChange={passwordChange}
        />
        <br />
        <TextField
          required
          label="Validate Password"
          variant="outlined"
          margin="normal"
          onChange={validatePasswordChange}
        />
        <br />
        <TextField
          required
          variant="outlined"
          margin="normal"
          type="date"
          label="Date of Birth"
          InputLabelProps={{ shrink: true }}
          onChange={dobChange}
        />
        <br /> <br />
        {/* </form> */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          onClick={submitButtonPressed}
        >
          Create Account
        </Button>
        <br /> <br />
        <Button
          to="/"
          component={Link}
          variant="contained"
          color="secondary"
          size="large"
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default Register;
