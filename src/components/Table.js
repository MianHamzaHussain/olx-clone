import React from "react";

import { Link } from "react-router-dom";
import { Table as BTable, Image, Button } from "react-bootstrap";

const Table = ({ head, data, deleteAd, setOpen }) => {
  return (
    <BTable responsive hover striped>
      <thead>
        <tr>{head ? head.map((v) => <th>{v}</th>) : <th> </th>}</tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((v, i) => (
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
                <Link to={`/ad/${v.id}`} className="btn btn-info btn-sm">
                  Preview
                </Link>
                <Button variant="primary" size="sm" onClick={() => setOpen(v)}>
                  <i className="fa fa-edit"></i>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteAd(v.id, data)}
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
  );
};

export default Table;
