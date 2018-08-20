import React, { Component } from 'react';
//import { Col, Row, Collapse, Fade } from 'reactstrap';
import { NavLink } from "react-router-dom";
//import { AppSwitch } from '@coreui/react'
import AddQuestion from './AddQuestion';
import AddChapter from './AddChapter';
import AddSubject from './AddSubject'

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';





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
    fetch('/api/Subjects')
      .then((Response) => Response.json())
      .then((findresponse) => {
        this.setState({
          questions: findresponse

        })
      })
  }

  deleteQuestion(num) {

    
 fetch('/api/Questions/' + num,
   {
     method: 'DELETE'

   }).then((Response) => Response.json())
   .then((result) => {
     window.location.reload();
   })

  }

  deleteSubject(num) {


    fetch('/api/Subjects/' + num,
        {
          method: 'DELETE'

        }).then((Response) => Response.json())
      .then((result) => {
        window.location.reload();
      })

  }
  deleteChapter(num) {


    fetch('/api/Chapters/' + num,
        {
          method: 'DELETE'

        }).then((Response) => Response.json())
      .then((result) => {
        window.location.reload();
      })

  }
  componentDidMount() {
    this.fetchData();
  }


  render() {
    return (
      <div>
        <Accordion>
        {
          this.state.questions.map(((subject, index) =>
            <AccordionItem key={`${subject.subjectName}${index}`}>
              
                <AccordionItemTitle id="subjects">
                                {subject.subjectName}
                  <a className="btn btn-danger float-right" onClick={() => this.deleteSubject(subject.subjectID)}>Delete</a>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <Accordion>
                    {
                      subject.chapter.map(chapter => (
                        <AccordionItem key={chapter.chapterID}>
                      <AccordionItemTitle id="chapters">
                            {chapter.chapterName}
                        <a className="btn btn-danger float-right" onClick={() => this.deleteChapter(chapter.chapterID)}>Delete</a>
                      </AccordionItemTitle>
                          <AccordionItemBody>

                            <Accordion>
                              {
                                chapter.questions.map(question => (
                                  <AccordionItem key={question.questionID}>
                                    <AccordionItemTitle id="questions">
                                      {question.title}
                                
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
                                    
                                      <div className="card-body">
                                        <h4 className="card-title">Question ID: {question.questionID}</h4>
                                        <p className="card-text">Python text:  {question.textPython}</p>
                                        <p className="card-text">Mathematica text: {question.textMathematica}</p>
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
                                  <AddQuestion cId={chapter.chapterID}/>
                                  </AccordionItemBody>
                              </AccordionItem>
                            </Accordion>






                        </AccordionItemBody>
                        </AccordionItem>
                      
                      ))
                    }
                    <AccordionItem>
                      <AccordionItemTitle id="addNew">ADD NEW</AccordionItemTitle>
                      <AccordionItemBody>
                        <AddChapter subjectID={subject.subjectID} />
                      </AccordionItemBody>
                    </AccordionItem>
                  </Accordion>
                 
                </AccordionItemBody>
           
              </AccordionItem>
            

          ))
          }
          <AccordionItem>
            <AccordionItemTitle id="addNew">ADD NEW</AccordionItemTitle>
            <AccordionItemBody>
              <AddSubject/>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

export default Questions;
