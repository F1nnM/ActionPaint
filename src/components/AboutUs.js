import SectionFrame from "./SectionFrame";
import team from "../data/team";
import styles from "./ExampleSection.module.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

function Playground({ name, children }) {
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
          <Card>
            <Card.Img
              variant="top"
              src={
                process.env.PUBLIC_URL +
                "team_images/" +
                member.name.toLowerCase() +
                ".jpg"
                /* could not load image via import because in public folder */
              }
            />
            <Card.Body>
              <Card.Title>{member.name}</Card.Title>
              <Card.Text>
                {member.info || "This member hasn't uploaded infos so far"}
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer> */}
          </Card>
        ))}
      </CardDeck>
      <ul className={styles.aboutUsClass}>
        <li></li>
      </ul>
    </SectionFrame>
  );
}

export default Playground;
