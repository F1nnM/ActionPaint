import styles from "./Coloring.module.scss";
import { Table, Button, Form } from "react-bootstrap";
import { useState, Component } from "react";
import { Edit } from "@material-ui/icons";
import { toPascalCaseWithWhiteSpace } from "../frontendUtils";
import { ChromePicker } from "react-color";

function Coloring({ data, creds }) {
  const [style] = useState(data.style);
  /* [color, setColor] = useState({
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    }); */

  const alphaTo100 = () => {
    // will be triggered each time picker has been set
    Object.values(style).forEach((color) => {});
  };

  function handleUpdateValue(value, entry) {
    console.log(value + entry);
    style[entry] = value;
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/style";
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
        content: JSON.stringify(style),
      }),
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
      <div>
        {/* <ChromePicker
          color={color}
          onChange={(color) => console.log(color.hex)}
        /> */}
        <Button variant="primary">SET</Button>
        <br />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(style).map((entry) => (
            <tr>
              <td width="20%">
                <Form.Control
                  defaultValue={toPascalCaseWithWhiteSpace(entry)}
                  readOnly
                />
              </td>
              <td width="20%">
                <ChromePicker
                  color={style[entry]}
                  onChange={(color) => handleUpdateValue(color.hex, entry)}
                />
                {/* <Form.Control
                  id={entry}
                  defaultValue={style[entry]}
                  key={style[entry]}
                  onChange={(e) => handleUpdateValue(e.target.value, entry)}
                /> */}
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={(_) => {
                    /* loadEntry(entry) */ var i = 1;
                  }}
                >
                  <Edit />
                </Button>
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

export default Coloring;
