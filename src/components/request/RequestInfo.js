import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchLines } from "../../actions/lineActions";
import { approveRequest, rejectRequest } from "../../actions/reviewActions";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class RequestInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rejectClicked: false,
      activeRequest: this.props.currentRequest.id,
      request: {
        ...this.props.currentRequest
      }
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchLines(this.props.currentRequest.id);
  }

  onChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    this.setState({
      request: { ...this.state.request, [name]: value }
    });
  }

  numberFormat = value =>
    new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD"
    }).format(value);

  render() {
    const lineItems = this.props.lines.map(line => (
      <tr key={line.id}>
        <td>{line.product.name}</td>
        <td>{line.quantity}</td>
        <td>{this.numberFormat(line.product.price * line.quantity)}</td>
      </tr>
    ));

    return (
      <>
        <Form.Row>
          <Col>
            <Table borderless striped responsive="sm">
              <tbody>
                <tr className="bg-dark text-white font-weight-bold">
                  <td>
                    Submitted by: {this.state.request.user.firstName}{" "}
                    {this.state.request.user.lastName}
                  </td>
                </tr>
                <tr>
                  <td>Description: {this.state.request.description}</td>
                </tr>
                <tr>
                  <td>Justification: {this.state.request.justification}</td>
                </tr>
                <tr>
                  <td>Needed by: {this.state.request.dateNeeded}</td>
                </tr>
                <tr>
                  <td>Submitted on: {this.state.request.submittedDate}</td>
                </tr>
                <tr>
                  <td>Delivery Mode: {this.state.request.deliveryMode}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table responsive="sm">
              <thead className="thead-dark">
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Line Total</th>
                </tr>
              </thead>
              <tbody>
                {lineItems}
                <tr className="bg-dark text-white font-weight-bold">
                  <td colSpan="3" className="text-right">
                    Grand Total: {this.numberFormat(this.state.request.total)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Form.Row>
        {this.state.rejectClicked ? (
          <>
            <Form.Label>Reason for Rejection:</Form.Label>
            <Form.Control
              as="textarea"
              name="reasonForRejection"
              maxLength="255"
              onChange={this.onChange}
              required
            ></Form.Control>
            <Form.Row>
              <Col>
                {" "}
                <Button
                  variant="danger"
                  className="mt-3"
                  block
                  onClick={() => {
                    this.props.rejectRequest(this.state.request);
                    this.props.toggleModal();
                  }}
                >
                  Reject
                </Button>
              </Col>
              <Col>
                {" "}
                <Button
                  variant="secondary"
                  className="mt-3"
                  block
                  onClick={() => this.setState({ rejectClicked: false })}
                >
                  Cancel
                </Button>
              </Col>
            </Form.Row>
          </>
        ) : (
          <Form.Row>
            <Col>
              <Button
                variant="danger"
                className="mt-3"
                block
                onClick={() => this.setState({ rejectClicked: true })}
              >
                Reject
              </Button>
            </Col>
            <Col>
              <Button
                variant="success"
                className="mt-3"
                block
                onClick={() => {
                  this.props.approveRequest(this.state.request.id);
                  this.props.toggleModal();
                }}
              >
                Approve
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

RequestInfo.propTypes = {
  fetchLines: PropTypes.func.isRequired,
  approveRequest: PropTypes.func.isRequired,
  rejectRequest: PropTypes.func.isRequired,
  lines: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  lines: state.lines.lines
});

export default connect(mapStateToProps, {
  fetchLines,
  approveRequest,
  rejectRequest
})(RequestInfo);
