import styles from "./PrivacyPolicy.module.scss";
import { Container, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

function PrivacyPolicy({ creds }) {
  const [policy, setPolicy] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/privacyPolicy.txt')
    .then(text => text.text())
    .then(text => setPolicy(text))
  }, []);

  function handleUpdateValue(value) {
    setPolicy(value);
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/privacy";
    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + btoa(creds.username + ":" + creds.password));
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(policy),
      })
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
      <Form.Control className={styles.policyForm} id={12345} as="textarea" defaultValue={policy} key={policy} onChange={e => handleUpdateValue(e.target.value)} />
        <Button variant="success" onClick={() => handleUpdateSubmit()}>
          Save Changes
        </Button>
    </Container>
    </>
  );
}

export default PrivacyPolicy;
