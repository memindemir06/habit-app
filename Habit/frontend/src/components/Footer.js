import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, AppBar, Toolbar, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 8em",
    marginLeft: theme.spacing(15),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(10),
    },
    background: theme.palette.primary.main,
  },
  copyright: {
    marginLeft: "40%",
    // padding: theme.spacing(3),
  },
  attribute: {
    fontSize: "10px",
    opacity: "0.85",
  }
}));

function Footer() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="md">
        <Toolbar>
          <Typography
            variant="body1"
            color="inherit"
            align="center"
            className={classes.copyright}
          >
            © Copyright HAB!TS 2021
          </Typography>
          <div className={classes.attribute}>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
