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
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ExploreIcon from "@material-ui/icons/Explore";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
  },
  appBar: {
    background: theme.palette.secondary,
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
    bottom: 8,
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  appBarIntro: {
    display: "block",
    background: "transparent",
    boxShadow: "none",
    top: 0,
    left: 0,
    right: 0,
    bottom: "auto",
    "& $toolbarLogout": {
      height: "100px",
    },
  },
  appBarLogout: {
    display: "none",
    background: theme.palette.primary.main,
    boxShadow: "none",
    top: 0,
    left: 0,
    right: 0,
    bottom: "auto",
    "& $toolbarLogout": {
      height: "auto",
    },
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

    "&:hover": {
      border: "2px solid",
      borderColor: "yellow",
      color: "yellow",
      boxShadow: "0 0.5em 0.5em -0.4em yellow",
      transform: "translateY(-0.25em)",
    },
  },
  drawerButton: {
    [theme.breakpoints.up("md")]: {
      "&::before": {
        content: "''",
        position: "absolute",
        bottom: "1%",
        left: "25%",
        display: "block",
        width: "50%",
        height: "3px",
        border: "1px solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "20px",
        zIndex: -1,
        backgroundColor: theme.palette.primary.main,
        webkitTransformOrigin: "right top",
        msTransformOrigin: "right top",
        transformOrigin: "right top",
        webkitTransform: "scale(0, 1)",
        msTransform: "scale(0, 1)",
        transform: "scale(0, 1)",
        webkitTransition: "transform 0.3s cubic-bezier(1, 0, 0, 1)",
        transition: "transform 0.3s cubic-bezier(1, 0, 0, 1)",
      },

      "&:hover::before": {
        webkitTransformOrigin: "left top",
        msTransformOrigin: "left top",
        transformOrigin: "left top",
        webkitTransform: "scale(1, 1)",
        msTransform: "scale(1, 1)",
        transform: "scale(1, 1)",
      },
    },
  },
  buttonNight: {
    transition: "0.25s",
    "&:hover, &:focus": {
      "& $nightIcon": {
        color: "#191970",
      },
    },
  },
  buttonDay: {
    transition: "0.25s",
    "&:hover, &:focus": {
      "& $sunnyIcon": {
        color: "#ffcc33",
      },
    },
  },
  sunnyIcon: { color: "inherit" },
  nightIcon: { color: "inherit" },
}));

function AppBar({
  isLoggedIn,
  setIsLoggedIn,
  setUserId,
  darkState,
  setDarkState,
  isIntroPage,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [iconDark, setIconDark] = React.useState(false);
  const isScreenWide = useMediaQuery(theme.breakpoints.up("sm"));

  const handleThemeChange = () => {
    setDarkState(!darkState);
    setIconDark(!iconDark);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleImgBarClicked = () => {
    setOpen(false);
    setUserId("");
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
          <Toolbar style={{ paddingLeft: 0 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
              style={{ marginLeft: "8px" }}
            >
              <ChevronRightIcon />
            </IconButton>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                textDecoration: "none",
              }}
            >
              <img src="logo.png" width="32px" height="32px" />
              <Typography
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginLeft: "16px",
                }}
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
            </div>
            <Button href={"mailto:hello@lonyinchan.com"} color="inherit">
              Contact Us
            </Button>
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
            >
              <Link
                to="/"
                style={{ color: "white", textDecoration: "inherit" }}
              >
                HAB!TS
              </Link>
            </Typography>
            <Button href={"mailto:hello@lonyinchan.com"} color="inherit">
              Contact Us
            </Button>
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
        <AppBar2
          position="absolute"
          className={clsx({
            [classes.appBarIntro]: isIntroPage,
            [classes.appBarLogout]: !isIntroPage,
          })}
        >
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
            >
              <Link
                to="/"
                style={{ color: "white", textDecoration: "inherit" }}
              >
                HAB!TS
              </Link>
            </Typography>
            <div>
              <Button href={"mailto:hello@lonyinchan.com"} color="inherit">
                Contact Us
              </Button>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button
                className={classes.getStarted}
                component={Link}
                to="/register"
                color="inherit"
              >
                Register
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
          <List
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <ListItem
              button
              key="My Account"
              onClick={handleImgBarClicked}
              component={Link}
              to="/myprofile"
              className={classes.drawerButton}
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
              className={classes.drawerButton}
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
              className={classes.drawerButton}
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
              className={classes.drawerButton}
            >
              <ListItemIcon>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText primary="Leaderboard" />
            </ListItem>
            <ListItem
              button
              key="Map"
              onClick={handleDrawerClose}
              component={Link}
              to="/map"
              className={classes.drawerButton}
            >
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItem>
            <div style={{ flexGrow: 1 }}></div>
            <ListItem
              className={clsx({
                [classes.buttonNight]: !iconDark,
                [classes.buttonDay]: iconDark,
              })}
              button
              key={iconDark}
              onClick={handleThemeChange}
            >
              {iconDark ? (
                <>
                  <ListItemIcon>
                    <WbSunnyIcon className={classes.sunnyIcon} />
                  </ListItemIcon>
                </>
              ) : (
                <ListItemIcon>
                  <NightsStayIcon className={classes.nightIcon} />
                </ListItemIcon>
              )}
              {open ? (
                <>
                  <ListItemText
                    className={clsx({
                      [classes.hide]: !iconDark,
                    })}
                    primary="Light Mode"
                  />{" "}
                  <ListItemText
                    className={clsx({
                      [classes.hide]: iconDark,
                    })}
                    primary="Dark Mode"
                  />{" "}
                </>
              ) : null}
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
              key="Map"
              onClick={handleDrawerClose}
              component={Link}
              to="/map"
            >
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItem>
            <ListItem button key={iconDark} onClick={handleThemeChange}>
              {iconDark ? (
                <>
                  <ListItemIcon>
                    <WbSunnyIcon />
                  </ListItemIcon>
                </>
              ) : (
                <ListItemIcon>
                  <NightsStayIcon />
                </ListItemIcon>
              )}
              <ListItemText primary="Change Theme" />
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
