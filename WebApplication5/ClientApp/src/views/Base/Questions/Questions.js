import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { Route, NavLink, HashRouter, BrowserRouter } from "react-router-dom";
import { AppSwitch } from '@coreui/react'
import AddQuestion from './AddQuestion';


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData() {
    fetch('api/Questions')
      .then((Response) => Response.json())
      .then((findresponse) => {
        // console.log(findresponse);
        this.setState({
          questions: findresponse

        })
        console.log("this is called,",findresponse);
      })
  }

  deleteQuestion(num) {

    console.log("FUCK UP",num);
    
 fetch('api/Questions/' + num,
   {
     method: 'DELETE'

      })
    var updatedQs = this.state.questions;
    for (var i = 0; i < updatedQs.length; i++)
      if (updatedQs[i].questionID === num) {
        updatedQs.splice(i, 1);
        break;
      }
    console.log("up", updatedQs);
    this.setState({
      questions: updatedQs

    })

  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>


          <AddQuestion/>

       
          
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
                      <NavLink className="btn btn-danger" to={"/base/editquestion/" + allQuestions.questionID}>Edit This Question</NavLink>
                      <a className="btn btn-danger" onClick={() => this.deleteQuestion(allQuestions.questionID)}>Delete This Question</a>
                    </div>
                  </div>
                </ul>
              )
            }
          </div>

        </div>
      
    );
  }
}

export default Questions;
