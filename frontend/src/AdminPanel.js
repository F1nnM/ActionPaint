import NavFrame from "./admin_components/NavFrame";
import FAQ from "./admin_components/FAQ";
import Button from "react-bootstrap/Button";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";

import styles from "./AdminPanel.module.css"

function AdminPanel({ switchToWeb }) {

  const [credentials, setCredentials] = useState({});
  const [usernameInput, setUsernameInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);

  function tryLogin() {
    let url = process.env.REACT_APP_BACKEND + "admin";

    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + btoa(usernameInput + ":" + passwordInput));

    fetch(url, {
      method: "GET",
      headers
    })
      .then((res) => {
        if (res.ok) {
          setCredentials({ username: usernameInput, password: passwordInput })
        } else {
          throw new Error("Not authorized");
        }
      })
      .catch((err) => {
        alert(err)
      })
  }

  if (!credentials.username || !credentials.password)
    return (
      <Container>
        <Row>
          <Col className={styles.height100 + " d-flex justify-content-center"}>
            <Form className="d-flex flex-column justify-content-center" action={null}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="user" placeholder="Username" onInput={e => setUsernameInput(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="ControlTextarea1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onInput={e => setPasswordInput(e.target.value)} />
              </Form.Group>
              <Button variant="primary" onClick={tryLogin}>
                Log In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );

  const tabs = [
    {
      label: "FAQ",
      component: <FAQ />,
    },
    {
      label: "Test",
      component: <p>Some other HTML</p>,
    },
    {
      label: "Go back",
      component: (
          <Button onClick={switchToWeb}>Logout</Button>
      ),
    },
  ];
  return (
      <NavFrame tabs={tabs}></NavFrame>
  );
}

export default AdminPanel;
