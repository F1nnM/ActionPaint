import { Col, Container, Row } from "react-bootstrap";
import ExampleSection from "./components/ExampleSection";
import Playground from "./components/Playground";
import PlaygroundComponent from "./components/PlaygroundComponent";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container fluid className="App">
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
        </Col>
      </Row>
    </Container>
  );
}

export default App;
