import React, { useState } from "react";
import {
  Box,
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
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },

  imgContainer: {
    background: theme.palette.primary.main,
    height: "64px",
    width: "64px",
    msTransform: "rotate(45deg)",
    transform: "rotate(45deg)",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 8px 24px 0 rgba(0, 0, 0, 0.22)",
  },

  pageTitle: {
    marginTop: 32,
    fontWeight: "600",
  },
  loginLink: {
    fontWeight: "800",
    color: theme.palette.text.primary,
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
  const [userNameAlert, setUserNameAlert] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);
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
    if (event.target.value.length < 8) setPasswordLength(false);
    else setPasswordLength(false);
    setPassword(event.target.value);

    passwordChecker(event.target.value);

    if (validatePassword == event.target.value) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };
  const validatePasswordChange = (event) => {
    setValidatePassword(event.target.value);

    passwordChecker(event.target.value);

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
    if (age < 13 || age > 130) {
      setDobAlert(true);
      setBtnDisable(true);
    } else {
      setDobAlert(false);
      setBtnDisable(false);
    }
    console.log(age);
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
        if (data == "Username already exists!") {
          setUserNameAlert(true);
        } else if (data == "Email already used!") {
          setEmailAlert(true);
        } else if (data == "Username and Email already exists") {
          setUserNameAlert(true);
          setEmailAlert(true);
        } else {
          history.push("/../");
          history.go(0);
        }
      });
  };

  function passwordChecker(p) {
    let error = [];
    if (p.length < 8) {
      error.push("Your password must be at least 8 characters.\n");
    }
    if (p.search(/[a-z]/) < 0) {
      error.push("Your password must contain at least one letter.\n");
    }
    if (p.search(/[A-Z]/) < 0) {
      error.push("Your password must contain at least one capital letter.\n");
    }
    if (p.search(/[0-9]/) < 0) {
      error.push("Your password must contain at least one digit.\n");
    }
    if (p.search(/[!@#$%^&*]/) < 0) {
      error.push(
        "Your password must contain at least one special character.\n"
      );
    }

    if (error.length > 0) {
      error.join("\n");
      setErrors(error);
      setErrorAlert(true);
    } else {
      setErrors("");
      setErrorAlert(false);
    }
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.mainContainer} spacing={1}>
        <Grid item xs={12} align="center">
          <div className={classes.imgContainer}>
            <Box
              component={Link}
              to={"/"}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src="logo.png"
                width="32px"
                height="32px"
                style={{
                  msTransform: "rotate(-45deg)",
                  transform: "rotate(-45deg)",
                  marginTop: "15px",
                }}
              />
            </Box>
          </div>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography className={classes.pageTitle} variant="h4" component="h4">
            Create your account
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            required
            label="Username"
            variant="outlined"
            size="small"
            fullWidth={true}
            margin="normal"
            onChange={userNameChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Collapse in={userNameAlert}>
            <Alert severity="error" onClose={() => setUserNameAlert(false)}>
              User name already exists!
            </Alert>
          </Collapse>
        </Grid>
        <Grid item xs={6} align="center">
          <TextField
            required
            label="First Name"
            variant="outlined"
            size="small"
            fullWidth={true}
            margin="normal"
            onChange={firstNameChange}
          />
        </Grid>
        <Grid item xs={6} align="center">
          <TextField
            required
            label="Last Name"
            variant="outlined"
            size="small"
            fullWidth={true}
            margin="normal"
            onChange={lastNameChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            required
            label="Email address"
            type="email"
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth={true}
            onChange={emailChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Collapse in={emailAlert}>
            <Alert severity="error" onClose={() => setEmailAlert(false)}>
              Email already used!
            </Alert>
          </Collapse>
        </Grid>
        <Grid item xs={12} sm={6} align="center">
          <TextField
            required
            label="Password"
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth={true}
            onChange={passwordChange}
            type="password"
          />
        </Grid>
        <Grid item xs={12} sm={6} align="center">
          <TextField
            required
            label="Validate password"
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth={true}
            onChange={validatePasswordChange}
            type="password"
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Collapse in={!passwordsMatch}>
            <Alert severity="error" onClose={() => setPasswordsMatch(false)}>
              Passwords do not match!
            </Alert>
          </Collapse>
          <Collapse in={errorAlert}>
            <Alert severity="error" onClose={() => setErrorAlert(false)}>
              {errors.map((errorInfo) => {
                return (
                  <p style={{ textAlign: "left", fontSize: "12px" }}>
                    {errorInfo}
                  </p>
                );
              })}
            </Alert>
          </Collapse>
        </Grid>

        <Grid item xs={12} align="center">
          <TextField
            required
            variant="outlined"
            margin="normal"
            type="date"
            label="Date of Birth"
            size="small"
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            onChange={dobChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Collapse in={dobAlert}>
            <Alert severity="error">
              You are not old enough to create an account!
            </Alert>
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            size="medium"
            fullWidth={true}
            onClick={submitButtonPressed}
            disabled={btnDisable}
          >
            Create Account
          </Button>
        </Grid>
        <Grid item xs={8} align="right" style={{ marginTop: "2em" }}>
          <Typography variant="body2">Already have an account? </Typography>
        </Grid>
        <Grid item xs={4} align="left" style={{ marginTop: "2em" }}>
          <Typography
            className={classes.loginLink}
            variant="body2"
            component={Link}
            to={"/login"}
          >
            Log in
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
