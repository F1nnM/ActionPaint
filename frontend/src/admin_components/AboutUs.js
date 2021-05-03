import styles from "./WhatWeDo.module.scss";
import { Table, Button, Col, Container, Form, Row } from "react-bootstrap";
import { GitHub, Twitter, Delete } from "@material-ui/icons";
import { useState } from "react";

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

  function handleUpdateInfo(key, value) {
    aboutUs.info = value;
  }

  function handleUpdateProp(key, value, idx) {
    aboutUs.members[idx][key] = value;
  }

  function handleUpdateInfo(value, idx) {
    aboutUs.members[idx].info = value;
  }

  function handleDelete(idx) {
    aboutUs.members.unshift(idx);
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
                  onInput={(e) => handleUpdateInfo(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Info</th>
            <th>
              <GitHub />
            </th>
            <th>
              <Twitter />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {aboutUs.members.map((entry, idx) => (
            <tr>
              {/* <td width="200">
                <Button variant="danger" onClick={() => handleDelete(idx)}>
                  <DeleteIcon />
                </Button>
                <Button
                  className="float-right"
                  variant="primary"
                  onClick={() => handleMoveUp(idx)}
                >
                  <ArrowUpwardIcon />
                </Button>
                <p></p>
                <Button
                  className="float-right"
                  variant="primary"
                  onClick={() => handleMoveDown(idx)}
                >
                  <ArrowDownwardIcon />
                </Button>
              </td> */}
              {["name", "age", "info", "githubName", "twitterName"].map(
                (prop, idx) => (
                  <td>
                    <Form.Control
                      defaultValue={entry[prop]}
                      onInput={(e) =>
                        handleUpdateProp(prop, e.target.value, idx)
                      }
                    />
                  </td>
                )
              )}

              <td>
                <Button variant="danger" onClick={() => handleDelete(idx)}>
                  <Delete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
      <div className={styles.saveChanges}>
        <Button variant="success" onClick={() => handleUpdateSubmit()}>
          Save Changes
        </Button>
      </div>
    </>
  );
}

export default WhatWeDo;
