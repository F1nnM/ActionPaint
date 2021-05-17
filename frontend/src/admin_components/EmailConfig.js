import styles from "./EmailConfig.module.scss";
import { Table, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toPascalCaseWithWhiteSpace } from "../frontendUtils";

function EmailConfig({ creds }) {
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
  }, []);

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
        document.querySelector("#MAIL_PASS").value = "****";
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
            <tr>
              <td>
                <Form.Control
                  defaultValue={toPascalCaseWithWhiteSpace(entry)}
                  readOnly
                />
              </td>
              <td>
                <Form.Control
                  id={entry}
                  type={entry === "MAIL_PASS" ? "password" : ""}
                  defaultValue={email[entry]}
                  key={email[entry]}
                  onChange={(e) => handleUpdateValue(e.target.value, entry)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className={styles.saveChanges}>
              <Button variant="success" onClick={() => handleUpdateSubmit()}>
                Save Changes
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default EmailConfig;
