import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Container } from "react-bootstrap";
import Message from "../components/Message";
import { removeFromFavourite } from "../store/actions/favouriteActions";

const Favourite = () => {
  const removeFromFavouriteHandler = (id) => {
    dispatch(removeFromFavourite(id));
  };

  const dispatch = useDispatch();
  const favourite = useSelector((state) => state.favourite);
  const { favouriteItems } = favourite;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className="text-center"> Favourite Ads</h1>
          {favouriteItems.length === 0 ? (
            <Message>
              No Favourite Ads <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {favouriteItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.images[0]} alt={item.name} fluid />
                    </Col>
                    <Col md={2}>
                      <Link to={`/ad/${item.id}?redirect=myfavourite`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={4}>
                      <p>{item.description}</p>
                    </Col>
                    <Col md={2}>Rs{item.price}</Col>

                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromFavouriteHandler(item.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Favourite;
