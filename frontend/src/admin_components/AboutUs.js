import styles from "./WhatWeDo.module.scss";
import { Table, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Delete, Add } from "@material-ui/icons";
import { useState } from "react";
import FileSelector from "./FileSelector";

function AboutUs({ data, creds, discardChanges }) {
  const [aboutUs, setAboutUs] = useState(data.about);
  const [reRender, setReRender] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState([]);
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

  function handleDelete(idx) {
    if (window.confirm("Do you really want to delete this member?")) {
      var tmpToBeDeletedImages = [];

      tmpToBeDeletedImages.push(aboutUs.members[idx].imageUrl);

      aboutUs.members.splice(idx, 1);
      setAboutUs({
        ...aboutUs,
      });
      setToBeDeleted(toBeDeleted.concat(tmpToBeDeletedImages));
    }
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
      body: JSON.stringify(aboutUs),
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.warn(err);
      });
    toBeDeleted.forEach((element) => {
      handleDeleteImage(element);
    });
    setToBeDeleted([]);
  }
  function handleDeleteImage(src) {
    let url = process.env.REACT_APP_BACKEND + "admin/delete_image/team/" + src;

    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );

    fetch(url, {
      method: "DELETE",
      headers,
    })
      .catch((err) => alert(err))
      .then((data) => {});
  }

  function rerenderFromChild() {
    setReRender(!reRender);
  }

  return (
    <>
      <Container>
        <Row className="align-items-center">
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
              artist={aboutUs}
              data={aboutUs}
              index={999}
              rerender={rerenderFromChild}
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
            <tr key={entry["name"] + idx}>
              {allProps.map((prop) =>
                prop === "imageUrl" ? (
                  /* when imageUrl, then show image selector */
                  <td key={prop}>
                    <span>{entry[prop]}</span>
                    <FileSelector
                      type="team"
                      creds={creds}
                      artist={entry}
                      data={aboutUs}
                      index={idx}
                      rerender={rerenderFromChild}
                    />
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
        </tbody>
      </Table>
      <Button
        className={"float-right"}
        variant="success"
        onClick={() => handleAdd()}
      >
        <Add />
      </Button>
      <span className={"mr-4 " + styles.discardChanges}></span>
      <span className={styles.saveChanges}>
        <Button variant="success" onClick={() => handleUpdateSubmit()}>
          Save Changes
        </Button>
      </span>
    </>
  );
}

export default AboutUs;
