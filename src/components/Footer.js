import { Col, Container, Row } from "react-bootstrap";

import styles from './Footer.module.css'

import Twitter from '@material-ui/icons/Twitter'
import Instagram from '@material-ui/icons/Instagram'
import ContactMail from '@material-ui/icons/ContactMail'
import LinkedIn from '@material-ui/icons/LinkedIn'
import Phone from '@material-ui/icons/Phone'
import Business from '@material-ui/icons/Business';
import LocationOn from '@material-ui/icons/LocationOn';
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
                  style={{ "fill": "var(--primaryColor)" }}
                  d="M 0,4.7433767 C 71.509152,33.446133 112.41464,-13.201926 199.93429,3.8725987 L 199.99999,16 H 0.0421015 Z" />
              </g>
            </svg>
          </Col>
        </Row>
      </Container>
      <Container fluid className={styles.footerContainer + " py-3"}>
        <Row className="py-2">
          <Col lg={1} xl={2} />
          <Col>
            <span className="text-uppercase">Impressum - Legal Notice:</span>
            <address className="mt-3">
              <p><Business className='mr-3' />ActionPaint Agency GmbH</p>
              <p><LocationOn className='mr-3' />Max-Muster Straße 42, 12345 Berlin</p>
              <p><ContactMail className='mr-3' /><a href="mailto:jim@rock.com" className={styles.colorReset}>contact@actionpaint.de</a></p>
              <p><Phone className='mr-3' /><a href="tel:+13115552368" className={styles.colorReset}>(+49) 123 456 789</a></p>
            </address>
          </Col>
          <Col>
            <span className="text-uppercase">Privacy Policy</span>
            <p className="mt-3">We don't collect any data from you, unless you reach out to us. For details click <a href="privacyPolicy.txt" className={styles.colorReset+" "+styles.underline}>here</a>.</p>
          </Col>
          <Col>
            <Container>
              <Row>
                <Col>
                  <a href="https://twitter.com" className={styles.colorReset}><Twitter /></a>
                </Col>
                <Col>
                  <a href="https://instagram.com" className={styles.colorReset}><Instagram /></a>
                </Col>
                <Col>
                  <a href="https://linkedin.com" className={styles.colorReset}><LinkedIn /></a>
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
