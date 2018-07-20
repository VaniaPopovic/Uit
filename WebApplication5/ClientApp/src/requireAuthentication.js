import React from 'react';  
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

export function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth()
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
       
      }
    }

    render() {
      return (
        <div>
          {localStorage.getItem('user') === true
            ? <Component {...this.props}/>
            : <Redirect to="/login" />
          }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
   
  })

  return withRouter(connect(mapStateToProps)(AuthenticatedComponent))
}
