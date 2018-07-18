import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Progress,
  Row,
  Table,
} from 'reactstrap';

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qTitle: '',
      qText: '',
      qPython: '',
      qMathematica: '',
      qCid: ''
    }
    this.logChange = this.logChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log("Ti stello", data);
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
                    <label>Question Text</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.qText} name='qText' />
                    <label>Python</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.qPython} name='qPython' />
                    <label>Mathematica Text</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.qMathematica} name='qMathematica' />
                    <label>ChapterID</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.qCid} name='qCid' />

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
