import React from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlinedIcon";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        {/* <LockOutlinedIcon /> */}
        <Typography variant="h4" component="h4">
          Login
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <form autoComplete="on">
          <TextField
            required
            label="Enter your Email"
            variant="outlined"
            margin="normal"
          />
          <br />
          <TextField
            required
            label="Enter your Password"
            variant="outlined"
            margin="normal"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Login
          </Button>
          <br />
          <br />
        </form>
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
