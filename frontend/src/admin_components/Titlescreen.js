import styles from "./WhatWeDo.module.scss";
import { Table, Button, Form } from "react-bootstrap";
import { useState } from "react";

function Titlescreen({ data, creds }) {
  const [brand] = useState(data.brand);

  function handleUpdateValue(value, entry) {
    brand[entry] = value;
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/brand";
    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + btoa(creds.username + ":" + creds.password));
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(brand),
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(brand).map((entry) => (
            <tr>
              <td width="20%"><Form.Control defaultValue={entry.toUpperCase()} readOnly /></td>
              <td width><Form.Control id={entry} type={entry === "MAIL_PASS" ? "password" : ""} defaultValue={brand[entry]} key={brand[entry]} onChange={e => handleUpdateValue(e.target.value, entry)} /></td>
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

export default Titlescreen;
