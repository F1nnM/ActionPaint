import { Col, Container, Row } from "react-bootstrap";

import styles from './Footer.module.css'

import Twitter from '@material-ui/icons/Twitter'
import Instagram from '@material-ui/icons/Instagram'
import Mail from '@material-ui/icons/Mail'
import LinkedIn from '@material-ui/icons/LinkedIn'
import CopyrightIcon from '@material-ui/icons/Copyright';

function Footer() {
  return (
    <Container fluid className={styles.footerContainer+" py-3"}>
      <Row className="py-2 text-uppercase">
        <Col lg={1} xl={2}/>
        <Col>Impressum</Col>
        <Col>Privacy Policy</Col>
        <Col>
          <Container>
            <Row>
              <Col>
                <Twitter/>
              </Col>
              <Col>
                <Instagram/>
              </Col>
              <Col>
                <LinkedIn/>
              </Col>
              <Col>
                <Mail/>
              </Col>
              
            </Row>
          </Container>
        </Col>
        <Col lg={1} xl={2}/>
      </Row>

      <Row className="py-2">
        <Col className="text-center">
          <span>&copy; ActionPaint 2021</span>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
