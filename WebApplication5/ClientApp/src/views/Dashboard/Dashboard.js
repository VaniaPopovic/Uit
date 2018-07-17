import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Button,
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
import Sk from 'skulpt'

function outf(text) {
  var mypre = document.getElementById("output");
  console.log("test", text);
  mypre.innerHTML = mypre.innerHTML + text;
}
function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}
// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() {
  var prog = document.getElementById("yourcode").value;
  var mypre = document.getElementById("output");
  mypre.innerHTML = '';
  Sk.pre = "output";
  Sk.configure({ output: outf, read: builtinRead });
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }



  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Intoduction
              </CardHeader>
              <CardBody>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat id libero nec dapibus. Nulla facilisi. Integer id mollis mi. Donec venenatis tellus ac sem blandit sagittis. Donec condimentum nisi ut risus semper tempor. Aliquam ultrices sit amet nulla ac pharetra. Nunc auctor porta tortor. Aliquam sodales pellentesque interdum. Donec tempor tellus nec varius varius. Morbi facilisis nec ante ac finibus. Donec scelerisque magna dui, ut efficitur orci convallis eu. Curabitur metus enim, ornare id posuere nec, blandit nec erat. Quisque pretium pulvinar aliquet.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat id libero nec dapibus. Nulla facilisi. Integer id mollis mi. Donec venenatis tellus ac sem blandit sagittis. Donec condimentum nisi ut risus semper tempor. Aliquam ultrices sit amet nulla ac pharetra. Nunc auctor porta tortor. Aliquam sodales pellentesque interdum. Donec tempor tellus nec varius varius. Morbi facilisis nec ante ac finibus. Donec scelerisque magna dui, ut efficitur orci convallis eu. Curabitur metus enim, ornare id posuere nec, blandit nec erat. Quisque pretium pulvinar aliquet.</p>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
