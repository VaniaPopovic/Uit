import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { Route, NavLink, HashRouter, BrowserRouter } from "react-router-dom";
import { AppSwitch } from '@coreui/react'


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      qTitle: '',
      qText: '',
      qPython: '',
      qMathematica: '',
      qCid:''
    }
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.logChange = this.logChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault()
    var data = {
      title: this.state.qTitle,
      text: this.state.qText,
      textPython: this.state.qPython,
      textMathematica: this.state.qMathematica,
      chapterID: this.state.qCid
    }
    console.log("Ti stello", data)
    fetch("/api/Questions/",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then((Response) => Response.json())
      .then((result) => {
        console.log("EMBIKE", result);
      })
}
  logChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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

        <div className="row">

          <div className="col-md-2">

          </div>

          <div className="col-md-8">
            {
              <div className="container register-form">
                <form onSubmit={this.handleSubmit} method="POST">
                  <label>Question Title</label>
                  <input onChange={this.logChange} className="form-control" value={this.state.qTitle}  name='qTitle'/>
                  <label>Question Text</label>
                  <input onChange={this.logChange} className="form-control" value={this.state.qText}  name='qText' />
                  <label>Python</label>
                  <input onChange={this.logChange} className="form-control" value={this.state.qPython}  name='qPython' />
                  <label>Mathematica Text</label>
                  <input onChange={this.logChange} className="form-control" value={this.state.qMathematica}  name='qMathematica' />
                  <label>ChapterID</label>
                  <input onChange={this.logChange} className="form-control" value={this.state.qCid}  name='qCid' />
                 
                  <div className="submit-section">
                    <button className="btn btn-uth-submit">Submit</button>
                  </div>
                </form>
              </div>
            }
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
                      <NavLink className="btn btn-danger" to={"/base/editquestion/" + allQuestions.questionID}>Edit This Question</NavLink>
                      <a className="btn btn-danger" onClick={() => this.deleteQuestion(allQuestions.questionID)}>Delete This Question</a>
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
