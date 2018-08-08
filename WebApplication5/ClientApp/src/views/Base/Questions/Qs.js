import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { Route, NavLink, HashRouter, BrowserRouter } from "react-router-dom";
import { AppSwitch } from '@coreui/react'


import AddQuestion from './AddQuestion';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';




class RenderQuestions extends Component {
  constructor(props) {
    super(props);
    if (this.props.list) {
      this.state = {
        que: this.props.list
      }
    } else {
      this.state = {
        que: []
      }
    }
  

  }

  render() {
    return (
      <div/>
      );

  }
} export default RenderQuestions;
