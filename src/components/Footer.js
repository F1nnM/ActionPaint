import { Col, Container, Row } from "react-bootstrap";

import styles from './Footer.module.css'

import Twitter from '@material-ui/icons/Twitter'
import Instagram from '@material-ui/icons/Instagram'
import Mail from '@material-ui/icons/Mail'
import LinkedIn from '@material-ui/icons/LinkedIn'
import React from "react";

function Footer() {
  return (
    <React.Fragment>
      <Container fluid className={styles.footerLeadIn}>
        <Row>
          <Col>
            <svg viewBox="0 0 200 16">
              <g>
                <path
                  id="rect833"
                  style={{ "fill": "#000000" }}
                  d="M 0,4.7433767 C 71.509152,33.446133 112.41464,-13.201926 199.93429,3.8725987 L 199.99999,16 H 0.0421015 Z" />
              </g>
            </svg>
          </Col>
        </Row>
      </Container>
      <Container fluid className={styles.footerContainer + " py-3"}>
        <Row className="py-2 text-uppercase">
          <Col lg={1} xl={2} />
          <Col>Impressum</Col>
          <Col>Privacy Policy</Col>
          <Col>
            <Container>
              <Row>
                <Col>
                  <Twitter />
                </Col>
                <Col>
                  <Instagram />
                </Col>
                <Col>
                  <LinkedIn />
                </Col>
                <Col>
                  <Mail />
                </Col>

              </Row>
            </Container>
          </Col>
          <Col lg={1} xl={2} />
        </Row>

        <Row className="py-2">
          <Col className="text-center">
            <span>&copy; ActionPaint 2021</span>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Footer;
