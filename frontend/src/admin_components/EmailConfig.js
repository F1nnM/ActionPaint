import styles from "./EmailConfig.module.scss";
import { Table, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

function EmailConfig({ creds, discardChanges }) {
  const [email, setEmail] = useState({});

  useEffect(() => {
    let url = process.env.REACT_APP_BACKEND + "admin/mailconfig";
    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((data) => data.json())
      .catch((err) => alert(err))
      .then((data) => {
        setEmail(data);
      })
      .catch((err) => alert(err));
  }, [creds]);

  function handleUpdateValue(value, entry) {
    email[entry] = value;
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/mail";
    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(email),
      }),
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
        document.querySelector("#mailPass").value = "****";
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(email).map((entry) => (
            /*  Iterate over mail.json and create a ReadOnly Field for the Key Element and a Editable Value Field for the Content.
                The Password is a dummy Value and will be again overwritten by one after Submitting aswell */
            <tr key={entry}>
              <td>
                <Form.Control defaultValue={entry} readOnly />
              </td>
              <td>
                <Form.Control
                  id={entry}
                  type={entry === "mailPass" ? "password" : ""}
                  autocomplete={entry === "mailPass" ? "off" : "on"}
                  defaultValue={email[entry]}
                  key={email[entry]}
                  onChange={(e) => handleUpdateValue(e.target.value, entry)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className={styles.saveChanges}>
              <Button
                variant="success"
                className="mr-3"
                onClick={() => handleUpdateSubmit()}
              >
                Save Changes
              </Button>
              <Button variant="warning" onClick={discardChanges}>
                Discard Changes
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default EmailConfig;
