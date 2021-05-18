import styles from "./WhatWeDo.module.scss";
import { Table, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function WhatWeDo({ data, creds }) {
  const [whatwedo, setWhatWeDo] = useState(data.whatwedo);
  const [questionInput, setQuestionInput] = useState(null);
  const [answerInput, SetAnswerInput] = useState(null);
  let headers = new Headers();

  headers.append('Authorization', 'Basic ' + btoa(creds.username + ":" + creds.password));
  headers.append("Content-Type", "application/json",)


  function handleAdd() {
    const obj = { "Title": questionInput, "Description": answerInput };
    setWhatWeDo([...whatwedo, obj]);
  }

  function handleDelete(index) {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      whatwedo.splice(index, 1);
      setWhatWeDo([...whatwedo]);
    }
  }

  function handleUpdateQuestion(value, index) {
    whatwedo[index].Title = value;
  }

  function handleUpdateAnswer(value, index) {
    whatwedo[index].Description = value;
  }

  function handleUpdateSubmit() {
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

  function handleMoveUp(idx) {
    const data = [...whatwedo];
    const tmp = data[idx];
    data[idx] = data[idx - 1];
    data[idx - 1] = tmp;

    setWhatWeDo([...data]);

  }

  function handleMoveDown(idx) {
    const data = [...whatwedo];
    const tmp = data[idx];
    data[idx] = data[idx + 1];
    data[idx + 1] = tmp;

    setWhatWeDo([...data]);

  }

  return (
    <>
    {/* Create a fully editable Table with all titles and descriptions in the whatwedo.json which will be updated on the main page instantly after submitting
        It is possible to:
          - Add a new element
          - Change the index of existing ones
          - Change the content of existing ones 
          - Delete elements
          */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {whatwedo.map((entry, idx) => (
            <tr key={entry.Title+entry.Description}>
              <td width="200">
                <Button key={"Button 1" + entry} variant="danger" onClick={() => handleDelete(idx)}>
                  <DeleteIcon />
                </Button>
                <Button key={"Button 2" + entry} className="float-right" variant="primary" onClick={() => handleMoveUp(idx)}>
                  <ArrowUpwardIcon />
                </Button>
                <p></p>
                <Button key={"Button 3" + entry} className="float-right" variant="primary" onClick={() => handleMoveDown(idx)}>
                  <ArrowDownwardIcon />
                </Button>
              </td>
              <td><Form.Control as="textarea" defaultValue={entry.Title} key={entry.Title} onInput={e => handleUpdateQuestion(e.target.value, idx)} /></td>
              <td><Form.Control as="textarea" defaultValue={entry.Description} key={entry.Description} onInput={e => handleUpdateAnswer(e.target.value, idx)} /></td>
            </tr>
          ))}
          <tr>
            <td className={styles.saveChanges}>
              <Button variant="success" onClick={() => handleUpdateSubmit()}>
                Save Changes
          </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control required size="lg" as="textarea" placeholder="Title" onInput={e => setQuestionInput(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control required size="lg" as="textarea" placeholder="Description" onInput={e => SetAnswerInput(e.target.value)} />
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
