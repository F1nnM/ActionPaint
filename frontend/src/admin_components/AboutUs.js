import styles from "./AboutUs.module.scss";
import { Table, Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { Delete, Add } from "@material-ui/icons";
import { useState } from "react";
import { UploadButton } from "./FileButton";

function AboutUs({ data, creds }) {
  const [aboutUs, setAboutUs] = useState(JSON.parse(JSON.stringify(data.about)));
  const [toBeDeleted, setToBeDeleted] = useState([]);

  const allProps = Object.keys(aboutUs.members[0]);

  const generateFreshMember = () => {
    let obj = Object.fromEntries(allProps.map(prop => [prop, null]));
    obj["isNew"] = true;
    return obj;
  };

  let headersJSON = new Headers();
  let headersImage = new Headers();
  headersJSON.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headersImage.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headersJSON.append("Content-Type", "application/json");

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
        strippedMember.imageUrl = "default.jpg"
      }
      return strippedMember;
    })

    let newAboutUs = { ...aboutUs, members: strippedMembers };

    submitAboutUs(newAboutUs);

    toBeDeleted.forEach((element) => {
      handleDeleteImage(element);
    });
    setToBeDeleted([]);
  }

  function submitAboutUs(dataToSubmit) {
    const url = `${process.env.REACT_APP_BACKEND}admin/update/about`;
    const options = {
      method: "POST",
      headers: headersJSON,
      body: JSON.stringify(dataToSubmit),
    };
    fetch(url, options)
      .then(() => {
        setAboutUs(dataToSubmit);
        alert("Saved successfully.")
      })
      .catch((err) => {
        alert(`An error occured: ${err}`);
      });
  }

  function handleDeleteImage(src) {
    if(src === "default.jpg")
      return
    let url = `${process.env.REACT_APP_BACKEND}admin/delete_image/team/${src}`;

    fetch(url, {
      method: "DELETE",
      headers: headersJSON,
    })
      .catch((err) => alert(`An error occured: ${err}`))
  }

  function handleBannerUpload(e) {

    let url = `${process.env.REACT_APP_BACKEND}admin/upload_image/team`;

    let fileName = "team_banner.png";

    var formData = new FormData();
    formData.append('images', e.target.files[0], fileName);

    fetch(url, {
      method: "POST",
      headers: headersImage,
      body: formData
    })
      .then(async res => {
        if (!res.ok)
          throw await res.text();
        e.target.value = "";
      })
      .catch(err => alert(`An error occured: ${err}`));
  }

  function handleMemberImageUpload(e, index) {

    handleDeleteImage(aboutUs.members[index].imageUrl);

    let url = `${process.env.REACT_APP_BACKEND}admin/upload_image/team`;

    let fileName = Date.now().toString() + e.target.files[0].name;

    var formData = new FormData();
    formData.append('images', e.target.files[0], fileName);

    fetch(url, {
      method: "POST",
      headers: headersImage,
      body: formData
    })
      .then(async res => {
        if (!res.ok)
          throw await res.text();
        e.target.value = "";

        let newMembers = [...aboutUs.members];
        newMembers[index].imageUrl = fileName;
        submitAboutUs({...aboutUs, members: newMembers})
      })
      .catch(err => alert(`An error occured: ${err}`));
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Card>
                <Card.Header>
                  <Form.Label className="mb-0">Info</Form.Label>
                </Card.Header>
                <Card.Body>
                  <Form.Control
                    required
                    as="textarea"
                    rows={10}
                    placeholder="Description"
                    defaultValue={aboutUs.info}
                    onInput={(e) => setAboutUs({ ...aboutUs, info: e.target.value })}
                  />
                </Card.Body>
              </Card>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              Banner image
            </Card.Header>
            <Card.Body className="d-flex justify-content-around align-items-center">
              <img alt="Team banner preview" className={styles.bannerImage} src={`${process.env.REACT_APP_BACKEND}images/team/${aboutUs.imageUrl}?${Date.now()}`} />
              <UploadButton fileType=".PNG" handleUpload={handleBannerUpload} name="teamBanner" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
        <div className="mb-3"><b>Caution</b>: Modifiying the images will persist all other modifications to the team details.</div>
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
              {aboutUs.members.map((member, index) => (
                <tr key={member["name"] + index}>
                  {allProps.map((prop) => {
                    switch (prop.toLowerCase()) {
                      case "imageurl":
                        // when imageUrl, then show image selector 
                        return (
                          <td key={prop}>
                            {member["isNew"]
                              ? <span>Please submit new members first, before uploading images</span>
                              : (
                                <div className="d-flex align-items-center">
                                  <img
                                    alt="Member preview"
                                    className={`${styles.teamImage} mr-3`}
                                    src={`${process.env.REACT_APP_BACKEND}images/team/${member[prop]}?${Date.now()}`} />
                                  <UploadButton handleUpload={(e) => handleMemberImageUpload(e, index)} fileType=".JPG" name={`member${index}`} />
                                </div>
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
                                handleUpdateProp(prop, e.target.value, index)
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
                                handleUpdateProp(prop, e.target.value, index)
                              }
                              key={prop}
                            />
                          </td>
                        );
                    }
                  })}

                  <td>
                    <Button variant="danger" onClick={() => handleDelete(index)}>
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
