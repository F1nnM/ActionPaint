import styles from "./WhatWeDo.module.scss";
import { Table, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function WhatWeDo({ data, creds }) {
  const [aboutUs, setAboutUs] = useState(data.about);
  const [questionInput, setQuestionInput] = useState(null);
  const [answerInput, SetAnswerInput] = useState(null);
  let headers = new Headers();

  headers.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headers.append("Content-Type", "application/json");

  function handleUpdateDescription(value) {
    aboutUs.info = value;
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/about";
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(aboutUs),
      }),
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="ControlTextarea1">
                <Form.Label>Info</Form.Label>
                <Form.Control
                  required
                  size="lg"
                  as="textarea"
                  placeholder="Description"
                  defaultValue={aboutUs.info}
                  onInput={(e) => handleUpdateDescription(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={() => handleUpdateSubmit()}>
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default WhatWeDo;
