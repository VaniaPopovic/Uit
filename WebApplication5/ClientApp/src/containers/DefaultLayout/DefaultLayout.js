import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

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
    this.state = {
      questions: {
        items: [
          {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer'
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
  }


  componentDidMount() {
    var old = this.state.questions;
    fetch('/api/Subjects')
      .then((Response) => Response.json())
      .then((result) => {



       for (var i in result) {
         var qs = {
           name: result[i].subjectName, icon: 'icon-pencil', children: [] };
         for (var k in result[i].chapter) {

           var ch = { name: result[i].chapter[k].chapterName, icon: 'icon-layers', children: [] };
           qs.children.push(ch);
           for (var j in result[i].chapter[k].questions) {
             var question = {
               name: result[i].chapter[k].questions[j].title, url: '/questions/' + result[i].chapter[k].questions[j].questionID, icon: 'icon-puzzle'
             };
             ch.children.push(question);
             //  console.log(result[i].chapter[k].questions[j]);
             //var qs = { name: result[i].subjectName, url: 'test', icon: 'icon-pencil' };

           }
         }
         old.items.push(qs);
         console.log(old);
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
            {console.log(this.state.questions)}
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
                <Redirect from="/" to="/dashboard" />
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

export default DefaultLayout;
