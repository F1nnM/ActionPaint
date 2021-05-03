import React from "react";
import { Container } from "react-bootstrap";
import styles from "./DrippingFrame.module.scss";

function DrippingFrame({ children }) {
  return (
    <>
      <svg viewBox="0 0 200 16" className={styles.onceStart}>
        <g>
          <path
            style={{ fill: "var(--primaryColor)" }}
            d="M 0,4.7433767 C 71.509152,33.446133 112.41464,-13.201926 199.93429,3.8725987 L 199.99999,16 H 0.0421015 Z"
          />
        </g>
      </svg>
      <Container className={styles.coloredBackground}>{children}</Container>
      <svg viewBox="0 0 200 23" className={styles.drip}>
        <g transform="translate(6.6664939e-8,2.3111613)">
          <path d="M -6.6664939e-8,-2.3111613 H 200 V 8 C 142.74206,0.44485938 88.223716,2.1551295 31.75,5.2916666 11.92152,6.3929358 17.197917,11.90625 14.552083,13.229167 11.906251,11.90625 19.84375,5.2916666 0,5.2916666 Z" />
          <path d="m 15.610417,18.520833 c 0,0.730627 -0.59229,1.322917 -1.322917,1.322917 -0.730627,0 -1.322917,-0.59229 -1.322917,-1.322917 0,-0.730627 0.529167,-1.5875 1.5875,-2.645833 0.264584,1.852083 1.058334,1.915206 1.058334,2.645833 z" />
        </g>
      </svg>
      <svg viewBox="0 0 200 16" className={styles.onceEnd}>
        <g>
          <path d="M 0,4.7433767 C 71.509152,33.446133 112.41464,-13.201926 199.93429,3.8725987 L 199.99999,16 H 0.0421015 Z" />
        </g>
      </svg>
    </>
  );
}

export default DrippingFrame;
