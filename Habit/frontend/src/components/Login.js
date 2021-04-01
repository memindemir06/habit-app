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
        if (data) {
          history.push("/../");
          history.go(0);
        }
      });
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.mainContainer} spacing={3}>
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
            label="Enter your Email"
            variant="outlined"
            margin="normal"
            size="small"
            style={{ width: "100%" }}
            onChange={emailChange}
          />
          <br />
          <TextField
            required
            type="password"
            label="Enter your Password"
            variant="outlined"
            size="small"
            margin="normal"
            style={{ width: "100%" }}
            onChange={passwordChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            style={{ width: "100%" }}
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
            size="small"
            style={{ width: "100%" }}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
