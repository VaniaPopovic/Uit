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
  
   // console.log("QUE ", this.state.que)

  }

  render() {
    console.log("QUE ", this.state.que) 
    return (
     
      <Accordion>
        {
          this.que.map(question => (
           
            <AccordionItem>
              <AccordionItemTitle id="questions">
                {question.title}

              </AccordionItemTitle>
              <AccordionItemBody>

                <div className="card-body">
                  <h4 className="card-title">Question ID: {question.questionID}</h4>
                  <p className="card-text">Python text:  {question.textPython}</p>
                  <p className="card-text">Mathemtca text: {question.textMathematica}</p>
                  <NavLink className="btn btn-danger" to={"/base/editquestion/" + question.questionID}>Edit This Question</NavLink>
                  <a className="btn btn-danger" onClick={() => this.deleteQuestion(question.questionID)}>Delete This Question</a>
                </div>
              </AccordionItemBody>
            </AccordionItem>


          ))
                            
        }
        <AccordionItem>
          <AccordionItemTitle id="addNew">ADD NEW</AccordionItemTitle>
          <AccordionItemBody>
            <AddQuestion cId={this.prop.chapt} />
          </AccordionItemBody>
        </AccordionItem >
      </Accordion > 
    );
    
  }
} export default RenderQuestions;
