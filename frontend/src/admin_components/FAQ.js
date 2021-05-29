import styles from "./FAQ.module.scss";
import { Table, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Add from "@material-ui/icons/Add";

function FAQ({ data, creds, discardChanges }) {
  const [faq, setFAQ] = useState(data.faq);
  const [questionInput, setQuestionInput] = useState(null);
  const [answerInput, SetAnswerInput] = useState(null);
  let headers = new Headers();

  headers.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headers.append("Content-Type", "application/json");

  function handleAdd() {
    const obj = { q: questionInput, a: answerInput };
    setFAQ([...faq, obj]);
    setQuestionInput(null);
    SetAnswerInput(null);
  }

  function handleDelete(index) {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      faq.splice(index, 1);
      setFAQ([...faq]);
    }
  }

  function handleUpdateQuestion(value, index) {
    faq[index].q = value;
  }

  function handleUpdateAnswer(value, index) {
    faq[index].a = value;
  }

  function handleUpdateSubmit() {
    const url = process.env.REACT_APP_BACKEND + "admin/update/faq";
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(faq),
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function handleMoveUp(idx) {
    const data = [...faq];
    const tmp = data[idx];
    data[idx] = data[idx - 1];
    data[idx - 1] = tmp;

    setFAQ([...data]);
  }

  function handleMoveDown(idx) {
    const data = [...faq];
    const tmp = data[idx];
    data[idx] = data[idx + 1];
    data[idx + 1] = tmp;

    setFAQ([...data]);
  }

  return (
    <>
      {/* Create a fully editable Table with all questions and answers in the faq.json which will be updated on the main page instantly after submitting
        It is possible to:
          - Add a new element
          - Change the index of existing ones
          - Change the content of existing ones 
          - Delete elements
           */}
      <Table responsive="sm" bordered>
        <thead>
          <tr>
            <th></th>
            <th>Questions</th>
            <th>Answers</th>
          </tr>
        </thead>
        <tbody>
          {faq.map((questions, idx) => (
            <tr key={questions.q + questions.a}>
              <td width="200">
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
              </td>
              <td>
                <Form.Control
                  as="textarea"
                  defaultValue={questions.q}
                  key={questions.q}
                  onChange={(e) => handleUpdateQuestion(e.target.value, idx)}
                />
              </td>
              <td>
                <Form.Control
                  as="textarea"
                  defaultValue={questions.a}
                  key={questions.a}
                  onChange={(e) => handleUpdateAnswer(e.target.value, idx)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td width="200">
              <Button variant="success" onClick={handleAdd}>
                <Add />
              </Button>
            </td>
            <td>
              <Form.Control
                required
                size="lg"
                as="textarea"
                defaultValue={questionInput}
                placeholder="Question"
                onInput={(e) => setQuestionInput(e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                required
                size="lg"
                as="textarea"
                placeholder="Answer"
                defaultValue={answerInput}
                onInput={(e) => SetAnswerInput(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      {/* <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Question</Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>Answer</Form.Label>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container> */}
      <Button
        variant="success"
        className="mr-3"
        onClick={() => handleUpdateSubmit()}
      >
        Save Changes
      </Button>
      <Button variant="outline-danger" onClick={discardChanges}>
        Discard Changes
      </Button>
    </>
  );
}

export default FAQ;
