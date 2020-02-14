import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  approvalList,
  rejectRequest,
  approveRequest
} from "../../actions/reviewActions";
import RequestInfo from "./RequestInfo";
import GeneralModal from "../../GeneralModal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

class RequestApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      reviewRequest: false,
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
    this.props.approvalList(this.props.loggedInUser.id);
  }

  reviewRequest(request) {
    this.toggleReview();
    this.setState({
      currentRequest: { ...request }
    });
  }

  toggleModal = () => {
    !this.state.showModal
      ? this.setState({ showModal: true })
      : this.setState({
          showModal: false,
          reviewRequest: false
        });
    this.props.approvalList();
  };

  toggleReview = () => {
    !this.state.reviewRequest
      ? this.setState({ reviewRequest: true })
      : this.setState({ reviewRequest: false });
    this.toggleModal();
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
        <td>
          <Button
            variant="primary"
            size="sm"
            className="m-1"
            onClick={() => {
              this.reviewRequest(request);
            }}
          >
            Review
          </Button>
        </td>
      </tr>
    ));

    return (
      <>
        <GeneralModal
          show={this.state.showModal}
          toggle={() => this.toggleModal()}
          title="Review Request"
          size="lg"
        >
          <RequestInfo
            toggleModal={() => this.toggleModal()}
            currentRequest={this.state.currentRequest}
          />
        </GeneralModal>

        <Table borderless hover responsive="sm">
          <thead className="thead-dark">
            <tr>
              <th>User</th>
              <th>Description</th>
              <th>Date Needed</th>
              <th>Delivery Mode</th>
              <th>Submitted</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{requestItems}</tbody>
        </Table>
      </>
    );
  }
}

RequestApproval.propTypes = {
  approvalList: PropTypes.func.isRequired,
  rejectRequest: PropTypes.func.isRequired,
  approveRequest: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  requests: state.approvals.approvals,
  loggedInUser: state.loggedInUser.loggedInUser
});

export default connect(mapStateToProps, {
  approvalList,
  rejectRequest,
  approveRequest
})(RequestApproval);
