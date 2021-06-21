import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Button, Table, Image } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Modal from "../components/Modal";
import AdForm from "../components/AdForm";
import { listFilterAds, deleteAd } from "../store/actions/adActions";

const MyAds = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  // console.log("uid", userInfo.uid);

  const adCreate = useSelector((state) => state.adCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = adCreate;
  const adUpdate = useSelector((state) => state.adUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = adUpdate;
  const adDelete = useSelector((state) => state.adDelete);
  const {
    loading: delLoading,
    error: delError,
    success: delSuccess,
  } = adDelete;
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
  }, [dispatch, userInfo, filter, delSuccess, createSuccess, updateSuccess]);
  const deletehandler = (id) => {
    if (window.confirm("are you sure delete ad")) {
      // alert(id);
      dispatch(deleteAd(id));
    }
  };
  const [recordForEdit, setRecordForEdit] = useState(null);
  const setOpen = (item) => {
    setShowModal(true);
    setRecordForEdit(item);
  };

  return (
    <>
      {createLoading ? (
        <Loader />
      ) : createError ? (
        <Message varaint="danger">{createError}</Message>
      ) : createSuccess ? (
        <Message variant="success">ad added successfuly</Message>
      ) : (
        <></>
      )}
      {updateLoading ? (
        <Loader />
      ) : updateError ? (
        <Message varaint="danger">{`${updateError}`}</Message>
      ) : updateSuccess ? (
        <Message variant="success">ad updated successfuly</Message>
      ) : (
        <></>
      )}
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
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th> Category</th>
                    <th> Price</th>
                    <th> Location</th>
                  </tr>
                </thead>
                <tbody>
                  {ads.map((v, i) => (
                    <tr key={i}>
                      <td> {v.name}</td>
                      <td> {v.category}</td>
                      <td> {v.price}</td>
                      <td> {v.city}</td>
                      <td>
                        <Image
                          src={v.images[0]}
                          fluid
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/ad/${v.id}?redirect=myads`}
                          className="btn btn-info btn-sm"
                        >
                          details
                          <i className="fa fa-eye"></i>
                        </Link>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setOpen(v)}
                        >
                          <i className="fa fa-edit"></i>
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deletehandler(v.id, v)}
                        >
                          <i className="fa fa-close"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>

            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              title="Ad details"
            >
              <AdForm
                recordForEdit={recordForEdit}
                userId={userInfo.uid}
                close={() => {
                  setShowModal(false);
                }}
              />
            </Modal>
          </Container>
        </>
      )}
    </>
  );
};

export default MyAds;
