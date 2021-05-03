import styles from "./TitleScreen.module.css";
import React from "react";
import { ReactComponent as ReactLogo } from '../img/logo.svg';

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
    <div className="text-center">
      <ReactLogo className={styles.logo} />
    </div>
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
          <span>&#9660;</span>
          <span className={"mx-4"}>Scroll down</span>
          <span>&#9660;</span>
        </span>
      </div>
    </div>
  </Container>
));

export default TitleScreen;
