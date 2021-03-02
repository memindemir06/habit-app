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
<<<<<<< HEAD
import FriendsPage from "./FriendsPage";
import LeaderboardPage from "./LeaderboardPage";
=======
import MenuTest from "./Menu";
>>>>>>> Frontend

function Home() {
  const history = useHistory();
  // const location = useLocation();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch("api/activeSession") // this gives GET error for urls like profile/userid
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
<<<<<<< HEAD
    <Router>
      <Switch>
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
      </Switch>
    </Router>
=======
    <div>
      <Router>
        <MenuTest />
        <Switch>
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
            path="/profile/:userId"
            render={() => {
              return <Profile leaveAccountCallback={backToLogin} />;
            }}
          />
        </Switch>
      </Router>
    </div>
>>>>>>> Frontend
  );
}

export default Home;
