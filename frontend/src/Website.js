import { Col, Container, Row } from "react-bootstrap";
import ExampleSection from "./components/ExampleSection";
import Playground from "./components/Playground";
import AboutUs from "./components/AboutUs";
import PlaygroundComponent from "./components/PlaygroundComponent";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import WhatWeDo from "./components/WhatWeDo";
import Navbar from "./components/Navbar";
import ArtistCarousel from "./components/ArtistCarousel";
import Contact from "./components/Contact";
import SectionFrame from "./components/SectionFrame";

import styles from "./Website.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import TitleScreen from "./components/TitleScreen";

var sections = [
  {
    title: "Example Section",
    component: <ExampleSection />,
  },
  {
    title: "Artists",
    component: <ArtistCarousel />,
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
  return (
    <Container fluid className={styles.app + " px-0"}>
      {/* Navbar component goes here */}
      <Navbar />

      <Row className="mb-5">
        <Col>
          <TitleScreen />
        </Col>
      </Row>

      {/* Each section: */}
      <Row>
        <Col>
          {sections.map((section) => (
            <SectionFrame title={section.title} key={section.title}>
              {section.component}
            </SectionFrame>
          ))}
        </Col>
      </Row>
      <Footer switchToAdmin={switchToAdmin} />
    </Container>
  );
}

export default Website;
