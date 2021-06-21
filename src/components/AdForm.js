import React, { useState, useEffect } from "react";

import { Form, Button, ProgressBar } from "react-bootstrap";
import { storage } from "../config/firebase";
import { createAd, updateAd } from "../store/actions/adActions";
import { useDispatch } from "react-redux";
const AdForm = ({ recordForEdit, userId, close }) => {
  const [ReImages, setReImages] = useState(null);
  const [images, setImages] = useState([]);
  const [urls, setURLS] = useState([]);

  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const initial = {
    id: 0,
    uid: userId,
    name: "",
    category: "",
    price: 0,
    description: "",
    city: "",
    condition: "used",
  };
  const [values, setValues] = useState(initial);

  const changehandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    for (let index = 0; index < e.target.files.length; index++) {
      const newImage = e.target.files[index];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };
  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        id: recordForEdit.id,
        name: recordForEdit.name,

        uid: recordForEdit.uid,
        price: recordForEdit.price,
        description: recordForEdit.description,
        city: recordForEdit.city,
        condition: recordForEdit.condition,
        category: recordForEdit.category,
      });
      setReImages(recordForEdit.images);
    }
  }, [recordForEdit]);

  const handleUpload = () => {
    images.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => console.log("error block==", error),
        async () => {
          try {
            const url = await storage
              .ref("images")
              .child(image.name)
              .getDownloadURL();
            // console.log("url", url);
            setURLS((prevState) => [...prevState, url]);
          } catch (error) {
            console.log("getting download error", error);
          }
        }
      );
    });
  };
  // console.log(urls);

  const submithandler = (e) => {
    e.preventDefault();

    if (values.id === 0) {
      if (urls.length > 0) {
        dispatch(createAd({ ...values, images: urls }));
        close();
      } else {
        alert("please upload atleast single photo of product");
      }
    } else {
      if (urls.length > 0) {
        dispatch(updateAd({ ...values, images: urls }));
      } else {
        dispatch(updateAd({ ...values, images: ReImages }));
      }
      close();
    }
  };
  return (
    <Form>
      <Form.Group className="mt-3" controlId="Title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          name="name"
          value={values.name}
          onChange={changehandler}
        />
      </Form.Group>
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={values.category}
          onChange={changehandler}
        >
          <option value=""> Select </option>
          <option value="cars">Cars</option>
          <option value="houses"> Houses</option>
          <option value="mobiles">Mobiles</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="Title">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Price"
          name="price"
          value={values.price}
          onChange={changehandler}
        />
      </Form.Group>
      <Form.Group controlId="images" className="my-3">
        <Form.Label>Select Images</Form.Label>
        <ProgressBar
          animated
          min="0"
          now={progress}
          label={`${progress}%`}
          max="100"
        />
        <Form.Control
          type="file"
          multiple
          name="images"
          size="md"
          onChange={handleFileChange}
        />
        <Button onClick={handleUpload}>Upload</Button>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={values.description}
          onChange={changehandler}
        />
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          as="select"
          name="city"
          value={values.city}
          onChange={changehandler}
        >
          <option value=""> Select </option>
          <option value="Faisalabad">Faisalabad</option>
          <option value="Lahore"> Lahore</option>
          <option value="Karachi">Karachi</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <label> Condition</label>
        <div>
          <Form.Check
            inline
            label="Used"
            name="condition"
            type="radio"
            id={`used`}
            value="used"
            checked={values.condition === "used"}
            onChange={changehandler}
          />
          <Form.Check
            inline
            label="New"
            name="condition"
            type="radio"
            id={`new`}
            value="new"
            checked={values.condition === "new"}
            onChange={changehandler}
          />
        </div>
      </Form.Group>
      <Form.Group controlId="submit" className="my-3">
        <Button onClick={submithandler}>Submit</Button>
      </Form.Group>
    </Form>
  );
};
export default AdForm;
