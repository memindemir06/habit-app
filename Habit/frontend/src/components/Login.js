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

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

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
        if (data) {
          history.push("/../");
          history.go(0);
        }
      });
  };

  return (
    <div style={{ marginLeft: "-50px", marginTop: "100px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
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
            label="Enter your Email"
            variant="outlined"
            margin="normal"
            onChange={emailChange}
          />
          <br />
          <TextField
            required
            type="password"
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
    </div>
  );
}

export default Login;
