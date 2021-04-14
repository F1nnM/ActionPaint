import { Col, Container, Row } from "react-bootstrap";

function SectionFrame({ title, anchor, children }) {
  return (
    <Container id={anchor} className="my-5">
      <Row>
        <Col className="text-center">
          <h1>{title}</h1>
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
