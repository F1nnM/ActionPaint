import styles from "./TopFlavors.module.scss";
import DrippingFrame from "./DrippingFrame";
import { Card, Button, Row, Col, Carousel } from "react-bootstrap";

function TopFlavors({ data }) {
  const artists = data.artists;

  return (
    <>
      {artists.map((artist, index) => (
        /* Iterate over all Artists and create a Dripping Frame Container with their corresponding:
              - Picture Slideshow (Carousel)
              - Name
              - Description
              - Link to their Work (not yet implemented) */
        <DrippingFrame key={artist + index + 3}>
          <Card
            id={index + ": " + artist.firstName + " " + artist.lastName}
            className={styles.card}
          >
            <Row>
              <Col md={{ order: index % 2 === 0 ? 2 : 1 }}>
                {artist.images.length ? (
                  <>
                    <Carousel
                      pause={false}
                      interval={5000}
                      className={styles.carousel}
                    >
                      {artist.images.map((image, idx) => (
                        <Carousel.Item
                          key={image + idx}
                          className={styles.item}
                        >
                          <img
                            className={styles.image + " d-block w-100"}
                            alt={image + idx}
                            width="415"
                            height="270"
                            src={
                              process.env.REACT_APP_BACKEND +
                              "images/artist/" +
                              artist.images[idx]
                            }
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </>
                ) : (
                  <p className="text-center">Artist has no images yet</p>
                )}
              </Col>
              <Col md={{ order: index % 2 === 0 ? 1 : 2 }}>
                <Card.Body className={styles.text}>
                  <Card.Title>
                    {artist.firstName} {artist.lastName}
                  </Card.Title>
                  <Card.Text>{artist.desc}</Card.Text>
                  <Button
                    className={
                      index % 2 === 0
                        ? styles.bgAccent + " text-primary"
                        : styles.textAccent + " bg-primary"
                    }
                  >
                    Visit my work
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </DrippingFrame>
      ))}
      <svg height="0" width="0">
        <defs>
          <clipPath id="svgPath">
            <path
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="1"
              strokeMiterlimit="10"
              d="
      M 180 10 C 290 10 450 50 420 0 C 390 20 450 20 420 250 C 410 270 350 270 260 270 L 40 270 C 0 270 0 260 0 170 C 0 0 0 0 180 10 
              "
            />
          </clipPath>
        </defs>
      </svg>
      <br />
      <br />
      <br />
    </>
  );
}

export default TopFlavors;
