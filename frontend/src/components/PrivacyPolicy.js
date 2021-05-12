import styles from "./PrivacyPolicy.module.scss";
import React from "react";
import { Button } from "react-bootstrap";


function PrivacyPolicy({policy, togglePopup}) {
  return (
    <div className={styles.popup} onClick={() => togglePopup()}>
      <div className={styles.popupInner} onClick={e=>e.stopPropagation()}>
        <Button className={"float-right" +" " + styles.closeButton} variant="danger" onClick={() => togglePopup()}>
          X
        </Button>{" "}
        <h1 className={styles.title}>Privacy Policy</h1>
        <div className={styles.TextWrapper}>
          <textarea className={styles.privacyText}>{policy}</textarea>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
