import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//import { userActions } from '../../_actions';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config

// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem('user'));
  //  console.log(user);
    if (user.role === 2) {
      this.state = {
        questions: {
          items: [
            {
              name: 'Home',
              url: '/default',
              icon: 'icon-home'
            },
            {
              title: true,
              name: 'Modules'
            },
            {
              name: 'Questions',
              url: '/base/questions',
              icon: 'icon-pencil'
            }
          ]
        }
      }
    } else {
      this.state = {
        questions: {
          items: [
            {
              name: 'Home',
              url: '/default',
              icon: 'icon-home'
            },
            {
              title: true,
              name: 'Modules'
            }
          ]
        }
      }

    }
    
  }


  componentDidMount() {
    var old = this.state.questions;
    fetch('/api/Subjects')
      .then((Response) => Response.json())
      .then((result) => {



       for (var i in result) {
         var subject = {
           name: result[i].subjectName, icon: 'icon-pencil', children: [] };
         for (var k in result[i].chapter) {

           var ch = { name: result[i].chapter[k].chapterName, icon: 'icon-layers', children: [] };
           subject.children.push(ch);
           for (var j in result[i].chapter[k].questions) {
             var question = {
               name: result[i].chapter[k].questions[j].title, url: '/questions/' + result[i].chapter[k].questions[j].questionID, icon: 'icon-puzzle'
             };
             ch.children.push(question);
             //  console.log(result[i].chapter[k].questions[j]);
             //var qs = { name: result[i].subjectName, url: 'test', icon: 'icon-pencil' };

           }
         }
         old.items.push(subject);
       //  console.log(old);
       }
        this.setState({
          questions: old

        })
        
    //    console.log(items);
      
       
      })
  }
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={this.state.questions} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
               
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(DefaultLayout);
export default connectedHomePage;
