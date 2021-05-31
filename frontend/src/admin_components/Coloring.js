import { Button, Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { toPascalCaseWithWhiteSpace } from "../frontendUtils";
import { ChromePicker } from "react-color";

function Coloring({ data, creds }) {
  const [style, setStyle] = useState(data.style);

  function handleUpdateValue(value, entry) {
    style[entry] = value;
    setStyle({ ...style });
  }

  function colorDragComplete(value, entry) {
    // will be triggered each time picker has been set
    console.log(value);

    value.rgb.a = "1"; // sets alpha to 1, user should not be able to set an rgba value, as hex cannot represent it
    handleUpdateValue(value.hex, entry);
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
      body: JSON.stringify(style),
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
      <Row>
        {Object.keys(style).map((entry) => (
          <Col className="mb-4" sm={6} lg={4} key={entry}>
            <Card>
              <Card.Header>{toPascalCaseWithWhiteSpace(entry)}</Card.Header>
              <Card.Body>
                <ChromePicker
                  color={style[entry]}
                  onChangeComplete={(color) => colorDragComplete(color, entry)}
                  onChange={(color) => handleUpdateValue(color.hex, entry)}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button
        variant="success"
        className="mt-4"
        onClick={() => handleUpdateSubmit()}
      >
        Save Changes
      </Button>
    </>
  );
}

export default Coloring;
