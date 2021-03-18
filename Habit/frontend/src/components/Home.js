import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
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
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    fetch("../api/activeSession") // this gives GET error for urls like profile/userid
      .then((response) => response.json())
      .then((data) => {
        if (data.user_id == null) {
          setUserId("No Session");
        } else {
          setUserId(data.user_id);
        }
      });
  }, []);

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
        <Route exact path="/ErrorPage" component={ErrorPage} />
        <Route
          exact
          path="/"
          render={() => {
            return !userId ? null : userId == "No Session" ? (
              <Login />
            ) : (
              <Redirect to={`/${userId}`} />
            );
          }}
        />
        <Route path="/register" component={Register} />
        <Route
          exact
          path="/:userId"
          render={() => {
            return <DailyReminders leaveAccountCallback={backToLogin} />;
          }}
        />
        <Route
          exact
          path="/profile/:userId"
          render={() => {
            return <Profile leaveAccountCallback={backToLogin} />;
          }}
        />
        <Route
          exact
          path="/friends/:userId"
          render={() => {
            return <FriendsPage leaveAccountCallback={backToLogin} />;
          }}
        />
        <Route
          exact
          path="/leaderboard/:userId"
          render={() => {
            return <LeaderboardPage leaveAccountCallback={backToLogin} />;
          }}
        />
        <Route
          exact
          path="/inspire/:userId"
          render={() => {
            return <InspirationalPage leaveAccountCallback={backToLogin} />;
          }}
        />
      </Switch>
      </div>
    </Router>
  );
}

export default Home;
