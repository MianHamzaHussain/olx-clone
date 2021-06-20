import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Button } from "react-bootstrap";
import { listFilterAds } from "../store/actions/adActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Table from "../components/Table";
import Modal from "../components/Modal";
import AdForm from "../components/AdForm";
import { deleteAd } from "../store/actions/adActions";

const MyAds = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  // console.log("uid", userInfo.uid);

  const adDelete = useSelector((state) => state.adDelete);
  const { loading: delLoading, error: delError, delSuccess } = adDelete;
  const filter = `uid=${userInfo.uid}`;
  const adFilter = useSelector((state) => state.adFilter);
  const { loading, error, ads } = adFilter;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);
  useEffect(() => {
    dispatch(listFilterAds(filter));
  }, [dispatch, userInfo, filter]);
  const deletehandler = (id, data) => {
    if (window.confirm("are you sure delete ad")) {
      alert(id);
      dispatch(deleteAd(id, data));
    }
  };
  const [recordForEdit, setRecordForEdit] = useState(null);
  const setOpen = (item) => {
    setShowModal(true);
    setRecordForEdit(item);
  };
  const Header = ["Name", "Category", "Price", "City", "Image"];
  return (
    <>
      {delLoading ? (
        <Loader />
      ) : delError ? (
        <Message varaint="danger">{delError}</Message>
      ) : delSuccess ? (
        <Message variant="success">ad deleted successfuly</Message>
      ) : (
        <></>
      )}
      <Button variant="success" className="m-5" onClick={() => setOpen(null)}>
        Add
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varaint="danger">{error}</Message>
      ) : (
        <>
          <Container>
            <Row>
              {ads.length > 0 ? (
                <Table
                  head={Header}
                  data={ads}
                  deleteAd={deletehandler}
                  setOpen={setOpen}
                />
              ) : (
                "no result found"
              )}
            </Row>

            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              title="Ad details"
            >
              <AdForm recordForEdit={recordForEdit} userId={userInfo.uid} />
            </Modal>
          </Container>
        </>
      )}
    </>
  );
};

export default MyAds;
