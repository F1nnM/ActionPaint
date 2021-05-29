import styles from "./WhatWeDo.module.scss";
import { Table, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Delete, Add } from "@material-ui/icons";
import { useState } from "react";
import FileSelector from "./FileSelector";

function AboutUs({ data, creds, reloadInterface }) {
  const [aboutUs, setAboutUs] = useState(data.about);
  const [toBeDeleted, setToBeDeleted] = useState([]);

  // scrape all possible props of a member without duplicates
  // const allProps = [...new Set(...aboutUs.members.map(member => Object.keys(member)))];
  // not required, as all members contain all data

  const allProps = Object.keys(aboutUs.members[0]);

  const generateFreshMember = () => {
    let obj = Object.fromEntries(allProps.map(prop => [prop, null]));
    obj["isNew"] = true;
    return obj;
  };

  let headers = new Headers();
  headers.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headers.append("Content-Type", "application/json");

  function handleUpdateProp(key, value, index) {
    let new_members = [...aboutUs.members];
    new_members[index][key] = value;
    setAboutUs({ ...aboutUs, members: new_members })
  }

  function handleDelete(index) {
    if (window.confirm("Do you really want to delete this member?")) {
      setToBeDeleted([...toBeDeleted, aboutUs.members[index].imageUrl])

      let newMembers = [...aboutUs.members];

      newMembers.splice(index, 1);

      if (newMembers.length === 0)
        newMembers.push(generateFreshMember());

      setAboutUs({ ...aboutUs, members: newMembers });
    }
  }

  function handleAdd() {
    setAboutUs({ ...aboutUs, members: [...aboutUs.members, generateFreshMember()] });
  }

  function handleUpdateSubmit() {

    // strip members of their isNew tag
    let strippedMembers = aboutUs.members.map(member => {
      let strippedMember = { ...member };
      if (strippedMember.isNew) {
        delete strippedMember["isNew"];
        strippedMember.images = [];
      }
      return strippedMember;
    })

    const url = `${process.env.REACT_APP_BACKEND}admin/update/about`;
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({...aboutUs, members: strippedMembers}),
    };
    fetch(url, options)
      .then(() => {
        setAboutUs({...aboutUs, members: strippedMembers})
        alert("Saved successfully.")
      })
      .catch((err) => {
        alert(`An error occured: ${err}`);
      });
    toBeDeleted.forEach((element) => {
      handleDeleteImage(element);
    });
    setToBeDeleted([]);
  }

  function handleDeleteImage(src) {
    let url = `${process.env.REACT_APP_BACKEND}admin/delete_image/team/${src}`;

    fetch(url, {
      method: "DELETE",
      headers,
    })
      .catch((err) => alert(`An error occured: ${err}`))
  }

  return (
    <Container fluid>
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
                onInput={(e) => setAboutUs({ ...aboutUs, info: e.target.value })}
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
            rerender={reloadInterface}
          />
        </Col>
      </Row>
      <Row>
        <Col>
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
              {aboutUs.members.map((member, idx) => (
                <tr key={member["name"] + idx}>
                  {allProps.map((prop) => {
                    switch (prop.toLowerCase()) {
                      case "imageurl":
                        // when imageUrl, then show image selector 
                        return (
                          <td key={prop}>
                            {member["isNew"]
                              ? <span>Please submit new members first, before uploading images</span>
                              : (
                                <>
                                  <span>{member[prop]}</span>
                                  <FileSelector
                                    type="team"
                                    creds={creds}
                                    artist={member}
                                    data={aboutUs}
                                    index={idx}
                                    rerender={reloadInterface}
                                  />
                                </>
                              )}
                          </td>
                        );
                      case "info":
                        return (
                          <td key={prop}>
                            <Form.Control
                              rows={5}
                              cols={50}
                              as="textarea"
                              defaultValue={member[prop]}
                              onBlur={(e) =>
                                handleUpdateProp(prop, e.target.value, idx)
                              }
                              key={prop}
                            />
                          </td>
                        );
                      /* and show a simple text field otherwise */
                      default:
                        return (
                          <td key={prop}>
                            <Form.Control
                              defaultValue={member[prop]}
                              onBlur={(e) =>
                                handleUpdateProp(prop, e.target.value, idx)
                              }
                              key={prop}
                            />
                          </td>
                        );
                    }
                  })}

                  <td>
                    <Button variant="danger" onClick={() => handleDelete(idx)}>
                      <Delete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            className="float-right"
            variant="success"
            onClick={handleAdd}
          >
            <Add />
          </Button>
          <span className={`mr-4 ${styles.discardChanges}`}></span>
          <span className={styles.saveChanges}>
            <Button variant="success" onClick={handleUpdateSubmit}>
              Save Changes
        </Button>
          </span>
        </Col>
      </Row>
    </Container >
  );
}

export default AboutUs;
