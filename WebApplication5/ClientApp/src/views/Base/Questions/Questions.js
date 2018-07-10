import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { Route, NavLink, HashRouter, BrowserRouter } from "react-router-dom";
import { AppSwitch } from '@coreui/react'
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }


  componentDidMount() {
    fetch('api/Questions')
      .then((Response) => Response.json())
      .then((findresponse) => {
        console.log(findresponse);
        this.setState({
          questions: findresponse

        })
        console.log(findresponse);
      })
  }

  render() {
    return (
      <div>

        <div className="row">

          <div className="col-md-2">

          </div>

          <div className="col-md-8">
            {
              this.state.questions.map((allQuestions, key) =>
                <ul key={allQuestions.questionID}>
                  <div className="card card-nav-tabs">
                    <h4 className="card-header card-header-info">{allQuestions.text}</h4>
                    <div className="card-body">
                      <h4 className="card-title">Question ID: {allQuestions.questionID}</h4>
                      <p className="card-text">Python text:  {allQuestions.textPython}</p>
                      <p className="card-text">Mathemtca text: {allQuestions.textMathematica}</p>
                      <a className="btn btn-primary"><NavLink to={"/PostDetail/" + allQuestions.questionID}>Go For Detail</NavLink></a>
                      <a className="btn btn-danger"><NavLink to={"/base/editquestion/" + allQuestions.questionID}>Edit This Post</NavLink></a>
                    </div>
                  </div>
                </ul>
              )
            }
          </div>

          <div className="col-md-2">

          </div>

        </div>

      </div>
    );
  }
}

export default Questions;
