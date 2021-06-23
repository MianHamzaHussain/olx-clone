import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../images/logo.svg";
import { logout } from "../store/actions/userActions";
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logouthandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Navbar bg="light" expand="sm">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="olx" />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Nav className="ms-auto">
            <NavDropdown title="Categories" id="categories">
              <LinkContainer to="/category/cars">
                <NavDropdown.Item>Cars</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/category/houses">
                <NavDropdown.Item>Houses</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/category/mobiles">
                <NavDropdown.Item>Mobiles</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            {userInfo ? (
              <NavDropdown title={userInfo.displayName} id="username">
                <LinkContainer to="/myads">
                  <NavDropdown.Item>My Ads</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logouthandler}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa fa-user" aria-hidden="true"></i>Login
                </Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/myfavourite">
              <Nav.Link>
                <i className="fa fa-heart"> Favourite </i>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
