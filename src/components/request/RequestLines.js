import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchLines,
  updateLine,
  deleteLine,
  createLine
} from "../../actions/lineActions";
import { fetchProducts } from "../../actions/productActions";
import { getRequest, submitRequest } from "../../actions/requestActions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";

class LineEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedLine: -1,
      editLineItem: false,
      addLine: false,
      lineItem: {
        id: null,
        request: {
          id: props.currentRequest.id
        },
        product: {
          id: null,
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
        },
        quantity: 0
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchLines(this.props.currentRequest.id);
  }

  onChange(e) {
    if (e.target.name === "product") {
      const product = this.props.products.filter(
        prod => prod.id.toString() === e.target.value.toString()
      );

      this.setState({
        lineItem: {
          ...this.state.lineItem,
          product: product[0]
        }
      });
    } else {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      const name = e.target.name;

      this.setState({
        lineItem: { ...this.state.lineItem, [name]: value }
      });
    }
  }

  onSubmit(e) {
    console.log(e.target.id);
    e.preventDefault();
    let line = {
      ...this.state.lineItem
    };

    if (e.target.id === "editLineItem") {
      this.props.updateLine(line);
      this.toggleEdit();
    } else {
      this.props.createLine(line);
      this.toggleAdd();
    }
  }

  submitForApproval() {
    this.props.submitRequest(this.props.currentRequest.id);
    this.props.toggleModal();
  }

  editRow(line) {
    this.toggleEdit();
    this.setState({
      clickedLine: line.id,
      lineItem: { ...line }
    });
  }

  toggleEdit = () => {
    !this.state.editLineItem
      ? this.setState({ editLineItem: true, addLine: false })
      : this.setState({ editLineItem: false });
  };

  toggleAdd = () => {
    !this.state.addLine
      ? this.setState({
          addLine: true,
          editLineItem: false,

          lineItem: {
            id: null,
            request: {
              ...this.state.lineItem.request
            },
            product: {
              id: null,
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
            },
            quantity: 0
          }
        })
      : this.setState({ addLine: false });
  };

  numberFormat = value =>
    new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD"
    }).format(value);

  render() {
    const currentProducts = this.props.lines
      .filter(Boolean)
      .map(line => line.product.id);

    const filteredProducts = this.props.products.filter(
      product => !currentProducts.includes(product.id)
    );

    const availableProducts = filteredProducts.filter(Boolean).map(product => (
      <option key={product.id} value={product.id}>
        {product.name}
      </option>
    ));

    const lineItems = this.props.lines.filter(Boolean).map(line => (
      <tr key={line.id}>
        {this.state.editLineItem && this.state.clickedLine === line.id ? (
          <>
            <td colSpan="4">
              <Form id="editLineItem" onSubmit={this.onSubmit}>
                <Form.Row>
                  <Col md={5}>
                    <Form.Control
                      as="select"
                      name="product"
                      onChange={this.onChange}
                      required
                    >
                      <option value={line.product}>{line.product.name}</option>
                      {availableProducts}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      type="number"
                      min="1"
                      name="quantity"
                      onChange={this.onChange}
                      value={this.state.lineItem.quantity}
                      required
                    />
                  </Col>
                  <Col md={2}>
                    <div className="text-right">
                      {this.numberFormat(
                        this.state.lineItem.product.price *
                          this.state.lineItem.quantity
                      )}
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="p-0 text-right">
                      <Button
                        variant="success"
                        size="sm"
                        className="m-1"
                        type="submit"
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="m-1"
                        onClick={() => this.toggleEdit()}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Col>
                </Form.Row>
              </Form>
            </td>
          </>
        ) : (
          <>
            <td>{line.product.name}</td>
            <td>{line.quantity}</td>
            <td>{this.numberFormat(line.product.price * line.quantity)}</td>
            <td className="text-right">
              <Button
                variant="primary"
                size="sm"
                className="m-1"
                onClick={() => this.editRow(line)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="m-1"
                onClick={() => this.props.deleteLine(line.id)}
              >
                Delete
              </Button>
            </td>
          </>
        )}
      </tr>
    ));

    return (
      <>
        {this.props.currentRequest.reasonForRejection === "" ? (
          <></>
        ) : (
          <div className="p-2 bg-dark text-danger font-weight-bold">
            Reason for rejection: {this.props.currentRequest.reasonForRejection}
            <br />
            Please make the requested changes before resubmitting your request.
          </div>
        )}

        {this.props.lines.length > 0 ? (
          <Table responsive="sm">
            <thead className="thead-dark">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Line Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{lineItems}</tbody>
          </Table>
        ) : (
          <div className="text-center">
            Click below to begin adding items to your request.
          </div>
        )}

        {this.state.addLine ? (
          <Form id="addLineItem" onSubmit={this.onSubmit}>
            <Form.Row>
              <Col md={6}>
                <Form.Control
                  as="select"
                  name="product"
                  onChange={this.onChange}
                  defaultValue={"default"}
                  required
                >
                  <option value="">Select a product..</option>
                  {availableProducts}
                </Form.Control>
              </Col>
              <Col md={2}>
                <Form.Control
                  type="number"
                  min="1"
                  name="quantity"
                  onChange={this.onChange}
                  value={this.state.lineItem.quantity}
                  required
                />
              </Col>
              <Col md={2}>
                <Button
                  variant="success"
                  size="sm"
                  className="m-1"
                  type="submit"
                  block
                >
                  Save
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="m-1"
                  onClick={() => this.toggleAdd()}
                  block
                >
                  Cancel
                </Button>
              </Col>
            </Form.Row>
          </Form>
        ) : (
          <Form.Row>
            <Col>
              <Button
                variant="primary"
                className="mt-3"
                block
                onClick={() => this.toggleAdd()}
              >
                + Add Line
              </Button>
            </Col>
          </Form.Row>
        )}
        {this.state.addLine || this.state.editLineItem ? (
          <></>
        ) : (
          <Form.Row>
            <Col>
              <Button
                variant="success"
                className="mt-3"
                block
                onClick={() => this.submitForApproval()}
              >
                Submit
              </Button>
            </Col>
            <Col>
              <Button
                variant="secondary"
                className="mt-3"
                block
                onClick={() => this.props.toggleModal()}
              >
                Cancel
              </Button>
            </Col>
          </Form.Row>
        )}
      </>
    );
  }
}

LineEdit.propTypes = {
  fetchLines: PropTypes.func.isRequired,
  updateLine: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  lines: PropTypes.array.isRequired,
  submitRequest: PropTypes.func.isRequired,
  getRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products.products,
  lines: state.lines.lines,
  request: state.requests.request
});

export default connect(mapStateToProps, {
  fetchProducts,
  fetchLines,
  updateLine,
  createLine,
  deleteLine,
  submitRequest,
  getRequest
})(LineEdit);
