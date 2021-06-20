import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Ad.css";
const Ad = ({ ad }) => {
  return (
    <Link to={`/ad/${ad.id}`} style={{ textDecoration: "none" }}>
      <Card className="cardCon rounded">
        <Col className="mx-auto">
          <Card.Img id="pic" src={ad.images[0]} fluid />
        </Col>
        <Card.Body>
          {/* <Button className="favor btn" onClick={() => alert("ok")}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </Button> */}

          <Card.Text as="div" className="mt-1">
            <h6>
              <strong>{ad.name}</strong>
            </h6>
            <p> RS{ad.price} </p>
            <p> Location {ad.city} </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Ad;
