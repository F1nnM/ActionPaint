import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Logos.module.scss";

function Logos({ creds, reloadInterface }) {

  const [imageKey, setImageKey] = useState(Date.now());

  const logos = [
    {
      "title": "Animated SVG logo",
      "description": "Check the default logo to see how to animate a svg",
      "type": "logo_animated",
      "file": "logo_animated.svg",
      "tag": "object"
    },
    {
      "title": "Static SVG logo",
      "type": "logo_static",
      "file": "logo_static.svg",
      "tag": "object"
    },
    {
      "title": "Large PNG logo",
      "description": "Big logo for link preview and shortcuts, make sure it is 512px by 512 px",
      "type": "logo512",
      "file": "logo512.png",
      "tag": "img"
    },
    {
      "title": "Small PNG logo",
      "description": "Smaller logo for shortcuts, make sure it is 192px by 192px",
      "type": "logo192",
      "file": "logo192.png",
      "tag": "img"
    },
    {
      "title": "Favicon",
      "description": "The small icon in tabs, a .ico file",
      "type": "favicon",
      "file": "favicon.ico",
      "tag": "img"
    },
  ]

  function handleUpload(file, type, target) {

    let url = process.env.REACT_APP_BACKEND + "admin/upload_image/" + type;

    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password),
    );

    var formData = new FormData();
    formData.append('images', file, file.name);

    fetch(url, {
      method: "POST",
      headers,
      body: formData
    })
      .catch(err => alert(err))
      .then(data => {
        setImageKey(Date.now())
        target.value = "";
      })
  }

  return (
    <Container>
      <Row>
        {logos.map(logo => (
          <Col md={6} xl={3} className="d-flex flex-column pb-5" key={logo.title}>
            <div className="flex-grow-1">
              <h3>{logo.title}</h3>
              {logo.description}
            </div>
            <div>
              {logo.tag === "img" &&
                <img key={imageKey} alt={logo} className={styles.image + " my-3"} src={process.env.REACT_APP_BACKEND + "images/" + logo.file + "?" + imageKey} />
              }
              {logo.tag === "object" &&
                <object key={imageKey} className={styles.image + " my-3"} type="image/svg+xml" data={process.env.REACT_APP_BACKEND + "images/" + logo.file + "?" + imageKey}>
                  <img key={imageKey} src={process.env.REACT_APP_BACKEND + "images/" + logo.file + "?" + imageKey} alt="Logo" />
                </object>
              }
            </div>
            <div className="py-3">
              <a href={process.env.REACT_APP_BACKEND + "images/" + logo.file} download={logo.file} target="_blank" rel="noreferrer">Download current file</a>
            </div>
            <div>
              <span>Upload new file:</span>
              <input accept={logo.type==="favicon" ? ".ico" : logo.tag === "img" ? ".png": ".svg"} type="file" className="w-100" onChange={e => handleUpload(e.target.files[0], logo.type, e.target)} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Logos;
