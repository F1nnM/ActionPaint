import styles from "./PrivacyPolicy.module.scss";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "react-bootstrap";


function PrivacyPolicy({policy, togglePopup}) {
  return (
    /* Creates a popup-like window to read the privacy policy. Closable by clicking the red x or anywhere except the window */
    <div className={styles.popup} onClick={() => togglePopup()}>
      <div className={styles.popupInner} onClick={e=>e.stopPropagation()}>
        <Button className={`${styles.closeButton}| float-right`} variant="danger" onClick={() => togglePopup()}>
          X
        </Button>{" "}
        <h1 className={styles.title}>Privacy Policy</h1>
        <div className={styles.TextWrapper}>
          <ReactMarkdown className={styles.text}>{policy}</ReactMarkdown>            
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
