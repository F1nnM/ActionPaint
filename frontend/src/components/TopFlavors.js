import styles from "./TopFlavors.module.scss";
// import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";

function TopFlavors({ data }) {
  const artists = data.artists;

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
      {artists.map((artist, index) => (
        <div>
          <Card className={"mb-4"} style={{ maxWidth: "600px" }}>
            <Row className="no-gutters">
              <Col md={{ order: index % 2 === 0 ? "first" : "last" }}>
                <Card.Img
                  variant="top"
                  className={`d-block ${styles.workImg} ${
                    index % 2 === 0 ? "mr-4" : "ml-4"
                  }`}
                  src={
                    process.env.REACT_APP_BACKEND +
                    "images/artist/" +
                    artist.images[0]
                  }
                  rounded
                />
              </Col>
              <Col>
                <Card.Body>
                  <Card.Title>
                    <span className="mr-1">
                      <small> {artist.firstName}</small>
                    </span>
                    <span>{artist.lastName}</span>
                  </Card.Title>
                  <Card.Text>
                    <span className={styles.descEllipsis}>
                      {artist.shortDesc || artist.desc}
                    </span>
                  </Card.Text>
                  <Button variant="outline-primary">Visit my work</Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          {/* <Container
            key={artist.lastName + index}
            id={artist.lastName + index}
            className="mt-4"
            style={{ height: "20rem" }}
          >
            <Row>
              <Col
                sm={12}
                md={{
                  span: 7,
                  order: (index + 1) % 2 === 0 ? "last" : "first",
                }}
              >
                <div style={{ height: "100%" }}>
                  <ResponsiveEmbed aspectRatio="16by9">
                    <Image
                      className={"d-block w-100 " + styles.workImg}
                      src={
                        process.env.REACT_APP_BACKEND +
                        "images/artist/" +
                        artist.images[0]
                      }
                      rounded
                    />
                  </ResponsiveEmbed>
                </div>
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
                        <small> {artist.firstName}</small>
                      </span>
                      <span>{artist.lastName}</span>
                    </Card.Title>
                    <Card.Text>
                      <span className={styles.descEllipsis}>
                        {artist.shortDesc || artist.desc}
                      </span>
                    </Card.Text>
                    <Button variant="outline-primary">Visit my work</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container> */}
        </div>
      ))}
    </div>
  );
}

/* 

*/

export default TopFlavors;
