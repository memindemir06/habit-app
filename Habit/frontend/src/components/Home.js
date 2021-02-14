import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import DailyReminders from "./DailyReminders"

function Home() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/:userId" component={DailyReminders} />
      </Switch>
    </Router>
  );
}

export default Home;
