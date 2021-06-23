import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToFavourite } from "../store/actions/favouriteActions";
import { Link } from "react-router-dom";
import "./Ad.css";
const Ad = ({ ad }) => {
  const dispatch = useDispatch();
  return (
    <Link to={`/ad/${ad.id}`} style={{ textDecoration: "none" }}>
      <Card className="cardCon rounded">
        <Col className="mx-auto">
          <Card.Img id="pic" src={ad.images[0]} fluid />
        </Col>
        <Card.Body>
          <Card.Text as="div" className="mt-1">
            <Row>
              <Col md={10}>
                <h6>
                  <strong>{ad.name}</strong>
                </h6>
                <p> RS{ad.price} </p>
                <p> Location {ad.city} </p>
              </Col>
              <Col md={2}>
                <Link
                  to="/myfavourite"
                  style={{
                    color: "black",
                    position: "relative",
                  }}
                  onClick={() => dispatch(addToFavourite(ad))}
                >
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </Link>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Ad;
