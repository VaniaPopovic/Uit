import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,

} from 'reactstrap';

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qTitle: '',
      qHelpP: '',
      qHelpM: '',
      qCorrectAnswer:'',
      qPython: '',
      qMathematica: '',
      qCid: this.props.cId
    }
    this.logChange = this.logChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault()
    var data = {
      title: this.state.qTitle,
        helpPython: this.state.qHelpP,
      helpMathematica: this.state.qHelpM,
      textPython: this.state.qPython,
      textMathematica: this.state.qMathematica,
      correctAnswer: this.state.qCorrectAnswer,
      chapterID: this.state.qCid
    }
    console.log("Ti stello", data);
    fetch("/api/Questions/",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then((Response) => Response.json())
      .then((result) => {
        console.log("EMBIKE", result);
        window.location.reload();
      })
  }

  logChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Add Question
              </CardHeader>
              <CardBody>
                {
                  <form onSubmit={this.handleSubmit} method="POST">
                    <label>Question Title</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.qTitle} name='qTitle' />
                    <label>Python Text</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.qPython} name='qPython' />
                    <label>Mathematica Text</label>
                                    <input onChange={this.logChange} className="form-control" value={this.state.qMathematica} name='qMathematica' />
                    <label>Python Help</label>
                                    <input onChange={this.logChange} className="form-control" value={this.state.qHelpP} name='qHelpP' />
                     
                    <label>Mathematica Help</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.qHelpM} name='qHelpM' />
                   <label>Correct answer Python</label>
                     <input onChange={this.logChange} className="form-control" value={this.state.qCorrectAnswer} name='qCorrectAnswer' />

                    <div className="submit-section">
                      <button className="btn btn-uth-submit">Submit</button>
                    </div>
                  </form>
                }

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );

  }
} export default AddQuestion;
