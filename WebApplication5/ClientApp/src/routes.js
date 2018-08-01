import React from 'react';
import Loadable from 'react-loadable'

import {connectedHomePage}   from './HomePage/';

function Loading() {
  return <div>Loading...</div>;
}

const Questions = Loadable({
  loader: () => import('./views/Base/Questions'),
  loading: Loading,
});

const EditQuestion = Loadable({
  loader: () => import('./views/Base/EditQuestion'),
  loading: Loading,
});


const Typography = Loadable({
  loader: () => import('./views/Theme/Typography'),
  loading: Loading,
});




// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/default', exact: true, name: 'Home', component: connectedHomePage },
  { path: '/questions/:id',exact: true, name: 'Question', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Questions },
  { path: '/base/questions', name: 'Questions', component: Questions },
  { path: '/base/editquestion/:id', name: 'EditQuestion', component: EditQuestion },
];

export default routes;
