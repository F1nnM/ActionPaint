import { Col, Container, Row } from "react-bootstrap";

function SectionFrame({ title, children }) {
  return (
    <Container className="section">
      <Row>
        <Col className="text-center">
          <h2>{title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default SectionFrame;
