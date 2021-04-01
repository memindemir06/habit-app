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
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },

  mainContainer: {
    width: "400px",
    marginTop: "3em",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },

  pageTitle: {
    marginTop: 32,
    fontWeight: "600",
  },
}));

function Register() {
  let history = useHistory();

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [dob, setDob] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [dobAlert, setDobAlert] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const classes = useStyles();
  const theme = useTheme();

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
    getAge(event.target.value);
  };

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 13) {
      setDobAlert(true);
      setBtnDisable(true);
    } else {
      setDobAlert(false);
      setBtnDisable(false);
    }
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
        history.push("/../");
        history.go(0);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.mainContainer} spacing={3}>
        <Grid item xs={12} align="center">
          <Typography className={classes.pageTitle} variant="h4" component="h4">
            Create your account
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Collapse in={!passwordsMatch}>
            <Alert severity="error">Passwords do not match!</Alert>
          </Collapse>
          <Collapse in={dobAlert}>
            <Alert severity="error">
              You are not old enough to create an account!
            </Alert>
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            required
            label="User Name"
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
            margin="normal"
            onChange={userNameChange}
          />
          <br />
          <TextField
            required
            label="First Name"
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
            margin="normal"
            onChange={firstNameChange}
          />
          <br />
          <TextField
            required
            label="Last Name"
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
            margin="normal"
            onChange={lastNameChange}
          />
          <br />
          <TextField
            required
            label="Enter Email"
            variant="outlined"
            margin="normal"
            size="small"
            style={{ width: "100%" }}
            onChange={emailChange}
          />
          <br />
          <TextField
            required
            label="Enter Password"
            variant="outlined"
            margin="normal"
            size="small"
            style={{ width: "100%" }}
            onChange={passwordChange}
            type="password"
          />
          <br />
          <TextField
            required
            label="Validate Password"
            variant="outlined"
            margin="normal"
            size="small"
            style={{ width: "100%" }}
            onChange={validatePasswordChange}
            type="password"
          />
          <br />
          <TextField
            required
            variant="outlined"
            margin="normal"
            type="date"
            label="Date of Birth"
            size="small"
            style={{ width: "100%" }}
            InputLabelProps={{ shrink: true }}
            onChange={dobChange}
          />
          <br /> <br />
          {/* </form> */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            style={{ width: "100%" }}
            onClick={submitButtonPressed}
            disabled={btnDisable}
          >
            Create Account
          </Button>
          <br /> <br />
          <Button
            to="/"
            component={Link}
            variant="contained"
            color="secondary"
            size="small"
            style={{ width: "100%" }}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
