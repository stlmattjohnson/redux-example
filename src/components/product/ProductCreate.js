import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProduct } from "../../actions/productActions";
import { fetchVendors } from "../../actions/vendorActions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ProductCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendor: {
        id: null,
        code: "",
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phoneNumber: "",
        email: ""
      },
      partNumber: "",
      name: "",
      price: 0,
      unit: "",
      photoPath: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchVendors();
  }

  onChange(e) {
    if (e.target.name === "vendor") {
      this.setState({ vendor: this.props.vendors[e.target.value] });
    } else {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      const name = e.target.name;

      this.setState({
        [name]: value
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const product = { ...this.state };

    this.props.createProduct(product);
    this.props.toggleModal();
  }

  render() {
    const vendorItems = this.props.vendors.map((vendor, index) => (
      <option key={index} value={index}>
        {vendor.name}
      </option>
    ));

    return (
      <Form id="addProduct" onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicVendor">
          <Form.Label>Vendor</Form.Label>
          <Form.Control
            as="select"
            name="vendor"
            onChange={this.onChange}
            required
          >
            <option value="">Select a vendor..</option>
            {vendorItems}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            maxlength="150"
            placeholder="Enter product name"
            onChange={this.onChange}
            value={this.state.name}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPartNumber">
          <Form.Label>Part Number</Form.Label>
          <Form.Control
            type="text"
            name="partNumber"
            maxlength="50"
            placeholder="Enter part number"
            onChange={this.onChange}
            value={this.state.partNumber}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            max="9999999999.99"
            step=".01"
            placeholder="Enter product price"
            onChange={this.onChange}
            value={this.state.price}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicUnit">
          <Form.Label>Unit</Form.Label>
          <Form.Control
            type="text"
            name="unit"
            maxlength="255"
            placeholder="Enter product unit measurement"
            onChange={this.onChange}
            value={this.state.unit}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhotoPath">
          <Form.Label>Photopath</Form.Label>
          <Form.Control
            type="text"
            name="photoPath"
            maxlength="255"
            placeholder="Enter product photopath"
            onChange={this.onChange}
            value={this.state.photoPath}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mr-3">
          Add Product
        </Button>
        <Button variant="danger" onClick={() => this.props.toggleModal()}>
          Cancel
        </Button>
      </Form>
    );
  }
}

ProductCreate.propTypes = {
  fetchVendors: PropTypes.func.isRequired,
  createProduct: PropTypes.func.isRequired,
  vendors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  vendors: state.vendors.vendors
});

export default connect(mapStateToProps, { fetchVendors, createProduct })(
  ProductCreate
);
