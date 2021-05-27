import styles from "./TitleScreen.module.css";
import React from "react";

import { Container } from "react-bootstrap";

//using forwardref to pass down the ref parameter to the container.
const TitleScreen = React.forwardRef(({data, hideScrollNotification}, ref) => {

  return (
    <Container
      id="TitleScreen"
      className={`${styles.fullHeight} ${styles.backgroundImage} d-flex flex-column`}
      ref={ref}
    >
      <div className="flex-grow-1" />
      <div className="text-center">
        {
          // load svg as object, to allow included js to run. <img> as fallback
        }
        <object className={styles.logo} type="image/svg+xml" data={`${process.env.REACT_APP_BACKEND}images/logo_animated.svg`}>
          <img src={`${process.env.REACT_APP_BACKEND}images/logo_animated.svg`} alt="Logo" />
        </object>
      </div>
      <div>
        <div className="text-center">
          <span className={styles.title}>{data.brand.title}</span>
        </div>
      </div>
      <div>
        <div className="text-center">
          <span className={styles.subtitle}>
            - {data.brand.slogan} -
          </span>
        </div>
      </div>
      <div className="flex-grow-1" />
      <div>
        <div className={`${styles.scrollNotice} text-center`}>
          <span
            className={ `${styles.shadowBack} ${styles.hideable} ${hideScrollNotification ? "" :styles.hidden}`}
          >
            <span>&#9660;</span> {/* Downwards triangle */}
            <span className={"mx-4"}>Scroll down</span>
            <span>&#9660;</span>
          </span>
        </div>
      </div>
    </Container>
  );
});

export default TitleScreen;
