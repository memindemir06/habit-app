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
import MenuTest from "./Menu";
import AppBar from "./AppBar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: "64px",
    marginLeft: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(7) + 1,
    },
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
  const theme = useTheme();
  let temp = null;

  // let path = useLocation();

  useEffect(() => {
    fetch("../api/activeSession")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.user_id == null) {
          console.log("No Session");
          setUserId("No Session");
          // return <Redirect to="/login" />;
        } else {
          temp = data.user_id;
          setUserId(data.user_id);
          setUserName(data.user_name);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          console.log(userId);
        }
      });
  }, [history, userId]);

  const backToLogin = () => {
    setUserId("No Session");
  };

  return (
    <Router>
      <AppBar />
      <br />
      <div className={classes.content}>
        <Switch>
          {/* <Route path="/" component={AppBar} /> */}
          <Route
            exact
            path="/"
            render={() => {
              return !userId ? null : userId == "No Session" ? (
                <div>
                  <Redirect to="/login" />
                  <Login />
                </div>
              ) : (
                <Redirect to="/home" />
              );
            }}
          />
          <Route exact path="/ErrorPage" component={ErrorPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/home"
            render={() => {
              return !userId ? null : userId == "No Session" ? (
                <div>
                  <Redirect to="/login" />
                  <Login />
                </div>
              ) : (
                // <Redirect to="/home" />
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
            path="/profile"
            render={() => {
              return (
                <Profile
                  userId={userId}
                  userName={userName}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  // setUserId={setUserId}
                  // setUserName={setUserName}
                  // setFirstName={setFirstName}
                  // setLastName={setLastName}
                  // setEmail={setEmail}
                  leaveAccountCallback={backToLogin}
                />
              );
            }}
          />
          <Route
            exact
            path="/friends"
            render={() => {
              return (
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
              return (
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
              return (
                <InspirationalPage
                  userId={userId}
                  userName={userName}
                  leaveAccountCallback={backToLogin}
                />
              );
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default Home;
