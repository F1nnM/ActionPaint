import { Button, Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { toPascalCaseWithWhiteSpace } from "../frontendUtils";
import { ChromePicker } from "react-color";

function Coloring({ data, creds }) {
  const [style, setStyle] = useState(data.style);

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
      .catch((err) => {
        alert(`An error occured: ${err}`)
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
                  disableAlpha
                  color={style[entry]}
                  onChange={(color) => setStyle({ ...style, [entry]: color.hex })}
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
