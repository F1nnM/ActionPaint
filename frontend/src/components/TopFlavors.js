import styles from "./TopFlavors.module.scss";
// import { useState } from "react";
import artists from "../data/artists";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function TopFlavors(alternatingView) {
  /* const [index, setIndex] = useState(0);

  const handleSelect = (index, e) => {
    setIndex(index);
  }; */

  const handleScroll = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div onScroll={handleScroll}>
      {artists.map((ar, index) => (
        <Container className="mt-4">
          <Row className={styles.artistHeight}>
            <Col
              sm={12}
              md={{ span: 7, order: (index + 1) % 2 === 0 ? "last" : "first" }}
            >
              <Image
                className={"d-block w-100 "}
                src={
                  process.env.PUBLIC_URL +
                  "artists/" +
                  (ar.firstName + "_" + ar.lastName).toLowerCase() +
                  "/" +
                  (ar.gallery || ar.images[0])
                }
                rounded
              />
            </Col>
            <Col sm={12} md={5}>
              <Card>
                <Card.Img
                  variant="top"
                  fluid
                  className={styles.cardImg}
                  src="https://lms.dhbw-heidenheim.de/pluginfile.php/1/theme_adaptable/logo/1615896280/lms.png"
                />
                <Card.Body>
                  <Card.Title>
                    <span className="mr-1">
                      <small> {ar.firstName}</small>
                    </span>
                    <span>{ar.lastName}</span>
                  </Card.Title>
                  <Card.Text>
                    <span className={styles.descEllipsis}>
                      {ar.shortDesc || ar.desc}
                    </span>
                  </Card.Text>
                  <Button variant="outline-primary">Visit my work</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
}

export default TopFlavors;
