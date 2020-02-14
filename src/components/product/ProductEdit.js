import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProduct } from "../../actions/productActions";
import { fetchVendors } from "../../actions/vendorActions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ProductEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { ...props.currentProduct };

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
    this.props.updateProduct(product);
    this.props.toggleModal();
  }

  render() {
    const vendorItems = this.props.vendors.map((vendor, index) => (
      <option
        key={index}
        value={
          vendor.id === this.props.currentProduct.vendor.id ? "default" : index
        }
      >
        {vendor.name}
      </option>
    ));

    return (
      <Form id="editProduct" onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicVendor">
          <Form.Label>Vendor</Form.Label>
          <Form.Control
            as="select"
            name="vendor"
            onChange={this.onChange}
            defaultValue={"default"}
            required
          >
            {vendorItems}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            maxlength="150"
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
            onChange={this.onChange}
            value={this.state.photoPath}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mr-3">
          Update Product
        </Button>
        <Button variant="danger" onClick={() => this.props.toggleModal()}>
          Cancel
        </Button>
      </Form>
    );
  }
}

ProductEdit.propTypes = {
  fetchVendors: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  vendors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  vendors: state.vendors.vendors
});

export default connect(mapStateToProps, { fetchVendors, updateProduct })(
  ProductEdit
);
