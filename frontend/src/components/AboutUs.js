import SectionFrame from "./SectionFrame";
import team from "../data/team";
import styles from "./AboutUs.module.css";
import { Card, CardDeck } from "react-bootstrap";
import { useState } from "react";
import { GitHub, Twitter, Instagram } from "@material-ui/icons";

function Playground({ name, children }) {
  const [spotlight, setSpotlight] = useState("light");

  return (
    <SectionFrame title="About Us">
      <Card className="bg-dark text-white">
        <Card.Img
          src={process.env.PUBLIC_URL + "team_images/team.jpg"}
          alt="Our team"
        />
        <Card.ImgOverlay>
          <Card.Title>Meet our team</Card.Title>
          <Card.Text>{team.info || "No info stored yet"}</Card.Text>
        </Card.ImgOverlay>
      </Card>
      <p></p>
      <CardDeck>
        {team.members.map((member) => (
          <Card border={spotlight === member.name ? "primary" : "light"}>
            <Card.Img
              onMouseEnter={(_) => {
                setSpotlight(member.name);
              }}
              onMouseOut={(_) => {
                setSpotlight("light");
              }}
              variant="top"
              className={styles.imageFit}
              src={
                process.env.PUBLIC_URL +
                "team_images/" +
                (member.imageUrl || member.name.toLowerCase()) +
                ".jpg"
                /* could not load image via import because in public folder */
              }
            />
            <Card.Body>
              <Card.Title>{member.name}</Card.Title>
              <Card.Text>
                {member.info || "This member hasn't uploaded infos so far"}
              </Card.Text>
              <div>
                {member.githubName && (
                  <a
                    href={"https://github.com/" + member.githubName}
                    role="button"
                  >
                    <GitHub />
                  </a>
                )}
                {member.instaName && (
                  <a
                    href={"https://instagram.com/" + member.instaName}
                    role="button"
                  >
                    <Instagram />
                  </a>
                )}
                {member.twitterName && (
                  <a
                    href={"https://twitter.com/" + member.twitterName}
                    role="button"
                  >
                    <Twitter />
                  </a>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </SectionFrame>
  );
}

export default Playground;
