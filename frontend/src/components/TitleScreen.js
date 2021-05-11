import styles from "./TitleScreen.module.css";
import React, { useState } from "react";
import { ReactComponent as ReactLogo } from "../img/logo.svg";

import { Container } from "react-bootstrap";

const TitleScreen = React.forwardRef((props, ref) => {
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  const svg = document.querySelector("#mainlogo");
  //https://gist.github.com/gre/1650294
  const scale = (t) => t; // < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t

  const sensX = 40; // sensitivity has to be handled as percent values
  const sensY = 80;
  if (svg) {
    window.onmousemove = (e) => {
      var degX =
        (((scale(e.clientY / innerHeight) * 2 - 1) * 70) / 100) * sensX;
      var degY =
        (((scale(e.clientX / innerWidth) * 2 - 1) * -70) / 100) * sensY;
      svg.style = `--degX: ${degX}deg; --degY: ${degY}deg`;
    };

    document.onmouseenter = (e) => {
      svg.style = `--degX: 0deg; --degY: 0deg`;
    };

    document.onmouseleave = (e) => {
      svg.style = `--degX: 0deg; --degY: 0deg`;
    };
  }

  return (
    <Container
      id="TitleScreen"
      className={
        styles.fullHeight +
        " " +
        styles.backgroundImage +
        " d-flex flex-column "
      }
      ref={ref}
    >
      <div className="flex-grow-1" />
      <div className="text-center">
        <ReactLogo
          id="mainlogo"
          className={styles.logo}
        />
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
