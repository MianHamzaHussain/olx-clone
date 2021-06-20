import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
const Slider = ({ pics }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  pics ? console.log(pics.length) : console.log(pics);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} fade>
      {pics ? (
        pics.map((image, i) => (
          <Carousel.Item>
            <img className="d-block w-100" src={image} alt={`${i}`} />
          </Carousel.Item>
        ))
      ) : (
        <p> pic not found</p>
      )}
    </Carousel>
  );
};

export default Slider;
