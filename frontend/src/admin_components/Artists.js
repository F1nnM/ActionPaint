import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import FileSelector from "./FileSelector";
import Tab from "react-bootstrap/Tab";
import { Delete, Add } from "@material-ui/icons";
import { useState } from "react";

function Artists({ data, creds }) {
  const initialData = data.artists;
  const [artistData, setArtistData] = useState({ artists: initialData, selectedArtistIndex: 0 });
  const [toBeDeleted, setToBeDeleted] = useState([]);

  const allProps = [...Object.keys(artistData.artists[0])];

  const generateFreshArtist = () => {
    let obj = Object.fromEntries(allProps.map(prop => [prop, null]));
    obj["isNew"] = true;
    return obj;
  }


  let headers = new Headers();
  headers.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headers.append("Content-Type", "application/json");

  function handleUpdateProp(key, value, index) {
    let newArtists = [...artistData.artists]
    newArtists[index][key] = value;
    setArtistData({ ...artistData, artists: newArtists });
  }

  function handleDelete(e, index, artName) {
    e.stopPropagation()
    if (window.confirm("Do you really want to delete " + artName + "?")) {
      if (artistData.artists[index].images)
        setToBeDeleted([...toBeDeleted, ...artistData.artists[index].images])

      let newArtists = [...artistData.artists]
      newArtists.splice(index, 1);

      if (newArtists.length === 0)
        newArtists.push(generateFreshArtist());

      setArtistData({ artists: newArtists, selectedArtistIndex: 0 })
    }
  }

  function handleAdd() {
    setArtistData({ artists: [...artistData.artists, generateFreshArtist()], selectedArtistIndex: artistData.artists.length })
  }

  function handleUpdateSubmit() {

    // strip artists of their isNew tag
    let strippedArtists = artistData.artists.map(artist => {
      let strippedArtist = { ...artist };
      if (strippedArtist.isNew) {
        delete strippedArtist["isNew"];
        strippedArtist.images = [];
      }
      return strippedArtist;
    })

    const url = process.env.REACT_APP_BACKEND + "admin/update/artists";
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(strippedArtists),
    };
    fetch(url, options)
      .then(()=> {
        setArtistData({artists: strippedArtists, selectedArtistIndex: 0});
      })
      .catch((err) => {
        alert(`An error occured: ${err}`);
      });

    toBeDeleted.forEach((element) => {
      handleDeleteImage(element);
    });

  }

  function handleDeleteImage(src) {
    let url =
      process.env.REACT_APP_BACKEND + "admin/delete_image/artist/" + src;

    fetch(url, {
      method: "DELETE",
      headers,
    })
      .catch((err) => alert(err));
  }

  return (
    <Tab.Container defaultActiveKey={"#" + 0}>
      <Row>
        <Col sm={2}>
          <ListGroup variant="flush">
            {artistData.artists.map((a, index) => (
              <ListGroup.Item
                active={a === artistData.selectedArtistIndex}
                action
                onClick={() => setArtistData({ ...artistData, selectedArtistIndex: index })}
                key={index}
              >
                <div>
                  <span className="mr-1">{a.firstName}</span>
                  <span>
                    <strong>{a.lastName}</strong>
                  </span>
                  <Button
                    variant="outline-danger"
                    size="xs"
                    className="ml-3"
                    onClick={(e) => handleDelete(e, index, a.firstName)}
                  >
                    <Delete />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => handleAdd()}
              >
                <Add />
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Tab.Content>
            <Container>
              {artistData.artists[artistData.selectedArtistIndex] &&
                <Row key={artistData.artists[artistData.selectedArtistIndex].lastName}>
                  <Col>
                    <Card>
                      <Card.Header>
                        <Card.Title>
                          <Row>
                            <Col>
                              <span className="mr-1">
                                <Form.Control
                                  defaultValue={artistData.artists[artistData.selectedArtistIndex].firstName}
                                  onBlur={(e) =>
                                    handleUpdateProp(
                                      "firstName",
                                      e.target.value,
                                      artistData.selectedArtistIndex
                                    )
                                  }
                                />
                              </span>
                            </Col>
                            <Col>
                              <span>
                                <Form.Control
                                  defaultValue={artistData.artists[artistData.selectedArtistIndex].lastName}
                                  onBlur={(e) =>
                                    handleUpdateProp(
                                      "lastName",
                                      e.target.value,
                                      artistData.selectedArtistIndex
                                    )
                                  }
                                />
                              </span>
                            </Col>
                          </Row>
                        </Card.Title>
                        <Card.Text>
                          <Form.Control
                            defaultValue={artistData.artists[artistData.selectedArtistIndex].desc}
                            as="textarea"
                            rows={4}
                            onBlur={(e) =>
                              handleUpdateProp(
                                "desc",
                                e.target.value,
                                artistData.selectedArtistIndex
                              )
                            }
                          />
                        </Card.Text>
                      </Card.Header>

                      <Card.Body>
                        {artistData.artists[artistData.selectedArtistIndex].isNew ? (
                          "Please submit the artist before uploading any pictures"
                        ) : (
                          <FileSelector
                            type="artist"
                            creds={creds}
                            onSelect={(val) => alert(val)}
                            artist={artistData.artists[artistData.selectedArtistIndex]}
                            data={artistData.artists}
                            index={artistData.selectedArtistIndex}
                          />
                        )}
                      </Card.Body>

                      <Card.Footer>
                        <small className="text-muted">
                          <Row>
                            <Col>
                              <Form.Control
                                defaultValue={artistData.artists[artistData.selectedArtistIndex].mail}
                                onBlur={(e) =>
                                  handleUpdateProp(
                                    "mail",
                                    e.target.value,
                                    artistData.selectedArtistIndex
                                  )
                                }
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                defaultValue={artistData.artists[artistData.selectedArtistIndex].instagram}
                                onBlur={(e) =>
                                  handleUpdateProp(
                                    "instagram",
                                    e.target.value,
                                    artistData.selectedArtistIndex
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
              }
            </Container>
          </Tab.Content>
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
    </Tab.Container>
  );
}

export default Artists;
