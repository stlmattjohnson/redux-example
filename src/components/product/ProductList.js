import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchProducts, deleteProduct } from "../../actions/productActions";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";
import GeneralModal from "../../GeneralModal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editProduct: false,
      currentProduct: {
        id: null,
        vendor: {
          id: null
        },
        partNumber: "",
        name: "",
        price: null,
        unit: "",
        photoPath: ""
      }
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  editRow(product) {
    this.toggleEdit();
    this.setState({
      currentProduct: { ...product }
    });
  }

  toggleModal = () => {
    !this.state.showModal
      ? this.setState({ showModal: true })
      : this.setState({
          showModal: false,
          editProduct: false
        });
  };

  toggleEdit = () => {
    !this.state.editProduct
      ? this.setState({ editProduct: true })
      : this.setState({ editProduct: false });
    this.toggleModal();
  };

  productDelete = product => {
    this.props.deleteProduct(product);
  };

  render() {
    const productItems = this.props.products.map(product => (
      <tr key={product.id}>
        <td>{product.vendor.name}</td>
        <td>{product.name}</td>
        <td>{product.partNumber}</td>
        <td>{product.price}</td>
        <td>{product.unit}</td>
        <td>{product.photoPath}</td>
        <td>
          <Button
            variant="primary"
            size="sm"
            className="m-1"
            onClick={() => {
              this.editRow(product);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="m-1"
            onClick={() => this.productDelete(product.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <>
        <GeneralModal
          show={this.state.showModal}
          toggle={() => this.toggleModal()}
          title={this.state.editProduct ? "Edit Product" : "Add Product"}
        >
          {this.state.editProduct ? (
            <ProductEdit
              editProduct={this.state.editProduct}
              toggleModal={() => this.toggleModal()}
              currentProduct={this.state.currentProduct}
            />
          ) : (
            <ProductCreate toggleModal={() => this.toggleModal()} />
          )}
        </GeneralModal>

        <div className="mb-3">
          <Button variant="primary" block onClick={() => this.toggleModal()}>
            + Add Product
          </Button>
        </div>

        <Table borderless hover responsive="sm">
          <thead className="thead-dark">
            <tr>
              <th>Vendor</th>
              <th>Product Name</th>
              <th>Part Number</th>
              <th>Price</th>
              <th>Units</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{productItems}</tbody>
        </Table>
      </>
    );
  }
}

ProductList.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  products: state.products.products
});

export default connect(mapStateToProps, {
  fetchProducts,
  deleteProduct
})(ProductList);
