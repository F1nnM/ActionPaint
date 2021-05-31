import { Table, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { toPascalCaseWithWhiteSpace } from "../frontendUtils";

function Branding({ data, creds, discardChanges }) {
  const [branding, setBranding] = useState(data.brand);

  function handleUpdateValue(value, entry) {
    setBranding({...branding, [value]: entry})
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/brand";
    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(branding),
    };
    fetch(url, options)
      .catch((err) => {
        alert(`An error occured: ${err}`)
      });
  }

  return (
    <>
      {/* Create a table with all branding information by iterating over brand.json 
        the changes will applied instantly on main page 
        */}

      <Table bordered hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(branding).map((entry) => (
            <tr key={entry}>
              <td width="20%">
                <Form.Control
                  defaultValue={toPascalCaseWithWhiteSpace(entry)}
                  readOnly
                />
              </td>
              <td>
                <Form.Control
                  id={entry}
                  defaultValue={branding[entry]}
                  key={branding[entry]}
                  onChange={(e) => handleUpdateValue(e.target.value, entry)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="success"
        className="mr-2"
        onClick={() => handleUpdateSubmit()}
      >
        Save Changes
      </Button>
      <Button variant="outline-danger" onClick={discardChanges}>
        Discard Changes
      </Button>
    </>
  );
}

export default Branding;
