import { Col, Container, Row } from "react-bootstrap";
import styles from "./SectionFrame.module.scss";

function SectionFrame({ title, children }) {
  return (
    <Container id={title} className="my-5">
      <Row>
        <Col className="text-center">
          <h1>{title}</h1>
        </Col>
      </Row>
      <Row>
        <Col className={styles}>{children}</Col>
      </Row>
    </Container>
  );
}

export default SectionFrame;
