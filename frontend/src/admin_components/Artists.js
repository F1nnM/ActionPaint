import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import FileSelector from "./FileSelector";
import Tab from "react-bootstrap/Tab";
import { Delete, Add } from "@material-ui/icons";
import { useState } from "react";

function Artists({ data, creds, discardChanges }) {
  const initialData = data.artists;
  const [aboutUs, setAboutUs] = useState(initialData);
  const [showImageSelect, setShowImageSelect] = useState(false); // needed later for modals
  const [currentArtist, setCurrentArtist] = useState(
    aboutUs.length > 0 ? aboutUs[0] : null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toBeDeleted, setToBeDeleted] = useState([]);
  let headers = new Headers();

  const allProps = ["firstName", "lastName", "images", "mail", "desc"];
  // could have it been solved like in AboutUs.js, but unneccesary processing time!

  const freshMember = (() => {
    // same like in AboutUs
    var obj = {};
    allProps.forEach((p) => {
      if(p === "images"){
        obj[p] = [];
      }else{
        obj[p] = "";
      }
    });
    return obj;
  })();

  const [newMember, setNewMember] = useState(freshMember);

  headers.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headers.append("Content-Type", "application/json");

  function setArtistAndIndex(a, idx) {
    if (!a && !idx) {
      // other mode of this func: when neither a oder index make new member
      setCurrentArtist(freshMember);
    } else {
      setCurrentArtist(a);
      setCurrentIndex(idx);
    }
  }

  function handleUpdateProp(key, value, idx) {
    if (idx === null) {
      newMember[key] = value;
    } else {
      aboutUs[idx][key] = value;
    }
  }

  /*function handleNewMember(key, value) {
    newMember[key] = value;
  }*/

  function handleDelete(idx, artName) {
    if (window.confirm("Do you really want to delete " + artName + "?")) {
      var tmpToBeDeletedImages = [];

      aboutUs[idx].images.forEach(element => {
        tmpToBeDeletedImages.push(element);
      });

      aboutUs.splice(idx);
      setAboutUs([...aboutUs]);
      setCurrentArtist(aboutUs.length > 0 ? aboutUs[0] : freshMember); // when deleting, directly change view to first artist or new member
      setToBeDeleted(toBeDeleted.concat(tmpToBeDeletedImages));
    }
  }

  function handleAdd() {
    aboutUs.push(newMember);
    setAboutUs([...aboutUs]);
    setNewMember({
      ...freshMember,
    });
    setCurrentArtist(freshMember);
    setCurrentIndex(aboutUs.length - 1);
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/artists";
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(aboutUs),
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.warn(err);
      });

      toBeDeleted.forEach(element => {
        handleDeleteImage(element);
      });
  }

  function handleDeleteImage(src) {
    let url = process.env.REACT_APP_BACKEND + "admin/delete_image/artist/"+src;

    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password),
    );

    fetch(url, {
      method: "DELETE",
      headers
    }).catch(err => alert(err))
      .then(data => {
      })
  }

  return (
    <>
      <Tab.Container defaultActiveKey={"#" + 0}>
        <Row>
          <Col sm={2}>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                onClick={(_) => setArtistAndIndex(null, null)}
              >
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={(_) => handleAdd()}
                >
                  <Add />
                </Button>
              </ListGroup.Item>
              {aboutUs.map((a, idx) => (
                <ListGroup.Item
                  active={a === currentArtist}
                  action
                  onClick={(_) => setArtistAndIndex(a, idx)}
                  key={a + idx}
                >
                  <div style={{ alignContent: "space-between" }}>
                    <>
                      <span className="mr-1">{a.firstName}</span>
                      <span>
                        <strong>{a.lastName}</strong>
                      </span>
                    </>
                    <>
                      <Button
                        variant="outline-danger"
                        size="xs"
                        className="ml-3"
                        onClick={(_) => handleDelete(idx, a.firstName)}
                      >
                        <Delete />
                      </Button>
                    </>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <Tab.Content>
              <Container>
                <>
                  <Row key={currentArtist.lastName}>
                    <Col>
                      <Card>
                        <Card.Header>
                          <Card.Title>
                            <Row>
                              <Col>
                                <span className="mr-1">
                                  <Form.Control
                                    defaultValue={currentArtist.firstName}
                                    onInput={(e) =>
                                      handleUpdateProp(
                                        "firstName",
                                        e.target.value,
                                        currentIndex
                                      )
                                    }
                                  />
                                </span>
                              </Col>
                              <Col>
                                <span>
                                  <Form.Control
                                    defaultValue={currentArtist.lastName}
                                    onInput={(e) =>
                                      handleUpdateProp(
                                        "lastName",
                                        e.target.value,
                                        currentIndex
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
                              as="textarea"
                              rows={4}
                              onInput={(e) =>
                                handleUpdateProp(
                                  "desc",
                                  e.target.value,
                                  currentIndex
                                )
                              }
                            />
                          </Card.Text>
                        </Card.Header>

                        <Card.Body>
                          <FileSelector
                            type="artist"
                            creds={creds}
                            onSelect={(val) => alert(val)}
                            artist={currentArtist}
                            data={aboutUs}
                            index={currentIndex}
                          />
                        </Card.Body>

                        <Card.Footer>
                          <small className="text-muted">
                            <Row>
                              <Col>
                                <Form.Control
                                  defaultValue={currentArtist.mail}
                                  onInput={(e) =>
                                    handleUpdateProp(
                                      "mail",
                                      e.target.value,
                                      currentIndex
                                    )
                                  }
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  defaultValue={currentArtist.instagram}
                                  onInput={(e) =>
                                    handleUpdateProp(
                                      "instagram",
                                      e.target.value,
                                      currentIndex
                                    )
                                  }
                                />
                              </Col>
                            </Row>
                          </small>
                        </Card.Footer>
                      </Card>
                    </Col>
                  </Row>
                  <hr />
                  <Button
                    variant="success"
                    className="mr-4"
                    onClick={(_) => handleUpdateSubmit()}
                  >
                    Save changes
                  </Button>
                  <Button variant="warning" onClick={discardChanges}>
                    Discard all changes
                  </Button>
                </>
              </Container>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default Artists;
