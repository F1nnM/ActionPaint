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

// array of the sections and their components to be rendered
const sections = [
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

// if in dev mode, add the playground component to the sections array
if (process.env.NODE_ENV === "development")
  sections.unshift({
    id: "playground",
    component: <PlaygroundComponent />,
  });

function Website({ switchToAdmin }) {

  // used to check scroll state to collapse/expand the navbar
  // ref - react reference to the element to be checked for visibility (will be the TitleScreen)
  // inView - reactive boolean
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.9,
  });

  // initialze reactive state variables
  const [data, setData] = useState(null);
  const [policyPopupVisible, setPolicyPopupVisible] = useState(false);

  // useEffect with empty dependency array only runs once, equivalent to componentDidMount on class components
  // load data from the backend, parse and update state
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND + "content")
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }, []);

  // as long as the data has not been loaded display nothing.
  if (!data) return <div>Loading...</div>;

  // define a style object for the css variables. CSS variables are inherited from parent elements 
  const cssVars = {
    "--primaryColor": data["style"]["primaryColor"],
    "--accentColor": data["style"]["accentColor"],
    "--initialBackground": data["style"]["initialBackground"],
    "--background": data["style"]["background"],
  };

  return (
    <Container fluid className={styles.app + " px-0"} style={cssVars}>

      <Navbar hideNavbar={inView} data={data} />

      <Row className="mb-5">
        <Col>
          <TitleScreen ref={ref} hideScrollNotification={inView} data={data} />
        </Col>
      </Row>

      <Row>
        <Col>
          {(process.env.NODE_ENV === "development") && (
            <SectionFrame title="Playground"/>
          )}
          {sections.map((section) => (
            <SectionFrame title={data["sections"][section.id]} id={section.id} key={data["sections"][section.id]}>
              {
                // We need to clone the elements in order to pass the data prop
                React.cloneElement(section.component, { data: data })
              }
            </SectionFrame>
          ))}
        </Col>
      </Row>
      <Footer
        showPrivacyPolicyPopup={()=>setPolicyPopupVisible(true)}
        switchToAdmin={switchToAdmin}
        data={data}
      />
      {policyPopupVisible && <PrivacyPolicy policy={data.privacy_policy.text} hidePopup={()=>setPolicyPopupVisible(false)} />}

      {
        // each <li /> is one bubble in the background 
      }
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
