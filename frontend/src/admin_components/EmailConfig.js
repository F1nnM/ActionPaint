import styles from "./EmailConfig.module.scss";
import { Table, Button, Form } from "react-bootstrap";

function EmailConfig({ creds, discardChanges, emailData }) {

  function handleUpdateValue(value, entry) {
    emailData[entry] = value;
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
      body: JSON.stringify(emailData),
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
  
  if(!emailData)
    return <span>Email Data loading</span>

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
