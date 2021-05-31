import styles from "./EmailConfig.module.scss";
import { Table, Button, Form } from "react-bootstrap";
import { useState } from "react";

function EmailConfig({ creds, discardChanges, emailData }) {

  const [email, setEmail] = useState(emailData);

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
      body: JSON.stringify(emailData),
    };
    fetch(url, options)
      .then((data) => {
        document.querySelector("#mailPass").value = "****";
      })
      .catch((err) => {
        alert(`An error occured: ${err}`)
      });
  }

  if (!emailData) return <span>Email Data loading</span>;

  return (
    <>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(emailData).map((entry) => (
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
                  defaultValue={emailData[entry]}
                  key={emailData[entry]}
                  onChange={(e) => setEmail({...email, [entry]: e.target.value})}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>{" "}
      <Button
        variant="success"
        className="mr-3"
        onClick={() => handleUpdateSubmit()}
      >
        Save Changes
      </Button>
      <Button
        className={styles.discardChanges}
        variant="outline-danger"
        onClick={discardChanges}
      >
        Discard Changes
      </Button>
    </>
  );
}

export default EmailConfig;
