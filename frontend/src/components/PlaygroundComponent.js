/* import styles from "./ExampleSection.module.css"; */

import React, { useState } from "react";
import { SketchPicker } from "react-color";

function PlaygroundComponent() {
  /* const url = process.env.REACT_APP_BACKEND + "public_api/ping";
  const options = {
    method: "POST",
    body: JSON.stringify({
      name: "John",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      alert(err);
    })
    .then((data) => {
      alert(data.value);
    }); */

  const [displayColorPicker, setDisplay] = useState(false),
    [color, setColor] = useState({
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    });

  const handleClick = () => {
      setDisplay(!displayColorPicker);
    },
    handleClose = () => {
      setDisplay(false);
    },
    handleChange = (color) => {
      setColor(color.rgb);
    };

  return (
    <div>
      <div onClick={handleClick}>{JSON.stringify(color)}</div>
      {displayColorPicker ? (
        <div>
          <div onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

export default PlaygroundComponent;
