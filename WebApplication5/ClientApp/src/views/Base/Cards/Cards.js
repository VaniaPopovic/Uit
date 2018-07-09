import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import Modal from 'react-modal';
import Validation from 'react-validation';

class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      id: 0,
      text: "",
      textP: "",
      textM: "",
      modalIsOpen: false,

    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
    this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
  }

  openModal(question) {
    this.setState({
      modalIsOpen: true,
      id: question.questionID,
      text: question.text, //TODO FIX ME QUICKLY
      textP: question.textPython,
      textM: question.textMathematica
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value //setting value edited by the admin in state.
    });
  }

  handleEdit(event) {
    //Edit functionality
    event.preventDefault()
    var data = {
      q_id: this.state.questionID,
      text: this.state.text,
      textPython: this.state.testPython,
      textMathematica: this.state.testMathematica
    }
    fetch("/api/Questions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      console.log(data)
      if (data === "success") {
        this.setState({
          msg: "User has been edited."
        });
      }
    }).catch(function (err) {
      console.log(err)
    });
  }

  componentDidMount() {
    let self = this;
    fetch('/api/Questions', {
      method: 'GET'
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      self.setState({
        questions: data
      });
    }).catch(err => {
      console.log('caught it!', err);
    })
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default p50 uth-panel">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Q ID</th>
                <th>TEXT</th>
                <th>TEXT PYTHON</th>
                <th>TEXT MATHEMATICA</th>
              </tr>
            </thead>
            <tbody>
              {this.state.questions.map(question =>
                <tr key={question.questionID}>
                  <td>{question.text} </td>
                  <td>{question.textPython}</td>
                  <td>{question.textMathematica}</td>
 
                  <td><a onClick={() => this.openModal(question)}>Edit</a>|<a>Delete</a></td>
                </tr>
              )}
              //Modal to edit the user data
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal" >
                <Validation.components.Form onSubmit={this.handleEdit} method="POST">
                  <label>TEXT</label>
                  <Validation.components.Input onChange={this.logChange} className="form-control" value={this.state.text} placeholder='John' name='name' validations={['required']} />
                  <label>TEXTMATHEMATICA</label>
                  <Validation.components.Input onChange={this.logChange} className="form-control" value={this.state.textPython} placeholder='email@email.com' name='email' validations={['required', 'email']} />
                  <div className="submit-section">
                    <Validation.components.Button className="btn btn-uth-submit">Submit</Validation.components.Button>
                  </div>
                </Validation.components.Form>
              </Modal>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Cards;
