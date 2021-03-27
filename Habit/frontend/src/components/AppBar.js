import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar2 from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { MenuList, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import MyAccountIcon from "@material-ui/icons/AccountCircleRounded";
import DailyRemindersIcon from "@material-ui/icons/CalendarTodayRounded";
import MyFriendsIcon from "@material-ui/icons/PeopleAltRounded";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LeaderboardIcon from "@material-ui/icons/FormatListNumbered";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
  },
  appBar: {
    background: "#343d52",
    color: "white",
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  logoutButton: {
    position: "fixed",
    bottom: 7,
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  appBarLogout: {
    background: "transparent",
    boxShadow: "none",
    top: 0,
    left: 0,
    right: 0,
    bottom: "auto",
  },

  toolbarLogout: {
    height: "100px",
    padding: "0 5em",
    [theme.breakpoints.down("sm")]: {
      padding: "0 12px",
    },
  },
  getStarted: {
    width: "150px",
    [theme.breakpoints.down("xs")]: {
      width: "80px",
      padding: theme.spacing(1),
      fontSize: "8px",
    },
    cursor: "pointer",
    background: "none",
    border: "2px solid",
    font: "inherit",
    lineHeight: 1,
    margin: "0.5em",
    padding: "1em 2em",
    color: "white",
    transition: "0.25s",

    "&:hover, &:focus": {
      borderColor: "yellow",
      color: "yellow",
      boxShadow: "0 0.5em 0.5em -0.4em yellow",
      transform: "translateY(-0.25em)",
    },
  },
}));

function AppBar({ isLoggedIn, setIsLoggedIn, setUserId }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isScreenWide = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    };
    fetch("../api/logout", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setIsLoggedIn(false);
        setUserId("");
      });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {isLoggedIn && isScreenWide ? (
        <AppBar2
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              style={{ flexGrow: 1, color: "white", textDecoration: "none" }}
              align="center"
              variant="h6"
              className={classes.title}
            >
              <Link
                to="/"
                style={{ color: "white", textDecoration: "inherit" }}
              >
                HAB!TS
              </Link>
            </Typography>
            <Button
              component={Link}
              to="/"
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar2>
      ) : isLoggedIn && !isScreenWide ? (
        <AppBar2 position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              style={{ flexGrow: 1, color: "white", textDecoration: "none" }}
              align="center"
              variant="h6"
              className={classes.title}
            >
              <Link
                to="/"
                style={{ color: "white", textDecoration: "inherit" }}
              >
                HAB!TS
              </Link>
            </Typography>
            <Button
              component={Link}
              to="/"
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar2>
      ) : (
        <AppBar2 position="absolute" className={classes.appBarLogout}>
          <Toolbar className={classes.toolbarLogout}>
            <img
              src="logo.png"
              style={{ marginLeft: "32px" }}
              width="32px"
              height="32px"
            />
            <Typography
              style={{
                flexGrow: 1,
                color: "white",
                textDecoration: "none",
                marginLeft: "16px",
              }}
              align="left"
              variant="h6"
              className={classes.title}
            >
              <Link
                to="/"
                style={{ color: "white", textDecoration: "inherit" }}
              >
                HAB!TS
              </Link>
            </Typography>
            <div>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button
                className={classes.getStarted}
                component={Link}
                to="/register"
                color="inherit"
              >
                Get Started
              </Button>
            </div>
          </Toolbar>
        </AppBar2>
      )}

      {isLoggedIn && isScreenWide ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              key="My Account"
              onClick={handleDrawerClose}
              component={Link}
              to="/myprofile"
            >
              <ListItemIcon>
                <MyAccountIcon />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>
            <ListItem
              button
              key="Home"
              onClick={handleDrawerClose}
              component={Link}
              to="/home"
            >
              <ListItemIcon>
                <DailyRemindersIcon />
              </ListItemIcon>
              <ListItemText primary="Home Page" />
            </ListItem>
            <ListItem
              button
              key="My Friends"
              onClick={handleDrawerClose}
              component={Link}
              to="/friends"
            >
              <ListItemIcon>
                <MyFriendsIcon />
              </ListItemIcon>
              <ListItemText primary="My Friends" />
            </ListItem>
            <ListItem
              button
              key="Leaderboard"
              onClick={handleDrawerClose}
              component={Link}
              to="/leaderboard"
            >
              <ListItemIcon>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText primary="Leaderboard" />
            </ListItem>
            <ListItem
              button
              key="Logout"
              component={Link}
              to="/"
              onClick={handleLogout}
              className={classes.logoutButton}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              {open ? <ListItemText primary="Logout" /> : null}
            </ListItem>
          </List>
        </Drawer>
      ) : isLoggedIn && !isScreenWide ? (
        <SwipeableDrawer
          anchor="top"
          open={open}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
        >
          <List>
            <ListItem
              button
              key="My Account"
              onClick={handleDrawerClose}
              component={Link}
              to="/myprofile"
            >
              <ListItemIcon>
                <MyAccountIcon />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>
            <ListItem
              button
              key="Home"
              onClick={handleDrawerClose}
              component={Link}
              to="/home"
            >
              <ListItemIcon>
                <DailyRemindersIcon />
              </ListItemIcon>
              <ListItemText primary="Home Page" />
            </ListItem>
            <ListItem
              button
              key="My Friends"
              onClick={handleDrawerClose}
              component={Link}
              to="/friends"
            >
              <ListItemIcon>
                <MyFriendsIcon />
              </ListItemIcon>
              <ListItemText primary="My Friends" />
            </ListItem>
            <ListItem
              button
              key="Leaderboard"
              onClick={handleDrawerClose}
              component={Link}
              to="/leaderboard"
            >
              <ListItemIcon>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText primary="Leaderboard" />
            </ListItem>
            <ListItem
              button
              key="Logout"
              component={Link}
              to="/"
              onClick={handleLogout}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </SwipeableDrawer>
      ) : null}
    </div>
  );
}

export default AppBar;
