import NavFrame from "./admin_components/NavFrame";
import FAQ from "./admin_components/FAQ";
import WhatWeDo from "./admin_components/WhatWeDo";
import AboutUs from "./admin_components/AboutUs";
import EmailConfig from "./admin_components/EmailConfig";
import Artists from "./admin_components/Artists";
import Titlescreen from "./admin_components/Titlescreen";
import Sectiontitles from "./admin_components/Sectiontitles";
import Button from "react-bootstrap/Button";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

import styles from "./AdminPanel.module.css";
import Logos from "./admin_components/Logos";

function AdminPanel({ switchToWeb }) {
  const [credentials, setCredentials] = useState({});
  const [usernameInput, setUsernameInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);
  const [data, setData] = useState(null);

  function fetchContent() {
    fetch(process.env.REACT_APP_BACKEND + "content")
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    fetchContent();
  }, []);

  function tryLogin(e) {
    e.preventDefault();
    let url = process.env.REACT_APP_BACKEND + "admin";

    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(usernameInput + ":" + passwordInput)
    );

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((res) => {
        if (res.ok) {
          setCredentials({ username: usernameInput, password: passwordInput });
        } else {
          throw new Error("Not authorized");
        }
      })
      .catch((err) => {
        alert("Login failed");
        console.warn(err);
      });
  }

  if (!credentials.username || !credentials.password)
    return (
      <Container>
        <Row>
          <Col className={styles.height100 + " d-flex justify-content-center"}>
            <Form
              className="d-flex flex-column justify-content-center"
              action={null}
              onSubmit={tryLogin}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="user"
                  autoFocus={true}
                  placeholder="Username"
                  onInput={(e) => setUsernameInput(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="ControlTextarea1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onInput={(e) => setPasswordInput(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={tryLogin}>
                Log In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );

  const tabs = [
    {
      label: data.sections["Our Artists"],
      component: <Artists data={data} creds={credentials} />,
    },
    {
      label: data.sections["About Us"],
      component: <AboutUs data={data} creds={credentials} />,
    },
    {
      label: data.sections["What We Do"],
      component: <WhatWeDo data={data} creds={credentials} />,
    },
    {
      label: data.sections["FAQ"],
      component: <FAQ data={data} creds={credentials} />,
    },
    {
      label: data.sections["Contact Us"] + " / Mail-Config",
      component: <EmailConfig creds={credentials} />,
    },
    {
      label: "Logos",
      component: <Logos data={data} creds={credentials}/>,
    },
    {
      label: "Brand(ing)",
      component: <Titlescreen data={data} creds={credentials} />,
    },
    {
      label: "Section Titles",
      component: (
        <Sectiontitles
          fetchContent={fetchContent}
          data={data}
          creds={credentials}
        />
      ),
    },
    {
      label: "Go back",
      component: <Button onClick={switchToWeb}>Logout</Button>,
    },
  ];

  return <NavFrame tabs={tabs} data={data} goBack={switchToWeb}></NavFrame>;
}

export default AdminPanel;
