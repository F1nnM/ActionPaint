import styles from "./PrivacyPolicy.module.scss";
import { Container, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

function PrivacyPolicy({ data, creds }) {
  const [policy, setPolicy] = useState(data.privacy_policy.text);

  function handleUpdateValue(value) {
    setPolicy(value);
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/privacy_policy";
    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + btoa(creds.username + ":" + creds.password));
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        text: JSON.stringify(policy),
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
    {/* Create a editable textarea to change the privacy policy on the main page instantly after submitting */}
    <Container>
      <Form.Control className={styles.policyForm} as="textarea" defaultValue={policy} key={12345} onChange={e => handleUpdateValue(e.target.value)} />
        <Button variant="success" onClick={() => handleUpdateSubmit()}>
          Save Changes
        </Button>
    </Container>
    </>
  );
}

export default PrivacyPolicy;
