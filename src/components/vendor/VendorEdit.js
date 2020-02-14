import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateVendor } from "../../actions/vendorActions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class VendorEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.currentVendor
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

    const vendor = {
      ...this.state
    };

    this.props.toggleModal();

    this.props.updateVendor(vendor);
  }

  render() {
    return (
      <Form id="editVendor" onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicCode">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            maxlength="10"
            onChange={this.onChange}
            value={this.state.code}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            maxlength="255"
            onChange={this.onChange}
            value={this.state.name}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            maxlength="255"
            onChange={this.onChange}
            value={this.state.address}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            maxlength="255"
            onChange={this.onChange}
            value={this.state.city}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            maxlength="2"
            onChange={this.onChange}
            value={this.state.state}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicZip">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            maxlength="12"
            onChange={this.onChange}
            value={this.state.zip}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            maxlength="12"
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
            maxlength="100"
            onChange={this.onChange}
            value={this.state.email}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mr-3">
          Update Vendor
        </Button>
        <Button variant="danger" onClick={() => this.props.toggleModal()}>
          Cancel
        </Button>
      </Form>
    );
  }
}

VendorEdit.propTypes = {
  updateVendor: PropTypes.func.isRequired
};

export default connect(null, { updateVendor })(VendorEdit);
