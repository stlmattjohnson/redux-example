import React from "react";
import "./App.css";
import UserList from "./components/user/UserList";
import VendorList from "./components/vendor/VendorList";
import ProductList from "./components/product/ProductList";
import RequestList from "./components/request/RequestList";
import RequestApproval from "./components/request/RequestApproval";
import Login from "./components/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoff } from "./actions/appActions";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function App() {
  const user = useSelector(state => state.loggedInUser.loggedInUser);
  const dispatch = useDispatch();

  return (
    <>
      {user === undefined || !user ? (
        <Login />
      ) : (
        <Router>
          <Navbar bg="light" expand="md" className="py-4">
            <Navbar.Brand href="#">Redux Test</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link as={Link} to="/users">
                  Users
                </Nav.Link>
                <Nav.Link as={Link} to="/vendors">
                  Vendors
                </Nav.Link>
                <Nav.Link as={Link} to="/products">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/requests">
                  Requests
                </Nav.Link>
                {user.reviewer ? (
                  <Nav.Link as={Link} to="/approvals">
                    Approvals
                  </Nav.Link>
                ) : (
                  <></>
                )}
                <Nav.Link onClick={() => dispatch(logoff())} to="/logoff">
                  Logoff
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="App">
            <Switch>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/vendors">
                <Vendors />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/requests">
                <Requests />
              </Route>
              <Route path="/approvals">
                <RequestsMaint />
              </Route>
              <Redirect exact from="/" to="requests" />
            </Switch>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;

function Users() {
  return <UserList />;
}

function Vendors() {
  return <VendorList />;
}

function Products() {
  return <ProductList />;
}

function Requests() {
  return <RequestList />;
}

function RequestsMaint() {
  return <RequestApproval />;
}
