import styles from "./TitleScreen.module.css";
import React, { useState } from "react";
import { ReactComponent as ReactLogo } from "../img/logo.svg";

import { Container } from "react-bootstrap";

const TitleScreen = React.forwardRef((props, ref) => {
  const [transform, setTransform] = useState("");

  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  const sensX = -1;
  const sensY = -1;

  function setMouse(e) {
    var x = e.clientX,
      y = e.clientY;

    var a = ((x - innerWidth / 2) / innerWidth).toFixed(2) * 100 * sensX;
    var b = ((y - innerHeight / 2) / innerHeight).toFixed(2) * 100 * sensY;

    var s = "rotateY(" + a + "deg) rotateX(" + b + "deg)";

    setTransform(s);
  }

  function resetMouse() {
    setTransform("");
  }

  return (
    <Container
      id="TitleScreen"
      onMouseMove={(e) => setMouse(e)}
      onMouseOut={(_) => resetMouse()}
      className={
        styles.fullHeight +
        " " +
        styles.backgroundImage +
        " d-flex flex-column " +
        (transform === "" ? styles.logoTrans : "")
      }
      ref={ref}
    >
      <div className="flex-grow-1" />
      <div className="text-center">
        <ReactLogo className={styles.logo} style={{ transform: transform }} />
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
  );
});

export default TitleScreen;
