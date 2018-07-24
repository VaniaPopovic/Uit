import React, { Component } from 'react';
import {
 
  Card,
  CardBody,
 
  CardHeader,
  Col,

  Row,

} from 'reactstrap';



class Dashboard extends Component {
 

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
