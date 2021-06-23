import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

import { register } from "../store/actions/userActions";
const Register = ({ location, history }) => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const redirect = location.search ? location.search.split("=") : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      setMessage("Both Passwords Donot Match");
    }
  };
  return (
    <Container>
      <Meta title="Register" />
      <Row>
        <Col md={6} className="mx-auto">
          <h1 className="text-center">Sign Up</h1>
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="danger">{message}</Message>}

          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mt-2">
              <Button type="submit" variant="primary">
                SignUp
              </Button>
            </Form.Group>
          </Form>
          <Row className="py-3">
            Already have a account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
