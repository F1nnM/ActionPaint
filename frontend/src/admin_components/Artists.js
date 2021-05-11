import styles from "./Artists.module.scss";
import {
  Table,
  Button,
  Col,
  Container,
  Form,
  Row,
  Modal,
  Card,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import FileSelector from "./FileSelector";
import Tab from "react-bootstrap/Tab";
import { Delete, Add } from "@material-ui/icons";
import { useState } from "react";
// import FileSelector from "./FileSelector";

function Artists({ data, creds }) {
  const [aboutUs, setAboutUs] = useState(data.artists);
  const [showImageSelect, setShowImageSelect] = useState("false");
  const [currentArtist, setCurrentArtist] = useState(null);
  let headers = new Headers();

  const allProps = ["firstName", "lastName", "images", "mail", "desc"];
  // could have it been solved like in AboutUs.js, but unneccesary processing time!

  const freshMember = () => {
    var obj = {};
    allProps.forEach((p) => {
      obj[p] = "";
    });
    return obj;
  };

  const artistNames = aboutUs.map((a) => (
    <>
      <span class="mr-1">{a.firstName}</span>
      <span>
        <strong>{a.lastName}</strong>
      </span>
    </>
  ));

  const toPascalCaseWithWhiteSpace = (
    str // ref: https://javascript.plainenglish.io/convert-string-to-different-case-styles-snake-kebab-camel-and-pascal-case-in-javascript-da724b7220d7
  ) =>
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .map((y) => y.charAt(0).toUpperCase() + y.substr(1).toLowerCase())
      .join(" ");

  const [newMember, setNewMember] = useState(freshMember());

  headers.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headers.append("Content-Type", "application/json");

  function discardChanges() {
    if (window.confirm("Do you want to revert all your changes?")) {
      setAboutUs({
        ...data,
      });

      setNewMember({
        ...freshMember(),
      });
    }
  }

  function handleUpdateProp(key, value, idx) {
    aboutUs[idx][key] = value;
  }

  function handleNewMember(key, value) {
    newMember[key] = value;
  }

  function handleDelete(idx) {
    aboutUs.splice(idx);
    setAboutUs({
      ...aboutUs,
    });
  }

  function handleAdd() {
    aboutUs.push(newMember);
    setAboutUs({
      ...aboutUs,
    });
    setNewMember({
      ...freshMember(),
    });
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/artists";
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(aboutUs),
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

  function selectImage(url, id) {
    alert(url + id);
    setShowImageSelect(false);
    var member = aboutUs.find((e) => e.id === id);
    console.log(member);
    member.imageUrl = url;
    setAboutUs({
      ...aboutUs,
    });
  }

  return (
    <>
      <Row>
        <Col>
          <Tab.Container
            id="list-group-tabs-example"
            defaultActiveKey={"#" + 0}
          >
            <Row>
              <Col>
                <ListGroup variant="flush">
                  {aboutUs.map((a, idx) => (
                    <ListGroup.Item
                      active={a === currentArtist}
                      action
                      onClick={(_) => setCurrentArtist(a)}
                    >
                      <span class="mr-1">{a.firstName}</span>
                      <span>
                        <strong>{a.lastName}</strong>
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col>
                <Tab.Content>
                  <Container>
                    {currentArtist && (
                      <>
                        <Row>
                          <Col>
                            <Card>
                              <Row>
                                <Col>
                                  <Card.Body>
                                    <Card.Title>
                                      <Row>
                                        <Col>
                                          <span class="mr-1">
                                            <Form.Control
                                              defaultValue={
                                                currentArtist.firstName
                                              }
                                              onInput={(e) =>
                                                handleUpdateProp(
                                                  "firstName",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </span>
                                        </Col>
                                        <Col>
                                          <span>
                                            <Form.Control
                                              defaultValue={
                                                currentArtist.lastName
                                              }
                                              onInput={(e) =>
                                                handleUpdateProp(
                                                  "lastName",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </span>
                                        </Col>
                                      </Row>
                                    </Card.Title>
                                    <Card.Text>
                                      <Form.Control
                                        defaultValue={currentArtist.desc}
                                        onInput={(e) =>
                                          handleUpdateProp(
                                            "desc",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </Card.Text>
                                  </Card.Body>
                                </Col>
                                <Col>
                                  <FileSelector
                                    type="artist"
                                    creds={creds}
                                    onSelect={(val) => alert(val)}
                                  />
                                </Col>
                              </Row>

                              <Card.Footer>
                                <small className="text-muted">
                                  <Button
                                    size="sm"
                                    variant="outline-dark"
                                    href={"mailto:" + currentArtist.mail}
                                  >
                                    {currentArtist.mail}
                                  </Button>
                                </small>
                              </Card.Footer>
                            </Card>
                          </Col>
                          <Col>Lorem</Col>
                        </Row>
                      </>
                    )}
                  </Container>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
        <Col></Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            {allProps.map((prop) => (
              <th key={prop} style={{ textTransform: "capitalize" }}>
                {toPascalCaseWithWhiteSpace(prop)}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {aboutUs.map((entry, idx) => (
            <tr>
              {allProps.map((prop, propIdx) =>
                prop === "imageUrl" ? (
                  <>
                    <span>{entry[prop] + entry.id}</span>
                    {/* <Button
                      variant="info"
                      onClick={(_) => setShowImageSelect(true)}
                    >
                      Change
                    </Button>
                    <Modal show={showImageSelect}>
                      <Modal.Header
                        closeButton
                        onClick={(_) => setShowImageSelect(false)}
                      >
                        <Modal.Title>Choose an image</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <FileSelector
                          type="artist"
                          creds={creds}
                          onSelect={(val) => selectImage(val, entry.id)}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <p>Click on an image to select</p>
                      </Modal.Footer>
                    </Modal> */}
                  </>
                ) : (
                  <td key={prop}>
                    <Form.Control
                      as={prop === "desc" ? "textarea" : "input"}
                      rows={3}
                      defaultValue={entry[prop]}
                      onInput={(e) =>
                        handleUpdateProp(prop, e.target.value, idx)
                      }
                    />
                  </td>
                )
              )}

              <td>
                <Button variant="danger" onClick={() => handleDelete(idx)}>
                  <Delete />
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            {allProps.map((prop) => (
              <td key={prop}>
                <Form.Control
                  defaultValue={""}
                  onInput={(e) => handleNewMember(prop, e.target.value)}
                />
              </td>
            ))}

            <td>
              <Button variant="success" onClick={() => handleAdd()}>
                <Add />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <hr />
      <span className={"mr-4 " + styles.discardChanges}>
        <Button variant="warning" onClick={() => discardChanges()}>
          Discard Changes
        </Button>
      </span>
      <span className={styles.saveChanges}>
        <Button variant="success" onClick={() => handleUpdateSubmit()}>
          Save Changes
        </Button>
      </span>
    </>
  );
}

export default Artists;
