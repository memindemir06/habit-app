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
    width: "300px",
    [theme.breakpoints.down("sm")]: {
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
    marginLeft: "5px",
  },
}));

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch("api/login", requestOptions)
      .then((response) => {
        if (!response.ok) {
          setInvalid(true);
          // SET ALERT -> Validate at start of function
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (
          data == "Invalid Email" ||
          data == "Invalid Password" ||
          data == "Invalid post data, did not find the email and password"
        ) {
          setInvalid(true);
        } else {
          history.push("/../");
          history.go(0);
        }
      });
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.mainContainer} spacing={3}>
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
            Login
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Collapse in={invalid}>
            <Alert severity="error" onClose={() => setInvalid(false)}>
              Email or Password invalid
            </Alert>
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            required
            label="Email address"
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth={true}
            onChange={emailChange}
          />
          <br />
          <TextField
            required
            type="password"
            label="Password"
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth={true}
            onChange={passwordChange}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                loginButtonPressed();
                ev.preventDefault();
              }
            }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            size="medium"
            fullWidth={true}
            onClick={loginButtonPressed}
          >
            Log in
          </Button>
          {/*<br />
          <br />
          <Button
            to="/register"
            component={Link}
            variant="contained"
            color="secondary"
            size="small"
            fullWidth={true}
          >
            Register
          </Button>*/}
        </Grid>
        <Grid item xs={12} align="center" style={{ marginTop: "2em" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">Don't have an account yet? </Typography>
            <Typography
              className={classes.loginLink}
              variant="body2"
              component={Link}
              to={"/register"}
            >
              Register
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
