import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
 
  Card,
  CardBody,
 
  CardHeader,
  Col,

  Row,

} from 'reactstrap';


import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user } = this.props;
        return (
       <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Introduction
              </CardHeader>
              <CardBody>

                <h6>Welcome {user.firstName} {user.lastName} !</h6>                 <p> UiT coding is a platform where you can learn the basics of several programming languages in an easy way. You will be asked to use algortihms in order to solve relatively easy mathematical problems.                   In the sidebar on the left you can find the specific subjects which will be handled. If you are not familiar with the syntax of a certain language it is highly recommended to complete the introduction first. If you think that you need more information to fulfill the task, feel free to search extra documentation on the internet. In case you didn't know, that's how 80% of programming works!                   Let the games begin!</p> 

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
        );
    }
}

function mapStateToProps(state) {
    const {  authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage };
