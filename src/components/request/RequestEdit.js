import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateRequest } from "../../actions/requestActions";
import { fetchUsers } from "../../actions/userActions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class RequestEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.currentRequest
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
    this.props.updateRequest(request);
    this.props.toggleModal();
  }

  render() {
    const userItems = this.props.users.map((user, index) => (
      <option
        key={index}
        value={
          user.id === this.props.currentRequest.user.id ? "default" : index
        }
      >
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
            defaultValue={"default"}
            required
          >
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
            defaultValue={this.state.deliveryMode}
            required
          >
            <option value="Mail">Mail</option>
            <option value="Pick-Up">Pick-Up</option>
          </Form.Control>
        </Form.Group>
        <Button variant="success" type="submit" className="mr-3">
          Update Request
        </Button>
        <Button variant="danger" onClick={() => this.props.toggleModal()}>
          Cancel
        </Button>
      </Form>
    );
  }
}

RequestEdit.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(mapStateToProps, { fetchUsers, updateRequest })(
  RequestEdit
);
