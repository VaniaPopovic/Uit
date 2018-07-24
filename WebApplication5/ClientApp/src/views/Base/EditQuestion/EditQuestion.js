import React, { Component } from 'react';

class EditQuestion extends Component {
  constructor() {
    super();
    this.state =
      {
        data: [],
        questionText: '',
		    questionTitle: '',
        questionID: '',
        questionPythonText: '',
        questionMathematicaText: '',
        qCID: ''
      }

    this.changeText = this.changeText.bind(this);
	  this.changeTitle = this.changeTitle.bind(this);
    this.changePythonText = this.changePythonText.bind(this);
    this.changeMathematicaText = this.changeMathematicaText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {
  
    fetch('/api/Questions/' + this.props.match.params.id)
      .then((Response) => Response.json())
      .then((findresponse) => {
        console.log("Edit question debug",findresponse)
     
        this.setState({
         
          questionText: findresponse.text,
		      questionTitle: findresponse.title,
          questionID: findresponse.questionID,
          questionPythonText: findresponse.textPython,
          questionMathematicaText: findresponse.textMathematica,
          qCID: findresponse.chapterID
        
        })
      })

  }

  changeText(event) {
    this.setState({ questionText: event.target.value })
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

  handleSubmit(event) {

    fetch('/api/Questions/' + this.props.match.params.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       text: this.state.questionText,
	     title: this.state.questionTitle,
       questionID: this.state.questionID,
       textPython: this.state.questionPythonText,
        textMathematica: this.state.questionMathematicaText,
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
                <label htmlFor="exampleInput1" className="bmd-label-floating">Post Title</label>
                <input type="text" className="form-control" value={this.state.questionText} onChange={this.changeText} />
              </div>
			  <div className="form-group">
                <label htmlFor="exampleInput4" className="bmd-label-floating">Question Title</label>
                <textarea type="text" className="form-control" id="body" rows="3" value={this.state.questionTitle} onChange={this.changeTitle} ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInput1" className="bmd-label-floating">Python Text</label>
                <textarea type="text" className="form-control" id="body" rows="3" value={this.state.questionPythonText} onChange={this.changePythonText} ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInput2" className="bmd-label-floating">Mathematica Text</label>
                <textarea type="text" className="form-control" id="body" rows="3" value={this.state.questionMathematicaText} onChange={this.changeMathematicaText} ></textarea>
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
