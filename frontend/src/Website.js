import { Col, Container, Row } from "react-bootstrap";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import WhatWeDo from "./components/WhatWeDo";
import TopFlavors from "./components/TopFlavors";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import SectionFrame from "./components/SectionFrame";

import styles from "./Website.module.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import TitleScreen from "./components/TitleScreen";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";

var sections = [
  /* {
    title: "Example Section",
    component: <ExampleSection />,
  },*/
  /*{
    title: "Playground",
    component: (
      <Playground name="Lorem">
        <PlaygroundComponent />
      </Playground>
    ),
  },*/
  {
    title: "Some of our artists",
    component: <TopFlavors />,
  },
  {
    title: "About Us",
    component: <AboutUs />,
  },
  {
    title: "What We Do",
    component: <WhatWeDo />,
  },
  {
    title: "FAQ",
    component: <FAQ />,
  },
  {
    title: "Contact Us",
    component: <Contact />,
  },
];

function Website({ switchToAdmin }) {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.9,
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND + "content")
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <Container fluid className={styles.app + " px-0"}>
      {/* Navbar component goes here */}
      <Navbar tmpinView={inView} data={data} />

      <Row className="mb-5">
        <Col>
          <TitleScreen ref={ref} tmpinView={inView} />
        </Col>
      </Row>

      {/* Each section: */}
      <Row>
        <Col>
          {sections.map((section) => (
            <SectionFrame title={section.title} key={section.title}>
              {React.cloneElement(section.component, { data: data })}
            </SectionFrame>
          ))}
        </Col>
      </Row>
      <Footer switchToAdmin={switchToAdmin} />
      <div className={styles.background}>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </div>
    </Container>
  );
}

export default Website;
