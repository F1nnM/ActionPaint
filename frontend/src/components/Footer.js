import { Col, Container, Row, Button } from "react-bootstrap";

import styles from "./Footer.module.scss";

import Twitter from "@material-ui/icons/Twitter";
import Instagram from "@material-ui/icons/Instagram";
import ContactMail from "@material-ui/icons/ContactMail";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Phone from "@material-ui/icons/Phone";
import Business from "@material-ui/icons/Business";
import LocationOn from "@material-ui/icons/LocationOn";
import React from "react";

function Footer({ showPrivacyPolicyPopup, switchToAdmin, data}) {

  const brand_data = data["brand"];

  return (
    <React.Fragment>
      <Container fluid className={styles.footerLeadIn}>
        <Row>
          <Col>
            <svg viewBox="0 0 200 16">
              <g>
                <path
                  style={{ fill: "var(--primaryColor)" }}
                  d="M 0,4.7433767 C 71.509152,33.446133 112.41464,-13.201926 199.93429,3.8725987 L 199.99999,16 H 0.0421015 Z"
                />
              </g>
            </svg>
          </Col>
        </Row>
      </Container>
      <Container fluid className={styles.footerContainer + " py-3"}>
        <Row className="py-2">
          <Col md lg={1} xl={2} />
          <Col md className="text-lg-start">
            <div className="text-center">
              <span className="text-uppercase">Impressum - Legal Notice</span>
            </div>
            <address className="mt-3">
              <p>
                <Business className="mr-3" />
                {brand_data.companyName}
              </p>
              <p>
                <LocationOn className="mr-3" />
                <a
                  href={brand_data.mapsLink}
                  className={styles.colorReset}
                >
                  {brand_data.location}
                </a>
              </p>
              <p>
                <ContactMail className="mr-3" />
                <a href={"mailto:"+brand_data.mail} className={styles.colorReset}>
                  {brand_data.mail}
                </a>
              </p>
              <p>
                <Phone className="mr-3" />
                <a href={"tel:"+brand_data.telephone} className={styles.colorReset}>
                  {brand_data.telephone}
                </a>
              </p>
            </address>
          </Col>
          <Col md className=" text-lg-start mt-5 mt-md-0">
            <div className="text-center">
              <span className="text-uppercase">Privacy Policy</span>
            </div>
            <p className="mt-3">
              We don't collect any data from you, unless you reach out to us.
              For details click{" "}
              <a className={styles.colorReset} href="#0" onClick={() => showPrivacyPolicyPopup()}>here</a>
              .
            </p>
          </Col>
          <Col md className="mt-5 mt-md-0">
            <Container className="text-center text-lg-start">
              <span className="text-uppercase">Social</span>
              <Row>
                <Col lg className="mt-3">
                  <a href={"https://twitter.com/"+brand_data.twitter} className={styles.colorReset} target="_blank" rel="noreferrer">
                    <Twitter />
                  </a>
                </Col>
                <Col lg className="mt-3">
                  <a href={"https://instagram.com/"+brand_data.instagram} className={styles.colorReset} target="_blank" rel="noreferrer">
                    <Instagram />
                  </a>
                </Col>
                <Col lg className="mt-3">
                  <a href={"https://linkedin.com/"+brand_data.linkedin} className={styles.colorReset} target="_blank" rel="noreferrer">
                    <LinkedIn />
                  </a>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md lg={1} xl={2} />
        </Row>

        <Row className="py-5">
          <Col className="text-center">
            <span>&copy; {brand_data.copyright}</span>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button onClick={switchToAdmin} variant="dark">
              Secret admin button
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Footer;
