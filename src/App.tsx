import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from "./pages/Homepage";
import Layout from "./hoc/Layout";
import Search from "./pages/Search";
import User from "./pages/User";
import Auth from "./pages/Auth";
import { RootState } from "./store";

const App = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const routes = (
    <Switch>
      <Route path="/user" component={User} />
      <Route path="/search" component={Search} />
      <Route path="/home" exact component={Homepage} />
    </Switch>
  );

  if (isLoggedIn) {
    return (
      <div>
        <Router>
          <Layout>{routes}</Layout>
        </Router>
      </div>
    );
  } else {
    return <Auth />;
  }

};

export default App;
