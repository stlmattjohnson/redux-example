import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../../actions/userActions";
import UserCreate from "./UserCreate";
import UserEdit from "./UserEdit";
import GeneralModal from "../../GeneralModal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editUser: false,
      currentUser: {
        id: null,
        userName: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        reviewer: false,
        admin: false
      }
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  editRow(user) {
    this.toggleEdit();

    this.setState({
      currentUser: {
        ...user
      }
    });
  }

  toggleModal = () => {
    !this.state.showModal
      ? this.setState({ showModal: true })
      : this.setState({ showModal: false, editUser: false });
  };

  toggleEdit = () => {
    !this.state.editUser
      ? this.setState({ editUser: true })
      : this.setState({ editUser: false });
    this.toggleModal();
  };

  userDelete = user => {
    this.props.deleteUser(user);
  };

  render() {
    const userItems = this.props.users.map(user => (
      <tr key={user.id}>
        <td>
          {user.firstName} {user.lastName}
        </td>
        <td>{user.userName}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.email}</td>
        <td>
          <input type="checkbox" checked={user.admin} disabled></input>
        </td>
        <td>
          <input type="checkbox" checked={user.reviewer} disabled></input>
        </td>
        <td>
          <Button
            variant="primary"
            size="sm"
            className="m-1"
            onClick={() => {
              this.editRow(user);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="m-1"
            onClick={() => this.userDelete(user.id)}
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
          title={this.state.editUser ? "Edit User" : "Add User"}
        >
          {this.state.editUser ? (
            <UserEdit
              editUser={this.state.editUser}
              toggleModal={() => this.toggleModal()}
              currentUser={this.state.currentUser}
            />
          ) : (
            <UserCreate toggleModal={() => this.toggleModal()} />
          )}
        </GeneralModal>

        <div className="mb-3">
          <Button variant="primary" block onClick={() => this.toggleModal()}>
            + Add User
          </Button>
        </div>

        <Table borderless hover responsive="sm">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Reviewer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{userItems}</tbody>
        </Table>
      </>
    );
  }
}

UserList.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(mapStateToProps, {
  fetchUsers,
  deleteUser
})(UserList);
