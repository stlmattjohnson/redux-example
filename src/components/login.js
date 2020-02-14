import React, { Component } from "react";
import { connect } from "react-redux";
import { loginAttempt } from "../actions/appActions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: ""
    };

    this.loginCheck = true;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      ...this.state
    };

    this.props.loginAttempt(user);
    this.loginCheck = false;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto pt-5">
            <div className="font-weight-bold h1 text-dark text-center mb-5">
              Purchase Request System
            </div>
            <Form id="loginForm" onSubmit={this.onSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  onChange={this.onChange}
                  value={this.state.userName}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Login
              </Button>
            </Form>
            {!this.loginCheck ? (
              <div className="text-center text-danger">
                Incorrect username or password.
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser.loggedInUser
});

export default connect(mapStateToProps, { loginAttempt })(Login);
