import styles from "./Sectiontitles.module.scss";
import { Table, Button, Form } from "react-bootstrap";
import { useState } from "react";

function Sectiontitles({ fetchContent, data, creds }) {
  const [titles] = useState(data.sections);

  function handleUpdateValue(value, entry) {
    titles[entry] = value;
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/sections";
    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + btoa(creds.username + ":" + creds.password));
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(titles),
      })
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
        fetchContent();
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
            <th>Section</th>
            <th>Title displayed on Website</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(titles).map((entry) => (
            <tr>
              <td width="30%"><Form.Control defaultValue={entry.toUpperCase()} readOnly /></td>
              <td width><Form.Control id={entry} defaultValue={titles[entry]} key={titles[entry]} onChange={e => handleUpdateValue(e.target.value, entry)} /></td>
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

export default Sectiontitles;
