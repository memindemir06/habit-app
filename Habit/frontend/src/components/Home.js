import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  withRouter,
  useLocation,
  // useLocation,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import DailyReminders from "./DailyReminders";
import ErrorPage from "./ErrorPage";
import Profile from "./Profile";
import FriendsPage from "./FriendsPage";
import LeaderboardPage from "./LeaderboardPage";
import InspirationalPage from "./InspirationalPage";
import IntroPage from "./IntroPage";
import MenuTest from "./Menu";
import AppBar from "./AppBar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  content: {
    marginTop: "64px",
  },
}));

function Home() {
  const history = useHistory();
  // const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState(null);
  const classes = useStyles();

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "'Open Sans'",
        "-apple-system",
        "BlinkMacSystemFont",
        "'Segoe UI'",
        "'Helvetica Neue'",
        "Arial",
        "sans-serif",
        "'Apple Color Emoji'",
        "'Segoe UI Emoji'",
        "'Segoe UI Symbol'",
      ].join(","),
    },
  });

  let temp = null;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // let path = useLocation();

  useEffect(() => {
    fetch("../api/activeSession")
      .then((response) => response.json())
      .then((data) => {
        if (data.user_id == null) {
          console.log("No Session");
          setUserId("No Session");
        } else {
          temp = data.user_id;
          setUserId(data.user_id);
          setUserName(data.user_name);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          setIsLoggedIn(true);
        }
      });
  }, [history, userId]);

  const backToLogin = () => {
    setUserId("No Session");
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserId={setUserId}
        />
        <br />
        <div className={classes.content}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return !userId ? null : userId == "No Session" ? (
                  <div>
                    <Redirect to="/" />
                    <IntroPage />
                  </div>
                ) : (
                  <Redirect to="/home" />
                );
              }}
            />
            <Route exact path="/" component={IntroPage} />
            <Route exact path="/ErrorPage" component={ErrorPage} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/home"
              render={() => {
                return !userId ? null : userId == "No Session" ? (
                  <div>
                    <Redirect to="/" />
                    <IntroPage />
                  </div>
                ) : (
                  <DailyReminders
                    userId={userId}
                    userName={userName}
                    firstName={firstName}
                    lastName={lastName}
                    leaveAccountCallback={backToLogin}
                  />
                );
              }}
            />
            <Route
              exact
              path="/myprofile"
              render={() => {
                return !userId ? null : userId == "No Session" ? (
                  <div>
                    <Redirect to="/login" />
                    <Login />
                  </div>
                ) : (
                  <Profile
                    userId={userId}
                    userName={userName}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    isUser={true}
                    setUserId={setUserId}
                    setUserName={setUserName}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setEmail={setEmail}
                  />
                );
              }}
            />
            <Route
              exact
              path="/profile/:username"
              render={() => {
                return !userId ? null : userId == "No Session" ? (
                  <div>
                    <Redirect to="/login" />
                    <Login />
                  </div>
                ) : (
                  <Profile
                    userId={userId}
                    userName={userName}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    isUser={false}
                    setUserId={setUserId}
                    setUserName={setUserName}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setEmail={setEmail}
                  />
                );
              }}
            />
            <Route
              exact
              path="/friends"
              render={() => {
                return !userId ? null : userId == "No Session" ? (
                  <div>
                    <Redirect to="/login" />
                    <Login />
                  </div>
                ) : (
                  <FriendsPage
                    userId={userId}
                    userName={userName}
                    leaveAccountCallback={backToLogin}
                  />
                );
              }}
            />
            <Route
              exact
              path="/leaderboard"
              render={() => {
                return !userId ? null : userId == "No Session" ? (
                  <div>
                    <Redirect to="/login" />
                    <Login />
                  </div>
                ) : (
                  <LeaderboardPage
                    userId={userId}
                    leaveAccountCallback={backToLogin}
                  />
                );
              }}
            />
            <Route
              exact
              path="/inspire"
              render={() => {
                return !userId ? null : userId == "No Session" ? (
                  <div>
                    <Redirect to="/login" />
                    <Login />
                  </div>
                ) : (
                  <InspirationalPage
                    userId={userId}
                    userName={userName}
                    leaveAccountCallback={backToLogin}
                  />
                );
              }}
            />
            <Route
              exact
              path="/map"
              render={() => {
                return !userId ? null : userId == "No Session" ? (
                  <div>
                    <Redirect to="/login" />
                    <Login />
                  </div>
                ) : (
                  <ErrorPage />
                );
              }}
            />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default Home;
