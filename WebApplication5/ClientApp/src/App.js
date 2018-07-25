import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable'

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { PrivateAccess } from './PrivateAccess'
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Page404, Page500, } from './views/Pages';
function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});
const Questions = Loadable({
  loader: () => import('./views/Base/Questions'),
  loading: Loading,
});

// import { renderRoutes } from 'react-router-config';

class App extends Component {
	constructor(props) {
        super(props);
 
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" name="Login Page" component={LoginPage} />
          <Route exact path="/register" name="Register Page" component={RegisterPage} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
         
          <PrivateRoute path="/" component={DefaultLayout} />
                <PrivateAccess  exact path="/base/questions" component={Questions} />

          <PrivateRoute path="/dashboard" component={Dashboard} />
		    
        </Switch>
      </Router>
     
    );
  }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}
 
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
