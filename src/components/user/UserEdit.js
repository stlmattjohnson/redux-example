import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../actions/userActions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.currentUser
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

    this.props.toggleModal();

    this.props.updateUser(user);
  }

  render() {
    return (
      <Form id="editUser" onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            maxlength="20"
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
            maxlength="10"
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
            checked={this.state.admin}
          />
          <Form.Check
            type="checkbox"
            name="reviewer"
            label="Reviewer"
            onChange={this.onChange}
            checked={this.state.reviewer}
          />
        </Form.Group>
        <Button variant="success" className="mr-3" type="submit">
          Update User
        </Button>
        <Button variant="danger" onClick={() => this.props.toggleModal()}>
          Cancel
        </Button>
      </Form>
    );
  }
}

UserEdit.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default connect(null, { updateUser })(UserEdit);
