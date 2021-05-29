import { Button, Row, Card, Col } from "react-bootstrap";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import styles from "./ImportExport.module.scss";

function ImportExport({ data, creds, emailData }) {
  async function downloadData() {
    const dataToDownload = { ...data, mail: emailData };
    const json = JSON.stringify(dataToDownload);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `settings_${data.brand.title.replace(
      /[^a-zA-Z]/gi,
      "_"
    )}.json`;
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
        if (res.ok) alert("Settings imported.");
        else res.text().then((text) => alert("An error occured: \n" + text));
      })
      .catch((err) => {
        alert("An error occured: \n" + err);
      });
  }

  function handleUpload(e) {
    e.target.files[0].text().then((text) => {
      try {
        JSON.parse(text);
      } catch (error) {
        return alert("No valid JSON file.");
      }
      uploadData(text);
    });
    e.target.value = "";
  }

  return (
    <>
      <Row>
        <Col md={4} lg={2}>
          <Card>
            <Card.Header as="h5">Export</Card.Header>
            <Card.Body>
              <Button
                variant="outline-dark"
                className={styles.fileButton}
                onClick={(_) => downloadData()}
              >
                <GetAppIcon />
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card>
            <Card.Header as="h5">Import</Card.Header>
            <Card.Body>
              <label
                for="file_input"
                className={styles.fileButton + " " + styles.uploadButton}
              >
                <PublishIcon />
              </label>

              <input
                id="file_input"
                className={styles.hideImport}
                type="file"
                accept=".json"
                onChange={(e) => handleUpload(e)}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} sm={8} md={4}>
          <Card>
            <Card.Header as="h5">Logos</Card.Header>
            <Card.Body>
              The logos can be managed fully from the Logos-tab on the left.
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ImportExport;
