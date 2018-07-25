  import React, { Component } from 'react';

  class EditQuestion extends Component {
    constructor() {
      super();
      this.state =
        {
          data: [],
          questionAnswer: '',
  		    questionTitle: '',
          questionID: '',
          questionPythonText: '',
          questionMathematicaText: '',
          questionHelpP: '',
          questionHelpM: '',
          qCID: ''
        }

      this.changeAnswer = this.changeAnswer.bind(this);
  	  this.changeTitle = this.changeTitle.bind(this);
      this.changePythonText = this.changePythonText.bind(this);
      this.changeMathematicaText = this.changeMathematicaText.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.changeHelpP = this.changeHelpP.bind(this);
      this.changeHelpM = this.changeHelpM.bind(this);

    }
    componentDidMount() {
    
      fetch('/api/Questions/' + this.props.match.params.id)
        .then((Response) => Response.json())
        .then((findresponse) => {
          console.log("Edit question debug",findresponse)
       
          this.setState({
           
            questionAnswer: findresponse.correctAnswer,
  		      questionTitle: findresponse.title,
            questionID: findresponse.questionID,
            questionPythonText: findresponse.textPython,
            questionMathematicaText: findresponse.textMathematica,
            questionHelpP: findresponse.helpPython,
            questionHelpM: findresponse.helpMathematica,
            qCID: findresponse.chapterID
          
          })
        })

    }

    changeAnswer(event) {
      this.setState({ questionAnswer: event.target.value })
    }
    changeTitle(event){
  	   this.setState({ questionTitle: event.target.value })
    }

    changeMathematicaText(event) {
      this.setState({ questionMathematicaText: event.target.value })
    }

    changePythonText(event) {
      this.setState({ questionPythonText: event.target.value })
    }
    changeHelpP(event) {
      this.setState({ questionHelpP: event.target.value })
    }

    changeHelpM(event) {
      this.setState({ questionHelpM: event.target.value })
    }

    handleSubmit(event) {

      fetch('/api/Questions/' + this.props.match.params.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         correctAnswer: this.state.questionAnswer,
  	     title: this.state.questionTitle,
         questionID: this.state.questionID,
         textPython: this.state.questionPythonText,
         textMathematica: this.state.questionMathematicaText,
         helpPython: this.state.questionHelpP,
         helpMathematica: this.state.questionHelpM,
         chapterID: this.state.qCID


        })
      })
        /*.then((Response) => Response.json())
        .then((findresponse) => {
          console.log('Edit Post Find Responsse', findresponse.result);
        })*/

      this.props.history.push("/base/questions");
    }

    render() {

      return (
        <div>
          <div className="card card-nav-tabs">
            <h4 className="card-header card-header-info">Edit Your Post</h4>
            <div className="card-body">
              <h4 className="card-title">Post ID: {this.state.questionID}</h4>
             
                <div className="form-group">
                  <label htmlFor="exampleInput1" className="bmd-label-floating">Question Title</label>
                  <input type="text" className="form-control" value={this.state.questionTitle} onChange={this.changeTitle} />
                </div>
  			  <div className="form-group">
                  <label htmlFor="exampleInput4" className="bmd-label-floating">Question Python</label>
                  <textarea type="text" className="form-control" id="body" rows="3" value={this.state.questionPythonText} onChange={this.changePythonText} ></textarea>
                </div>
            <div className="form-group">
                  <label htmlFor="exampleInput4" className="bmd-label-floating">Question Mathematica</label>
                  <textarea type="text" className="form-control" id="body" rows="3" value={this.state.questionMathematicaText} onChange={this.changeMathematicaText} ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInput1" className="bmd-label-floating">Python Help</label>
                  <textarea type="text" className="form-control" id="body" rows="3" value={this.state.questionHelpP} onChange={this.changeHelpP} ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInput2" className="bmd-label-floating">Mathematica Help</label>
                  <textarea type="text" className="form-control" id="body" rows="3" value={this.state.questionHelpM} onChange={this.changeHelpM} ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInput4" className="bmd-label-floating">Correct answer</label>
                  <textarea type="text" className="form-control" id="body" rows="3" value={this.state.questionAnswer} onChange={this.changeAnswer} ></textarea>
                </div>
              
              <div>
                <div className="form-group">
                  <button type="submit" className="btn btn-info" onClick={this.handleSubmit} >Edit Question</button>
                </div>
              </div>
            </div>
          </div>
          <div>

          </div>
        </div>

      );
    }
  }

  export default EditQuestion;
