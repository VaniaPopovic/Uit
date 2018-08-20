      import React, { Component } from 'react';
      //import brace from 'brace';
      import AceEditor from 'react-ace';
      import classnames from 'classnames';
      import $ from 'jquery'; 
      import 'brace/theme/monokai';
      import 'brace/mode/python';
      import 'brace/mode/javascript';
      import 'brace/ext/language_tools';

      import {
        TabContent,
        Alert,
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



  function updateState(text,errorMessage) {
        this.setState({ isCorrect: text ,message: errorMessage});
      }

      class OutPutBox extends Component {
        constructor(props) {
          super(props)
          this.state = {
            isCorrect: 0,
            message: this.props.message


          }
          updateState = updateState.bind(this);
        }
        render() {
          return (
            <Card>
              <CardHeader>
                Output
              </CardHeader>
              <CardBody>
                <div>
                  {this.state.isCorrect === 1 &&
                    <Alert id="outpp" color="success">That's Correct! Good Job! </Alert>}

                  {this.state.isCorrect === 2 &&
                    <Alert id="outpp" color="danger">
                    <h4>Something went wrong... Try again! </h4>
                        <p>{this.state.message}</p>

              </Alert>}
        </div>
                <Row>
                  <Col>
                    <p className="form-control" id="output" >Sample output </p>
                    <div id="mycanvas"></div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          )
        }
      }

     

      class Typography extends Component {
        constructor(props) {
          super(props);

          this.state = {
            value: "",
            questions: [],
            activeTab: '1',
            modalPython: false,
            modalMathematica: false,
            t: "",
        }


          this.runit = this.runit.bind(this);
          this.onChange = this.onChange.bind(this);
         // this.outf = this.outf.bind(this);
          //upd = upd.bind(this);
        //  this.builtinRead = this.builtinRead.bind(this);
          this.resetEditor = this.resetEditor.bind(this);
          this.toggle = this.toggle.bind(this);
          this.toggleModalPython = this.toggleModalPython.bind(this);
          this.toggleModalMathematica = this.toggleModalMathematica.bind(this);

        }

        runit(t,b) {


        
          var to_compile = {
            "LanguageChoice": "5",
            "Program": t,
            "Input": "",
            "CompilerArgs": ""
          };

          $.ajax({
            url: "http://rextester.com/rundotnet/api",
            type: "POST",
            data: to_compile
          }).done(function (data) {
            var mypre = document.getElementById("output");
            mypre.innerHTML = data.Result;
            if (data.Result && b === data.Result.replace(/\n/g, '')) {
              updateState(1);
            } else if (data.Errors===null) {
                  updateState(2,'Your program returns a wrong answer!');
            }else{
                  updateState(2,'Your program returns the following error: ' + JSON.stringify(data.Errors).replace(/\n/g,' '));
            }
          

          }).fail(function (data, err) {
            alert("fail " + JSON.stringify(data) + " " + JSON.stringify(err));
          });

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
        }
        // Here's everything you need to run a python program in skulpt
        // grab the code from your textarea
        // get a reference to your pre element for output
        // configure the output function
        // call Sk.importMainWithBody()
     

        

         
        
        
      
        resetEditor() {
          this.refs.ace.editor.setValue(`# This program prints Hello, world!` + `\nprint('Hello, world!')`, -1);
        }


        componentDidMount() {
          this.state.value = this.refs.ace.editor.getValue();
          fetch('/api/Questions/' + this.props.match.params.id)
            .then((Response) => Response.json())
            .then((findresponse) => {
              this.setState({
                questions: findresponse

              })
            })
        }


        componentDidUpdate(prevProps) {
          // Typical usage (don't forget to compare props):
           if (this.props.match.params.id !== prevProps.match.params.id) {
            this.state.value = this.refs.ace.editor.getValue();
            fetch('/api/Questions/' + this.props.match.params.id)
              .then((Response) => Response.json())
              .then((findresponse) => {
                this.setState({
                  questions: findresponse

                })
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
                        value={`# Write your program below.`}
                        setOptions={{
                                  enableBasicAutocompletion: true,
                                  enableLiveAutocompletion: true,
                                  enableSnippets: false,
                                  showLineNumbers: true,
                                  tabSize: 2,
                              }} />


                      
                      </div>
                    <div className="card-footer">
                      <Button onClick={()=> this.runit(this.state.value,this.state.questions.correctAnswer)} outline color="primary" size="sm">Run</Button>{' '}
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
                                              <ModalHeader toggle={this.toggleModalPython}>Hint</ModalHeader>
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
      
                    <OutPutBox message={this.state.message}/>
                  
                  </div>
          );
        }
      }

      export default Typography;
