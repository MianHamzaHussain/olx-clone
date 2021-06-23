import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { login } from "../store/actions/userActions";
const LoginScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Container>
      <Meta title="Login" />
      <Row>
        <Col md={6} className="mx-auto">
          <h1 className="text-center">SignIn </h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler} autoComplete={false}>
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
              <Button
                type="submit"
                variant="primary"
                className="btn btn-block my-2"
              >
                Sign In
              </Button>
            </Form.Group>
          </Form>
          <Row className="py-3">
            <Col>
              New User?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
