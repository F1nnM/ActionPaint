import { Col, Container, Row } from "react-bootstrap";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import WhatWeDo from "./components/WhatWeDo";
import TopFlavors from "./components/TopFlavors";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SectionFrame from "./components/SectionFrame";
import PlaygroundComponent from "./components/PlaygroundComponent";

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
    id: "Our Artists",
    component: <TopFlavors />,
  },
  {
    id: "About Us",
    component: <AboutUs />,
  },
  {
    id: "What We Do",
    component: <WhatWeDo />,
  },
  {
    id: "FAQ",
    component: <FAQ />,
  },
  {
    id: "Contact Us",
    component: <Contact />,
  },
];

if (process.env.NODE_ENV === "development")
  // if in dev mode, add the playground component
  sections.unshift({
    id: "playground",
    component: <PlaygroundComponent />,
  });

function Website({ switchToAdmin }) {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.9,
  });

  const [data, setData] = useState(null);
  const [policy, setPolicy] = useState(false);

  function togglePopup() {
    setPolicy(!policy);
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND + "content")
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  const cssVars = {
    "--primaryColor": data["style"]["primaryColor"],
    "--accentColor": data["style"]["accentColor"],
    "--initialBackground": data["style"]["initialBackground"],
    "--background": data["style"]["background"],
  };

  document.title = data.brand.title;

  return (
    <Container fluid className={styles.app + " px-0"} style={cssVars}>
      {/* Navbar component goes here */}
      <Navbar tmpinView={inView} data={data} />

      <Row className="mb-5">
        <Col>
          <TitleScreen ref={ref} tmpinView={inView} data={data} />
        </Col>
      </Row>

      {/* Each section: */}
      <Row>
        <Col>
          {sections.map((section) => (
            <SectionFrame
              title={
                section.id !== "playground"
                  ? data["sections"][section.id]
                  : section.id
              }
              ID={section.id}
              key={
                section.id !== "playground" ? data["sections"][section.id] : -1
              }
            >
              {React.cloneElement(section.component, { data: data })}
            </SectionFrame>
          ))}
        </Col>
      </Row>
      <Footer
        togglePopup={togglePopup}
        switchToAdmin={switchToAdmin}
        data={data}
      />
      {policy ? (
        <PrivacyPolicy policy={data.privacy_policy.text} togglePopup={togglePopup} />
      ) : null}
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
