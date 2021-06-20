import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup, Container } from "react-bootstrap";
import { listAdDetails } from "../store/actions/adActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Slider from "../components/Slider";
import Meta from "../components/Meta";

const AdDetails = ({ match }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const adDetails = useSelector((state) => state.adDetails);
  const { loading, error, ad } = adDetails;

  useEffect(() => {
    dispatch(listAdDetails(match.params.id));
  }, [dispatch, match]);
  return (
    <>
      <Link to="/" className="btn btn-info py-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Meta title={ad.name} />
          <Row className="my-3">
            <Col md="8" sm="12" xs="12">
              <Slider pics={ad.images} />
            </Col>
            <Col md="8" sm="12" xs="12">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{ad.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>Price: Rs{ad.price}</ListGroup.Item>
                <ListGroup.Item>Description: {ad.description}</ListGroup.Item>
                <ListGroup.Item>Location: {ad.city}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default AdDetails;
