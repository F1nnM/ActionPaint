import { Button } from "react-bootstrap";
import styles from "./FileButton.module.scss";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";

export function DownloadButton({ onClick, fileType }) {
  return (
    <Button
      variant="outline-dark"
      className={styles.fileButton}
      onClick={onClick}
    >
      <GetAppIcon />
      <div className={styles.fileType}>{fileType}</div>
    </Button>
  );
}

export function UploadButton({ handleUpload, fileType, name }) {

  if(! name)
    throw new Error("name prop is required and must be unique in the entire app. ")

  return (
    <div>
      <label
        for={`file_input_${name}`}
        className={styles.uploadButton + " " + styles.fileButton}
      >
        <PublishIcon />
      <div className={styles.fileType}>{fileType}</div>
      </label>

      <input
        id={`file_input_${name}`}
        className={styles.hideImport}
        type="file"
        accept={fileType}
        onChange={handleUpload}
      />
    </div>
  );
}