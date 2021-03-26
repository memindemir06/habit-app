import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
}));

function AppBar({ isLoggedIn, setIsLoggedIn, setUserId }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
      <AppBar2
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {isLoggedIn ? (
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
          ) : (
            <div style={{ width: "80px" }}></div>
          )}
          <Typography
            style={{ flexGrow: 1, color: "white", textDecoration: "none" }}
            align="center"
            variant="h6"
            className={classes.title}
          >
            <Link to="/" style={{ color: "white", textDecoration: "inherit" }}>
              HAB!TS
            </Link>
          </Typography>
          {!isLoggedIn ? (
            <div>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/"
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar2>

      {isLoggedIn ? (
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
          </List>
        </Drawer>
      ) : null}
    </div>
  );
}

export default AppBar;
