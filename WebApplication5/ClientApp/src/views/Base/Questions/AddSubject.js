import React, { Component } from 'react';
import {
  
  Card,
  CardBody,

  CardHeader,

  Col,

  Row,

} from 'reactstrap';

class AddSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sName: '',
      sChapters: []
    }
    this.logChange = this.logChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault()
    var data = {
      subjectName: this.state.sName,
      chapter: this.state.sChapters
    }
    console.log("Ti stello", data);
    fetch("/api/Subjects/",
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
                Add Subject
              </CardHeader>
              <CardBody>
                {
                  <form onSubmit={this.handleSubmit} method="POST">
                    <label>Subject Name</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.sName} name='sName' />


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
} export default AddSubject;
