import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchVendors, deleteVendor } from "../../actions/vendorActions";
import VendorCreate from "./VendorCreate";
import VendorEdit from "./VendorEdit";
import GeneralModal from "../../GeneralModal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

class VendorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editVendor: false,
      currentVendor: {
        id: null,
        code: "",
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phoneNumber: "",
        email: ""
      }
    };
  }

  componentDidMount() {
    this.props.fetchVendors();
  }

  editRow(vendor) {
    this.toggleEdit();

    this.setState({
      currentVendor: {
        ...vendor
      }
    });
  }

  toggleModal = () => {
    !this.state.showModal
      ? this.setState({ showModal: true })
      : this.setState({
          showModal: false,
          editVendor: false
        });
  };

  toggleEdit = () => {
    !this.state.editVendor
      ? this.setState({ editVendor: true })
      : this.setState({ editVendor: false });
    this.toggleModal();
  };

  vendorDelete = vendor => {
    this.props.deleteVendor(vendor);
  };

  render() {
    const vendorItems = this.props.vendors.map(vendor => (
      <tr key={vendor.id}>
        <td>{vendor.code}</td>
        <td>{vendor.name}</td>
        <td>
          {vendor.address} {vendor.city}, {vendor.state}, {vendor.zip}
        </td>
        <td>{vendor.phoneNumber}</td>
        <td>{vendor.email}</td>
        <td>
          <Button
            variant="primary"
            size="sm"
            className="m-1"
            onClick={() => {
              this.editRow(vendor);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="m-1"
            onClick={() => this.vendorDelete(vendor.id)}
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
          title={this.state.editVendor ? "Edit Vendor" : "Add Vendor"}
        >
          {this.state.editVendor ? (
            <VendorEdit
              editVendor={this.state.editVendor}
              toggleModal={() => this.toggleModal()}
              currentVendor={this.state.currentVendor}
            />
          ) : (
            <VendorCreate toggleModal={() => this.toggleModal()} />
          )}
        </GeneralModal>

        <div className="mb-3">
          <Button variant="primary" block onClick={() => this.toggleModal()}>
            + Add Vendor
          </Button>
        </div>

        <Table borderless hover responsive="sm">
          <thead className="thead-dark">
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{vendorItems}</tbody>
        </Table>
      </>
    );
  }
}

VendorList.propTypes = {
  fetchVendors: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired,
  vendors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  vendors: state.vendors.vendors
});

export default connect(mapStateToProps, {
  fetchVendors,
  deleteVendor
})(VendorList);
