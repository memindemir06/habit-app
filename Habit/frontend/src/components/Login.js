import React, { useState } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import { Link, useHistory, Redirect } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          // SET ALERT -> Validate at start of function
          console.log("Invalid data");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          history.push("/../");
          history.go(0);
        } else {
          // SET ALERT
          console.log("Invalid Data");
        }
      });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Login
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          required
          label="Enter your Email"
          variant="outlined"
          margin="normal"
          onChange={emailChange}
        />
        <br />
        <TextField
          required
          label="Enter your Password"
          variant="outlined"
          margin="normal"
          onChange={passwordChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          onClick={loginButtonPressed}
        >
          Login
        </Button>
        <br />
        <br />
        <Button
          to="/register"
          component={Link}
          variant="contained"
          color="secondary"
          size="large"
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
}

export default Login;
