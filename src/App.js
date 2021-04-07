import { Col, Container, Row } from "react-bootstrap";
import ExampleSection from "./components/ExampleSection";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container fluid className="App">
      {/* Navbar component goes here */}

      <Row>
        <Col>
          {/* Titlescreen goes here */}
        </Col>
      </Row>

      {/* Each section: */}
      <Row>
        <Col>
          <ExampleSection />
        </Col>
      </Row>

    </Container>
  );
}

export default App;
