import styles from "./WhatWeDo.module.scss";
import {
  Table,
  Button,
  Col,
  Container,
  Form,
  Row,
  Modal,
} from "react-bootstrap";
import { Delete, Add } from "@material-ui/icons";
import { useState } from "react";
import FileSelector from "./FileSelector";

function AboutUs({ data, creds, discardChanges }) {
  const [aboutUs, setAboutUs] = useState(data.about);
  const [showImageSelect, setShowImageSelect] = useState(false);
  let headers = new Headers();

  const allProps = ((_) => {
    // this function returns all existing props as array without duplicates, e.g. ["name", "age", "info", "githubName", "twitterName"]
    var props = ["name", "age", "info"];
    aboutUs.members.forEach((mem) => {
      props = [...props, ...Object.keys(mem)];
    });
    props = [...new Set(props)]; // set removes duplicates, and ... converts it back to array
    props = props.filter((p) => p !== "id"); // id should be hidden
    return props;
  })();

  const freshMember = (() => {
    // returns an object containing the union set of all properties of all already stored persons
    var obj = {};
    allProps.forEach((p) => {
      obj[p] = "";
    });
    return obj;
  })();

  const [newMember, setNewMember] = useState(freshMember);

  headers.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headers.append("Content-Type", "application/json");

  function handleUpdateTeamInfo(value) {
    aboutUs.info = value;
  }

  function handleUpdateProp(key, value, idx) {
    aboutUs.members[idx][key] = value;
  }

  function handleNewMember(key, value) {
    newMember[key] = value;
  }

  function handleDelete(idx) {
    aboutUs.members.splice(idx);
    setAboutUs({
      ...aboutUs,
    });
  }

  function handleAdd() {
    aboutUs.members.push(newMember);
    setAboutUs({
      ...aboutUs,
    });
    setNewMember({
      ...freshMember,
    });
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/about";
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
    setShowImageSelect(false);
    var member = aboutUs.members.find((e) => e.id === id); // first find matching member the url is supposed to be attached to
    member.imageUrl = url;
    setAboutUs({
      ...aboutUs,
    });
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Info</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={10}
                  placeholder="Description"
                  defaultValue={aboutUs.info}
                  onInput={(e) => handleUpdateTeamInfo(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <FileSelector
              type="team"
              creds={creds}
              onSelect={(val) => selectImage(val, 500)}
              artist={aboutUs}
              data={aboutUs}
              index={999}
            />
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            {allProps.map((prop) => (
              <th key={prop} style={{ textTransform: "capitalize" }}>
                {prop}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {aboutUs.members.map((entry, idx) => (
            <tr>
              {allProps.map((prop, propIdx) =>
                prop === "imageUrl" ? (
                  /* when imageUrl, then show image selector */
                  <td key={prop}>
                    <span>{entry[prop] + entry.id}</span>
                    <Button
                      variant="info"
                      onClick={(_) => setShowImageSelect(true)}
                      key={prop + propIdx + "Button"}
                    >
                      Change
                    </Button>
                    <Modal key={prop + propIdx} show={showImageSelect}>
                      <Modal.Header
                        closeButton
                        onClick={(_) => setShowImageSelect(false)}
                      >
                        <Modal.Title>Choose an image</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <FileSelector
                          type="team"
                          creds={creds}
                          onSelect={(val) => selectImage(val, entry.id)}
                          artist={entry}
                          data={aboutUs}
                          index={idx}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <p>Click on an image to select</p>
                        {/* <Button
                          variant="secondary"
                          onClick={(_) => setShowImageSelect(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(_) => setShowImageSelect(false)}
                        >
                          Save Changes
                        </Button> */}
                      </Modal.Footer>
                    </Modal>
                  </td>
                ) : (
                  /* and show a simple text field otherwise */
                  <td key={prop}>
                    <Form.Control
                      defaultValue={entry[prop]}
                      onInput={(e) =>
                        handleUpdateProp(prop, e.target.value, idx)
                      }
                      key={prop + "1"}
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
                  key={prop + "1"}
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
        <Button variant="warning" onClick={discardChanges}>
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

export default AboutUs;
