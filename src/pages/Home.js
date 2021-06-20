import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { listAds } from "../store/actions/adActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Ad from "../components/Ad";
import "./Home.css";
const Home = () => {
  const dispatch = useDispatch();
  const adsList = useSelector((state) => state.adsList);
  const { loading, error, ads } = adsList;
  useEffect(() => {
    dispatch(listAds());
    // console.log("calling");
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varaint="danger">{error}</Message>
      ) : (
        <>
          <Container fluid className="banner"></Container>
          <Container>
            <Row>
              {ads.map((ad) => (
                <Col className="mt-3" sm={12} md={6} lg={4} xl={3} key={ad.id}>
                  <Ad ad={ad} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
