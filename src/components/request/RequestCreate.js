import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createRequest } from "../../actions/requestActions";
import { fetchUsers } from "../../actions/userActions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class RequestCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      user: {
        id: null,
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        reviewer: false,
        admin: false
      },
      description: "",
      justification: "",
      dateNeeded: "",
      deliveryMode: "Mail",
      status: "",
      total: 0,
      submittedDate: "",
      reasonForRejection: ""
    };

    this.onChange = this.onChange.bind(this);
    this.userChange = this.userChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  userChange(e) {
    this.setState({ user: this.props.users[e.target.value] });
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

    const request = {
      ...this.state
    };

    this.props.createRequest(request);
    this.props.toggleModal();
  }

  render() {
    const userItems = this.props.users.map((user, index) => (
      <option key={index} value={index}>
        {user.firstName} {user.lastName}
      </option>
    ));

    return (
      <Form id="editRequest" onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicUser">
          <Form.Label>User</Form.Label>
          <Form.Control
            as="select"
            name="user"
            onChange={this.userChange}
            required
          >
            <option value="">Select a user</option>
            {userItems}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={this.onChange}
            value={this.state.description}
            placeholder="Enter a description"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicJustification">
          <Form.Label>Justification</Form.Label>
          <Form.Control
            type="text"
            name="justification"
            onChange={this.onChange}
            value={this.state.justification}
            placeholder="Enter a justification"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicDateNeeded">
          <Form.Label>Date Needed</Form.Label>
          <Form.Control
            type="date"
            name="dateNeeded"
            onChange={this.onChange}
            value={this.state.dateNeeded}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicDelivery">
          <Form.Label>Delivery Method</Form.Label>
          <Form.Control
            as="select"
            name="deliveryMode"
            onChange={this.onChange}
            defaultValue="Mail"
            required
          >
            <option value="Mail">Mail</option>
            <option value="Pick-Up">Pick-Up</option>
          </Form.Control>
        </Form.Group>
        <Button variant="success" type="submit" className="mr-3">
          Add Request
        </Button>
        <Button variant="danger" onClick={() => this.props.toggleModal()}>
          Cancel
        </Button>
      </Form>
    );
  }
}

RequestCreate.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  createRequest: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(mapStateToProps, { fetchUsers, createRequest })(
  RequestCreate
);
