import styles from "./ArtistCarousel.module.scss";
import { useState } from "react";
import artists from "../data/artists";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

function ArtistCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (index, e) => {
    setIndex(index);
  };

  const handleScroll = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div onScroll={handleScroll}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {artists.map((ar) => (
          <Carousel.Item>
            {/* <Image
            className={styles.carHeight}
            src={
              process.env.PUBLIC_URL +
              "artists/" +
              (ar.first_name + "_" + ar.last_name).toLowerCase() +
              "/" +
              (ar.gallery || ar.images[0])
            }
            rounded
          /> */}
            <img
              className={"d-block w-100 " + styles.carHeight}
              src={
                process.env.PUBLIC_URL +
                "artists/" +
                (ar.first_name + "_" + ar.last_name).toLowerCase() +
                "/" +
                (ar.gallery || ar.images[0])
                // when no image set as gallery, take first from others
              }
              alt="First slide"
            />
            <Carousel.Caption>
              <div className={styles.triggerLink}>
                <h3>
                  <span>
                    <small>{ar.first_name + "   "}</small>
                  </span>
                  <span>{ar.last_name}</span>
                </h3>
                <div className={styles.toBeHidden}>
                  <p>go to artist page</p>
                </div>
              </div>
              {ar.desc && <p>{ar.desc}</p>}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ArtistCarousel;
