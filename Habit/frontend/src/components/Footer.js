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
    marginLeft: theme.spacing(7),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },
    background: theme.palette.primary.main,
  },
}));

function Footer() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            © Copyright HAB!TS 2021
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
