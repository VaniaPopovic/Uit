import React, { Component } from 'react';
import {
 
  Card,
  CardBody,

  CardHeader,
  Col,
  Row,

} from 'reactstrap';

class AddChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cName: '',
      qQuestions: [],
      sID: this.props.subjectID
    }
    this.logChange = this.logChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault()
    var data = {
      chapterName: this.state.cName,
      questions: this.state.questions,
      subjectID: this.state.sID
    }
    fetch("/api/Chapters/",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then((Response) => Response.json())
      .then((result) => {
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
                Add Chapter
              </CardHeader>
              <CardBody>
                {
                  <form onSubmit={this.handleSubmit} method="POST">
                    <label>Chapter Name</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.cName} name='cName' />
                    
               
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
} export default AddChapter;
