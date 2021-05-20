import { Button, Container, Row } from "react-bootstrap";

function ImportExport({ data, creds, emailData }) {

  async function downloadData() {
    const dataToDownload = { ...data, mail: emailData }
    const json = JSON.stringify(dataToDownload);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `settings_${data.brand.title.replace(/[^a-zA-Z]/gi, "_")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function uploadData(data) {
    const url = process.env.REACT_APP_BACKEND + "admin/import";
    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: data,
    };
    fetch(url, options)
      .then((res) => {
        if(res.ok)
          alert("Settings imported.")
        else
          res.text().then(text=> alert("An error occured: \n"+text))
      })
      .catch((err) => {
        alert("An error occured: \n"+err)
      });
  }

  function handleUpload(e){
    e.target.files[0].text()
    .then( text => {
      try {
        JSON.parse(text);
      } catch (error) {
        return alert("No valid JSON file.");
      }
      uploadData(text);
    })
    e.target.value="";
  }

  return (
    <Container>
      <Row className="d-flex flex-column pb-5">
        <h1>Export Settings</h1>
        <Button onClick={_ => downloadData()}>Download .json</Button>
      </Row>
      <Row className="d-flex flex-column pb-5">
        <h1>Import Settings</h1>
        <span>Select a file to import data from. The images can simply be uploaded in the Logos-Tab on the left.</span>
        <input type="file" onChange={e => handleUpload(e)}/>
      </Row>
      <Row className="d-flex flex-column">
        <h1>Import / Export Logos</h1>
        <span>The logos can be managed fully from the Logos-tab on the left.</span>
      </Row>
    </Container>
  );
}

export default ImportExport;
