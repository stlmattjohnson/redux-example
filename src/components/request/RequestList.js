import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRequests, deleteRequest } from "../../actions/requestActions";
import RequestCreate from "./RequestCreate";
import RequestEdit from "./RequestEdit";
import RequestLines from "./RequestLines";
import GeneralModal from "../../GeneralModal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editRequest: false,
      editLines: false,
      currentRequest: {
        id: null,
        user: {
          id: null
        },
        description: "",
        justification: "",
        dateNeeded: "",
        deliveryMode: "",
        status: "",
        total: 0,
        submittedDate: "",
        reasonForRejection: ""
      }
    };
  }

  componentDidMount() {
    this.props.fetchRequests();
  }

  editRow(request) {
    this.toggleEdit();
    this.setState({
      currentRequest: { ...request }
    });
  }

  editLines(request) {
    this.toggleLines();
    this.setState({
      currentRequest: { ...request }
    });
  }

  toggleModal = () => {
    !this.state.showModal
      ? this.setState({ showModal: true })
      : this.setState({
          showModal: false,
          editRequest: false,
          editLines: false
        });
    this.props.fetchRequests();
  };

  toggleEdit = () => {
    !this.state.editRequest
      ? this.setState({ editRequest: true })
      : this.setState({ editRequest: false });
    this.toggleModal();
  };

  toggleLines = () => {
    !this.state.editLines
      ? this.setState({ editLines: true })
      : this.setState({ editLines: false });
    this.toggleModal();
  };

  requestDelete = request => {
    this.props.deleteRequest(request);
  };

  numberFormat = value =>
    new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD"
    }).format(value);

  render() {
    const requestItems = this.props.requests.map(request => (
      <tr key={request.id}>
        <td>
          {request.user.firstName} {request.user.lastName}
        </td>
        <td>{request.description}</td>
        <td>{request.dateNeeded}</td>
        <td>{request.deliveryMode}</td>
        <td>{request.submittedDate}</td>
        <td>{this.numberFormat(request.total)}</td>
        <td>{request.status}</td>
        <td>
          <Button
            variant="primary"
            size="sm"
            className="m-1"
            onClick={() => {
              this.editRow(request);
            }}
          >
            Edit
          </Button>
          {request.total > 0 ? (
            <></>
          ) : (
            <Button
              variant="danger"
              size="sm"
              className="m-1"
              onClick={() => this.requestDelete(request.id)}
            >
              Delete
            </Button>
          )}
          {request.status === "New" || request.status === "Rejected" ? (
            <Button
              variant="info"
              size="sm"
              className="m-1"
              onClick={() => {
                this.editLines(request);
              }}
            >
              Lines
            </Button>
          ) : (
            <></>
          )}
        </td>
      </tr>
    ));

    return (
      <>
        <GeneralModal
          show={this.state.showModal}
          toggle={() => this.toggleModal()}
          title={
            this.state.editRequest
              ? "Edit Request"
              : this.state.editLines
              ? "Edit Lines"
              : "Add Request"
          }
          size={this.state.editLines ? "lg" : "md"}
        >
          {this.state.editRequest ? (
            <RequestEdit
              editRequest={this.state.editRequest}
              toggleModal={() => this.toggleModal()}
              currentRequest={this.state.currentRequest}
            />
          ) : this.state.editLines ? (
            <RequestLines
              editRequest={this.state.editRequest}
              toggleModal={() => this.toggleModal()}
              currentRequest={this.state.currentRequest}
            />
          ) : (
            <RequestCreate toggleModal={() => this.toggleModal()} />
          )}
        </GeneralModal>

        <div className="mb-3">
          <Button variant="primary" block onClick={() => this.toggleModal()}>
            + Add Request
          </Button>
        </div>

        <Table borderless hover responsive="sm">
          <thead className="thead-dark">
            <tr>
              <th>User</th>
              <th>Description</th>
              <th>Date Needed</th>
              <th>Delivery Mode</th>
              <th>Submitted</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{requestItems}</tbody>
        </Table>
      </>
    );
  }
}

RequestList.propTypes = {
  fetchRequests: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  requests: state.requests.requests
});

export default connect(mapStateToProps, {
  fetchRequests,
  deleteRequest
})(RequestList);
