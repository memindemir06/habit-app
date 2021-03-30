import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, AppBar, Toolbar, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 100,
    minWidth: "100%",
    display: "none",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 8em",
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
