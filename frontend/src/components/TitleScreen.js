import styles from "./TitleScreen.module.css";
import React from "react";

import { Container } from "react-bootstrap";

const TitleScreen = React.forwardRef((props, ref) => (
  <Container
    id="TitleScreen"
    className={
      styles.fullHeight + " " + styles.backgroundImage + " d-flex flex-column"
    }
    ref={ref}
  >
    <div className="flex-grow-1" />
    <div>
      <div className="text-center">
        <span className={styles.title}>ActionPaint</span>
      </div>
    </div>
    <div>
      <div className="text-center">
        <span className={styles.subtitle}>
          - The modern agency for modern artists -
        </span>
      </div>
    </div>
    <div className="flex-grow-1" />
    <div>
      <div className={styles.scrollNotice + " text-center"}>
        <span
          className={
            styles.shadowBack +
            " " +
            styles.hideable +
            (props.tmpinView ? "" : " " + styles.hidden)
          }
        >
          v Scroll down v
        </span>
      </div>
    </div>
  </Container>
));

export default TitleScreen;
