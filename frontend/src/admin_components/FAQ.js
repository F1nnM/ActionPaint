//import styles from "./FAQ.module.scss";
import { Table, Button, Col, Container, Form, Row  } from "react-bootstrap";
import { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';

function FAQ({ data, creds }) {
  const faq = data.faq;
  const [questionInput, setQuestionInput] = useState(null);
  const [answerInput, SetAnswerInput] = useState(null);
  let headers = new Headers();

  headers.append('Authorization', 'Basic ' + btoa(creds.username + ":" + creds.password));
  headers.append("Content-Type", "application/json",)


  function handleAdd(){
    faq.push({"q":questionInput,"a":answerInput});
    const url = process.env.REACT_APP_BACKEND + "admin/update/faq";
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(faq),
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
    faq.splice(index, 1);
    const url = process.env.REACT_APP_BACKEND + "admin/update/faq";
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(faq),
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
          <th>Questions</th>
          <th>Answers</th>
        </tr>
      </thead>
      <tbody>
      {faq.map((questions, idx) => (
        <tr>
          <th>
            <Button variant="danger" onClick={() => handleDelete(idx)}>
              <DeleteIcon/>
            </Button>
          </th>
          <td>{questions.q}</td>
          <td>{questions.a}</td>
        </tr>
      ))}
      </tbody>
    </Table>
    <Container>
    <Row>
      <Col className="justify-content-center">
        <Form className="d-flex flex-column justify-content-center" action={null}>
          <Form.Group>
            <Form.Label>Question</Form.Label>
            <Form.Control required  size="lg" as="textarea" placeholder="Question" onInput={e => setQuestionInput(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="ControlTextarea1">
            <Form.Label>Answer</Form.Label>
            <Form.Control required size= "lg" as="textarea" placeholder="Answer" onInput={e => SetAnswerInput(e.target.value)} /> 
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

export default FAQ;
