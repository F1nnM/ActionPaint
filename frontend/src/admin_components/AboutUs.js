import styles from "./WhatWeDo.module.scss";
import { Table, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Delete, Add } from "@material-ui/icons";
import { useState } from "react";

function WhatWeDo({ data, creds }) {
  const [aboutUs, setAboutUs] = useState(data.about);
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

  const freshMember = () => {
    var obj = {};
    allProps.forEach((p) => {
      obj[p] = "";
    });
    return obj;
  };

  const [newMember, setNewMember] = useState(freshMember());

  headers.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headers.append("Content-Type", "application/json");

  function discardChanges() {
    if (window.confirm("Do you want to revert all your changes?")) {
      setAboutUs({
        ...data.about,
      });

      setNewMember({
        ...freshMember(),
      });
    }
  }

  function handleUpdateTeamInfo(key, value) {
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
      ...freshMember(),
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

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="ControlTextarea1">
                <Form.Label>Info</Form.Label>
                <Form.Control
                  required
                  size="lg"
                  as="textarea"
                  placeholder="Description"
                  defaultValue={aboutUs.info}
                  onInput={(e) => handleUpdateTeamInfo(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            {allProps.map((prop) => (
              <th key={prop} style={{ textTransform: "capitalize" }}>{prop}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {aboutUs.members.map((entry, idx) => (
            <tr>
              {/* <td width="200">
                <Button variant="danger" onClick={() => handleDelete(idx)}>
                  <DeleteIcon />
                </Button>
                <Button
                  className="float-right"
                  variant="primary"
                  onClick={() => handleMoveUp(idx)}
                >
                  <ArrowUpwardIcon />
                </Button>
                <p></p>
                <Button
                  className="float-right"
                  variant="primary"
                  onClick={() => handleMoveDown(idx)}
                >
                  <ArrowDownwardIcon />
                </Button>
              </td> */}
              {allProps.map((prop, idx) => (
                <td key={prop}>
                  <Form.Control
                    defaultValue={entry[prop]}
                    onInput={(e) => handleUpdateProp(prop, e.target.value, idx)}
                  />
                </td>
              ))}

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

export default WhatWeDo;
