//import styles from "./WhatWeDo.module.scss";
import { Table, Button, Col, Container, Form, Row  } from "react-bootstrap";
import { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';

function WhatWeDo({ data, creds }) {
  const whatwedo = data.whatwedo;
  const [questionInput, setQuestionInput] = useState(null);
  const [answerInput, SetAnswerInput] = useState(null);
  let headers = new Headers();

  headers.append('Authorization', 'Basic ' + btoa(creds.username + ":" + creds.password));
  headers.append("Content-Type", "application/json",)


  function handleAdd(){
    whatwedo.push({"Title":questionInput,"Description":answerInput});
    const url = process.env.REACT_APP_BACKEND + "admin/update/whatwedo";
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(whatwedo),
      })
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function handleDelete(index){
    whatwedo.splice(index, 1);
    const url = process.env.REACT_APP_BACKEND + "admin/update/whatwedo";
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(whatwedo),
      })
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
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
      {whatwedo.map((questions, idx) => (
        <tr>
          <th>
            <Button variant="danger" onClick={() => handleDelete(idx)}>
              <DeleteIcon/>
            </Button>
          </th>
          <td>{questions.Title}</td>
          <td>{questions.Description}</td>
        </tr>
      ))}
      </tbody>
    </Table>
    <Container>
    <Row>
      <Col className="justify-content-center">
        <Form className="d-flex flex-column justify-content-center" action={null}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control required  size="lg" as="textarea" placeholder="Title" onInput={e => setQuestionInput(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control required size= "lg" as="textarea" placeholder="Description" onInput={e => SetAnswerInput(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
  </>
  );
}

export default WhatWeDo;
