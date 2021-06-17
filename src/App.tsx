import { useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import useAuth from './hooks/auth-hook';
import useInitData from './hooks/init-data-hook';
import Container from "./hoc/Container";
//routes
import Homepage from "./pages/Homepage";
import User from "./pages/User";
import Auth from "./pages/Auth";
import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from './constant';

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#fafafa"
    }
  }
});


const App = () => {
  const { isLoggedIn } = useAuth();
  const { fetchPosts, getUserInfo, getFriendsSuggestions } = useInitData();

  useEffect(() => {
    if (isLoggedIn()) {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const decoded: any = jwt.decode(token!);
      fetchPosts();
      getUserInfo(decoded.userId);
      getFriendsSuggestions(decoded.userId);
    }
  });


  const routes = (
    <Switch>
      <Route path="/user" render={() => (isLoggedIn() ? <User /> : <Redirect to="/auth" />)} />
      <Route path="/home" render={() => (isLoggedIn() ? <Homepage /> : <Redirect to="/auth" />)} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/home" />
    </Switch>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container>{routes}</Container>
      </BrowserRouter>
    </MuiThemeProvider>
  );


};

export default App;
