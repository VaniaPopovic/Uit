import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import Sk from 'skulpt';

import 'brace/theme/monokai';
import 'brace/mode/python';
import 'brace/mode/javascript';
import 'brace/ext/language_tools';

import {
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
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




// output functions are configurable.  This one just appends some text
// to a pre element.


class Typography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      questions: []
    }

  
    this.runit = this.runit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.outf = this.outf.bind(this);
    this.builtinRead = this.builtinRead.bind(this);
    this.resetEditor = this.resetEditor.bind(this);
  }
 

  onChange(newValue) {

    this.state.value = newValue;
    console.log('change', this.state.value);
  }
// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
  runit() {

    var prog = this.state.value;
    var mypre = document.getElementById("output");
    mypre.innerHTML = '';
    Sk.pre = "output";
    Sk.configure({ output: this.outf, read: this.builtinRead });
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    var myPromise = Sk.misceval.asyncToPromise(function () {
      return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function (mod) {
        console.log('success');
      },
      function (err) {
        console.log(err.toString());
      });
   
  }
   outf(text) {
    var mypre = document.getElementById("output");
    console.log("ETO", text);
     var txt = document.createTextNode(text);
     mypre.appendChild(txt);
   }
  builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
      throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
  }
  resetEditor() {
    console.log("this is called");
    this.refs.ace.editor.setValue(`# This program prints Hello, world!` + `\nprint('Hello, world!')`,-1);
  }

 
  componentDidMount() {
    this.state.value = this.refs.ace.editor.getValue();
    console.log("VALUEEEE", this.state.value);
    fetch('/api/Questions/' + this.props.match.params.id)
      .then((Response) => Response.json())
      .then((findresponse) => {
        console.log(findresponse);
        this.setState({
          questions: findresponse

        })
        console.log(findresponse);
      })
  }


  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    
    //console.log("current",this.props.match.params.id);
    //console.log("prev", prevProps.match.params.id);
    //console.log("called");
    if (this.props.match.params.id != prevProps.match.params.id) {
      this.state.value = this.refs.ace.editor.getValue();
      fetch('/api/Questions/' + this.props.match.params.id)
        .then((Response) => Response.json())
        .then((findresponse) => {
          console.log(findresponse);
          this.setState({
            questions: findresponse

          })
          console.log(findresponse);
        })
    }
  }
  render() {
   

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
               { this.state.questions.title}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <AceEditor
                      ref="ace"
                      mode="python"
                      width="auto"
                      theme="monokai"
                      name="blah2"
                      onLoad={this.onLoad}
                      onChange={this.onChange}
                      fontSize={14}
                      showPrintMargin={true}
                      showGutter={true}
                      highlightActiveLine={true}
                      value={`# This program prints Hello, world!` +`\nprint('Hello, world!')`}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                      }} />

                  
                    <Button onClick={this.runit} outline color="primary" size="lg">Run</Button>{' '}
                    <Button outline onClick={this.resetEditor} color="danger" size="lg">Clear</Button>{' '}
        

               
                  </Col>
                  <Col>

                    <h4>{this.state.questions.text}</h4>
                    <p className="card-text">Python text:  {this.state.questions.textPython}</p>
                    <p className="card-text" id="out">Mathemtca text: {this.state.questions.textMathematica}</p>
                     <Button outline color="info">Help</Button>{' '}
                  </Col>
                </Row>
           
                  
     
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Output
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <p className="form-control"  id="output" >Sample output </p>

                    <div id="mycanvas"></div> 
                     
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Typography;
