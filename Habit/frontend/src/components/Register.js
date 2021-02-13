import React from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function Register() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Create an Account
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <form autoComplete="on">
          <TextField
            required
            label="First Name"
            variant="outlined"
            margin="normal"
          />
          <br />
          <TextField
            required
            label="Last Name"
            variant="outlined"
            margin="normal"
          />
          <br />
          <TextField
            required
            label="Enter Email"
            variant="outlined"
            margin="normal"
          />
          <br />
          <TextField
            required
            label="Enter Password"
            variant="outlined"
            margin="normal"
          />
          <br />
          <TextField
            required
            label="Validate Password"
            variant="outlined"
            margin="normal"
          />
          <br />
          <TextField
            required
            variant="outlined"
            margin="normal"
            type="date"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
          />
          <br /> <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Create Account
          </Button>
          <br /> <br />
        </form>
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
