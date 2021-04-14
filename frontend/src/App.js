import { Col, Container, Row } from "react-bootstrap";
import ExampleSection from "./components/ExampleSection";
import Playground from "./components/Playground";
import AboutUs from "./components/AboutUs";
import PlaygroundComponent from "./components/PlaygroundComponent";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import WhatWeDo from "./components/WhatWeDo";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import SectionFrame from "./components/SectionFrame";

import styles from "./App.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import TitleScreen from "./components/TitleScreen";

var sections = [
  {
    title: "Example Section",
    anchor: "Example Section",
    component: <ExampleSection />
  },
  {
    title: "Playground",
    anchor: "Playground",
    component: 
    <Playground name="Lorem">
      <PlaygroundComponent />
    </Playground>
  },
  {
    title: "About Us",
    anchor: "About Us",
    component: <AboutUs />
  },
  {
    title: "What We Do",
    anchor: "What We Do",
    component: <WhatWeDo />
  },
  {
    title: "FAQ",
    anchor: "FAQ",
    component: <FAQ />
  },
  {
    title: "Contact Us",
    anchor: "Contact Us",
    component: <Contact />
  }  
]

function App() {
  return (
    <Container fluid className={styles.app + " px-0"}>
      {/* Navbar component goes here */}
      <Navbar />

      <Row className="mb-5">
        <Col>
          <TitleScreen/>
        </Col>
      </Row>

      {/* Each section: */}
      <Row>
        <Col>
          {sections.map((section) => (
            <SectionFrame anchor={section.anchor} title={section.title}>
              {section.component}
            </SectionFrame>
          ))}
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default App;
