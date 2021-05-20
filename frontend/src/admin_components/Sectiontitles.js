import styles from "./Sectiontitles.module.scss";
import { Table, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { toPascalCaseWithWhiteSpace } from "../frontendUtils";

function Sectiontitles({ data, creds, discardChanges, reloadInterface }) {
  const [titles, setTitles] = useState(data.sections);

  function handleUpdateValue(value, entry) {
    setTitles({ ...titles, [entry]: value });
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/sections";
    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(titles)
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
        reloadInterface();
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  /*  Create a Table with every titled section on the main page and made their shown titles editable.
      The changes will be instantly applied after submitting in:
        - The Adminsection
        - The Navbar
        - The Component itself */
  return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Section</th>
            <th>Title displayed on Website</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(titles).map((entry) => (
            <tr key={entry}>
              <td width="30%">
                <Form.Control
                  defaultValue={toPascalCaseWithWhiteSpace(entry)}
                  readOnly
                />
              </td>
              <td>
                <Form.Control
                  id={entry}
                  defaultValue={titles[entry]}
                  key={titles[entry]}
                  onBlur={(e) => handleUpdateValue(e.target.value, entry)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className={styles.saveChanges}>
              <Button variant="success" className="mr-3 my-2" onClick={() => handleUpdateSubmit()}>
                Save Changes
              </Button>
              <Button variant="warning" className="my-2" onClick={discardChanges}>
                Discard Changes
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
  );
}

export default Sectiontitles;
