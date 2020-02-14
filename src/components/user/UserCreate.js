import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUser } from "../../actions/userActions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      reviewer: false,
      admin: false
    };

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

    this.props.createUser(user);
    this.props.toggleModal();
  }

  render() {
    return (
      <Form id="addUser" onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            maxlength="20"
            placeholder="Enter first name"
            onChange={this.onChange}
            value={this.state.firstName}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            maxlength="20"
            placeholder="Enter last name"
            onChange={this.onChange}
            value={this.state.lastName}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            maxlength="20"
            placeholder="Enter username"
            onChange={this.onChange}
            value={this.state.userName}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            maxlength="10"
            placeholder="Enter password"
            onChange={this.onChange}
            value={this.state.password}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            maxlength="12"
            placeholder="Enter phone number"
            onChange={this.onChange}
            value={this.state.phoneNumber}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            maxlength="75"
            placeholder="Enter email address"
            onChange={this.onChange}
            value={this.state.email}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicAdmin">
          <Form.Check
            type="checkbox"
            name="admin"
            label="Admin"
            onChange={this.onChange}
            value={this.state.admin}
          />
          <Form.Check
            type="checkbox"
            name="reviewer"
            label="Reviewer"
            onChange={this.onChange}
            value={this.state.reviewer}
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mr-3">
          Add User
        </Button>
        <Button variant="danger" onClick={() => this.props.toggleModal()}>
          Cancel
        </Button>
      </Form>
    );
  }
}

UserCreate.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default connect(null, { createUser })(UserCreate);
