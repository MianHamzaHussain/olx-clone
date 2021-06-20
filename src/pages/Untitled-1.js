const MyAds = ({ history }) => {
  const deletehandler = (id, data) => {
    if (window.confirm("are you sure delete ad")) {
      alert(id);
      deleteAd(id, data);
    }
  };
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varaint="danger">{error}</Message>
      ) : (
        <>
          <Container>
            <Row>
              {ads.length > 0 ? (
                // <Table head={Header} data={ads} deleteAd={deletehandler} />
                <BTable responsive hover striped>
                  <thead>
                    <tr>
                      {Header ? Header.map((v) => <th>{v}</th>) : <th> </th>}
                    </tr>
                  </thead>
                  <tbody>
                    {ads.length > 0 ? (
                      ads.map((v, i) => (
                        <tr>
                          <td> {v.name}</td>
                          <td> {v.category}</td>
                          <td> {v.price}</td>
                          <td> {v.city}</td>
                          <td>
                            <Image
                              src={v.images[0]}
                              fluid
                              style={{ width: "30px", height: "30px" }}
                            />
                          </td>
                          <td>
                            <Link
                              to={`/ad/${v.id}`}
                              className="btn btn-info btn-sm"
                            >
                              Preview
                            </Link>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => deletehandler(v.id, ads)}
                            >
                              <i className="fa fa-close"></i>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <td> No record Found</td>
                    )}
                  </tbody>
                </BTable>
              ) : (
                "no result found"
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default MyAds;
