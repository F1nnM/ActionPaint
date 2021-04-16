import { Col, Container, Row } from "react-bootstrap";
import ExampleSection from "./components/ExampleSection";
import Playground from "./components/Playground";
import AboutUs from "./components/AboutUs";
import PlaygroundComponent from "./components/PlaygroundComponent";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import WhatWeDo from "./components/WhatWeDo";
import TopFlavors from "./components/TopFlavors";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import SectionFrame from "./components/SectionFrame";

import styles from "./Website.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import TitleScreen from "./components/TitleScreen";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react"

var sections = [
  {
    title: "Example Section",
    component: <ExampleSection />,
  },
  {
    title: "Some of our artists",
    component: <TopFlavors />,
  },
  {
    title: "Playground",
    component: (
      <Playground name="Lorem">
        <PlaygroundComponent />
      </Playground>
    ),
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
      .then(resp => resp.json())
      .then(data => setData(data))
  }, [])

  if (!data)
  return (
    <div>
      Loading...
    </div>
  )

    console.log(data)

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
    </Container>
  );
}

export default Website;
