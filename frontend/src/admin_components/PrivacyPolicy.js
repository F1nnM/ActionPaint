import styles from "./PrivacyPolicy.module.scss";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function PrivacyPolicy({ data, creds, discardChanges }) {
  const [policy, setPolicy] = useState(data.privacy_policy.text);

  function handleUpdateValue(value) {
    setPolicy(value);
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/privacy_policy";
    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({ text: policy }),
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
      {/* Create a editable textarea to change the privacy policy on the main page instantly after submitting */}
      <Container>
        <Row className={styles.policyEditor}>
          <Col md={7}>
            <Card>
              <Card.Header>Editor</Card.Header>
              <Card.Body>
                <Form.Control
                  className={styles.editor}
                  as="textarea"
                  defaultValue={policy}
                  key={12345}
                  onChange={(e) => handleUpdateValue(e.target.value)}
                />
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="success"
                  className="mr-3 my-2"
                  onClick={() => handleUpdateSubmit()}
                >
                  Save Changes
                </Button>
                <Button
                  variant="warning"
                  className="my-2"
                  onClick={discardChanges}
                >
                  Discard Changes
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={5}>
            <Card>
              <Card.Header>Preview</Card.Header>
              <Card.Body>
                {" "}
                <ReactMarkdown className={styles.preview}>
                  {policy}
                </ReactMarkdown>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PrivacyPolicy;
