import { Col, Container, Row } from "react-bootstrap";
import ExampleSection from "./components/ExampleSection";
import Playground from "./components/Playground";
import AboutUs from "./components/AboutUs";
import PlaygroundComponent from "./components/PlaygroundComponent";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";

import styles from "./App.module.css"

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container fluid className={styles.app + " px-0"}>
      {/* Navbar component goes here */}

      <Row>
        <Col>{/* Titlescreen goes here */}</Col>
      </Row>

      {/* Each section: */}
      <Row>
        <Col>
          <ExampleSection />
          <Playground name="Lorem">
            <PlaygroundComponent />
          </Playground>
          <AboutUs />
          <FAQ />
        </Col>
      </Row>
      <Footer/>
    </Container>
  );
}

export default App;
