import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { FormPage, LoginPage, ParticipantListPage, SignupPage } from '../pages';
import PrivateRoute from './PrivateRoute';

const MainPage = () => {
  return <Redirect to="/login" />;
};

export default class Routes extends React.PureComponent {
  render(): JSX.Element {
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/form" component={FormPage} />
          <PrivateRoute
            exact
            path="/participant-list"
            component={ParticipantListPage}
          />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    );
  }
}
