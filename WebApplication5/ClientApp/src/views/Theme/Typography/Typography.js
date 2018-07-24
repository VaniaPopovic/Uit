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
  TabPane,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Nav, NavItem, NavLink,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';




// output functions are configurable.  This one just appends some text
// to a pre element.

//var callback = function (key) {
//}

class Typography extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      questions: [],
      activetab: '1',
      modal: false
    }


    this.runit = this.runit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.outf = this.outf.bind(this);
    this.builtinRead = this.builtinRead.bind(this);
    this.resetEditor = this.resetEditor.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }


  toggleModal() {
    this.setState({
      modal: !this.state.modal
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
    this.setState({
      value: newValue
  });
    //this.state.value = newValue;
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
    console.log("Programming panel debug", text);
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
    this.setState({
      value: this.refs.ace.editor.getValue()
    });
    //this.state.value = this.refs.ace.editor.getValue();
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
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        value: this.refs.ace.editor.getValue()
      });
     // this.state.value = this.refs.ace.editor.getValue();
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
                {this.state.questions.title}
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
                      value={`# This program prints Hello, world!` + `\nprint('Hello, world!')`}
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
                    <div>
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
                            <Col sm="12">
                              <p className="card-text">{this.state.questions.text}</p>
                              <Button outline color="info" onClick={this.toggleModal}>Help</Button>{' '}
                              <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                                <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                                <ModalBody>
                                  <p>{this.state.questions.textPython}</p>
                                </ModalBody>
                                <ModalFooter>
                                  <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                                </ModalFooter>
                              </Modal>

                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <Row>
                            <Col sm="6">
                              <p className="card-text" id="out">{this.state.questions.textMathematica}</p>
                              <Button outline color="info">H</Button>{' '}
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </div>

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
                    <p className="form-control" id="output" >Sample output </p>
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
