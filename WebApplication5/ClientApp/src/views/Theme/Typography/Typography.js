import React, { Component } from 'react';
//import brace from 'brace';
import AceEditor from 'react-ace';
import Sk from 'skulpt';
import classnames from 'classnames';

import 'brace/theme/monokai';
import 'brace/mode/python';
import 'brace/mode/javascript';
import 'brace/ext/language_tools';

import {
    TabContent,
  Container,
  TabPane,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Progress,
  Row,
  Table,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';




// output functions are configurable.  This one just appends some text
// to a pre element.

var callback = function (key) {
}

class Typography extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      questions: [],
      activeTab: '1',
      modalPython: false,
      modalMathematica: false
    }


    this.runit = this.runit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.outf = this.outf.bind(this);
    this.builtinRead = this.builtinRead.bind(this);
    this.resetEditor = this.resetEditor.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModalPython = this.toggleModalPython.bind(this);
    this.toggleModalMathematica = this.toggleModalMathematica.bind(this);

  }


  toggleModalPython() {
    this.setState({
      modalPython: !this.state.modalPython
    });
  }

 toggleModalMathematica() {
    this.setState({
      modalMathematica: !this.state.modalMathematica
    });
  }


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
    this.refs.ace.editor.setValue(`# This program prints Hello, world!` + `\nprint('Hello, world!')`, -1);
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
          <div>
          <div className="card-group">
                <Card>
                    <CardHeader>{this.state.questions.title}</CardHeader>
                    
              <div className="card-body">
    
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
                  value={`# This program prints Hello, world!` + `\nprint('Hello, world!')`}
                  setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }} />


                
                </div>
              <div className="card-footer">
                <Button onClick={this.runit} outline color="primary" size="sm">Run</Button>{' '}
                <Button outline onClick={this.resetEditor} color="danger" size="sm">Clear</Button>{' '}
              </div>
            </Card>
            <Card>
          
              <div className="card-body">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                            >
                                Python
                  </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                Mathematica
                  </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col >
                                    <p className="card-text">{this.state.questions.textPython}</p>
                                    <Button outline color="info" onClick={this.toggleModalPython}>Hint</Button>{' '}
                                    <Modal isOpen={this.state.modalPython} toggle={this.toggleModalPython} className={this.props.className}>
                                        <ModalHeader toggle={this.toggleModalPython}>Modal title</ModalHeader>
                                        <ModalBody>
                                            <p>{this.state.questions.helpPython}</p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={this.toggleModalPython}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col >

                                    <p className="card-text" id="out">{this.state.questions.textMathematica}</p>
                                    <Button outline color="info" onClick={this.toggleModalMathematica}>Hint</Button>{' '}
                                    <Modal isOpen={this.state.modalMathematica} toggle={this.toggleModalMathematica} className={this.props.className}>
                                        <ModalHeader toggle={this.toggleModalMathematica}>Modal title</ModalHeader>
                                        <ModalBody>
                                            <p>{this.state.questions.helpMathematica}</p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={this.toggleModalMathematica}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
           
            </Card>
            
    
          </div>
       
        
                <Card>
                    <CardHeader>
                        Output
                </CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                <p className="form-control" id="output" >Sample output </p>
                                <div id="mycanvas"></div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            
            </div>
    );
  }
}

export default Typography;
