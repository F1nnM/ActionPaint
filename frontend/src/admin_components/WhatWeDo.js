import { Table, Button, Form } from "react-bootstrap";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Add from "@material-ui/icons/Add";

function WhatWeDo({ data, creds, discardChanges }) {
  const [whatwedo, setWhatWeDo] = useState(data.whatwedo);
  const [questionInput, setQuestionInput] = useState(null);
  const [answerInput, SetAnswerInput] = useState(null);
  let headers = new Headers();

  headers.append(
    "Authorization",
    "Basic " + btoa(creds.username + ":" + creds.password)
  );
  headers.append("Content-Type", "application/json");

  function handleAdd() {
    const obj = { Title: questionInput, Description: answerInput };
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
      body: JSON.stringify(whatwedo),
    };
    fetch(url, options)
      .then((data) => {
        alert("Saved succesfully!")
      })
      .catch((err) => {
        alert(`An error occured: ${err}`)
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
      <Table bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {whatwedo.map((entry, idx) => (
            <tr key={entry.Title + entry.Description}>
              <td width="200">
                <Button
                  key={"Button 1" + entry}
                  variant="danger"
                  onClick={() => handleDelete(idx)}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  key={"Button 2" + entry}
                  className="float-right"
                  variant="primary"
                  onClick={() => handleMoveUp(idx)}
                >
                  <ArrowUpwardIcon />
                </Button>
                <p></p>
                <Button
                  key={"Button 3" + entry}
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
                  defaultValue={entry.Title}
                  key={entry.Title}
                  onInput={(e) => handleUpdateQuestion(e.target.value, idx)}
                />
              </td>
              <td>
                <Form.Control
                  as="textarea"
                  defaultValue={entry.Description}
                  key={entry.Description}
                  onInput={(e) => handleUpdateAnswer(e.target.value, idx)}
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
                placeholder="Title"
                onInput={(e) => setQuestionInput(e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                required
                size="lg"
                as="textarea"
                placeholder="Description"
                onInput={(e) => SetAnswerInput(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </Table>
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

export default WhatWeDo;
