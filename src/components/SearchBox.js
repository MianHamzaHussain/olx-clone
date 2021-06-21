import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline className="navForm">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Find cars Mobiles and many more"
        className="ml-sm-2 search"
      />
      <Button
        type="submit"
        variant="dark"
        style={{ display: "inline", height: "3rem", marginLeft: "1px" }}
      >
        <i className="fa fa-search" aria-hidden="true"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
