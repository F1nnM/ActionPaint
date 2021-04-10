import SectionFrame from "./SectionFrame";
import team from "../data/team";
import styles from "./AboutUs.module.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function Playground({ name, children }) {
  const [spotlight, setSpotlight] = useState("light");

  const followLink = (link) => {
    window.location.assign(link);
  };

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
              src={
                member.imageUrl ||
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
              <div>
                {member.githubName && (
                  <button
                    onClick={(_) => {
                      followLink("https://github.com/" + member.githubName);
                    }}
                    className="button"
                  >
                    <svg
                      width="50px"
                      height="50px"
                      viewBox="0 0 24 24"
                      fill="black"
                      class="cursor-pointer"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      ></path>
                    </svg>
                  </button>
                )}
                {member.instaName && (
                  <button
                    onClick={(_) => {
                      followLink("https://instagram.com/" + member.instaName);
                    }}
                    className="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="50px"
                      height="50px"
                    >
                      <g stroke="black">
                        <path d="M256,49.471c67.266,0,75.233.257,101.8,1.469,24.562,1.121,37.9,5.224,46.778,8.674a78.052,78.052,0,0,1,28.966,18.845,78.052,78.052,0,0,1,18.845,28.966c3.45,8.877,7.554,22.216,8.674,46.778,1.212,26.565,1.469,34.532,1.469,101.8s-0.257,75.233-1.469,101.8c-1.121,24.562-5.225,37.9-8.674,46.778a83.427,83.427,0,0,1-47.811,47.811c-8.877,3.45-22.216,7.554-46.778,8.674-26.56,1.212-34.527,1.469-101.8,1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051,78.051,0,0,1-28.966-18.845,78.053,78.053,0,0,1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.8s0.257-75.233,1.469-101.8c1.121-24.562,5.224-37.9,8.674-46.778A78.052,78.052,0,0,1,78.458,78.458a78.053,78.053,0,0,1,28.966-18.845c8.877-3.45,22.216-7.554,46.778-8.674,26.565-1.212,34.532-1.469,101.8-1.469m0-45.391c-68.418,0-77,.29-103.866,1.516-26.815,1.224-45.127,5.482-61.151,11.71a123.488,123.488,0,0,0-44.62,29.057A123.488,123.488,0,0,0,17.3,90.982C11.077,107.007,6.819,125.319,5.6,152.134,4.369,179,4.079,187.582,4.079,256S4.369,333,5.6,359.866c1.224,26.815,5.482,45.127,11.71,61.151a123.489,123.489,0,0,0,29.057,44.62,123.486,123.486,0,0,0,44.62,29.057c16.025,6.228,34.337,10.486,61.151,11.71,26.87,1.226,35.449,1.516,103.866,1.516s77-.29,103.866-1.516c26.815-1.224,45.127-5.482,61.151-11.71a128.817,128.817,0,0,0,73.677-73.677c6.228-16.025,10.486-34.337,11.71-61.151,1.226-26.87,1.516-35.449,1.516-103.866s-0.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486,123.486,0,0,0-29.057-44.62A123.487,123.487,0,0,0,421.018,17.3C404.993,11.077,386.681,6.819,359.866,5.6,333,4.369,324.418,4.079,256,4.079h0Z" />
                        <path d="M256,126.635A129.365,129.365,0,1,0,385.365,256,129.365,129.365,0,0,0,256,126.635Zm0,213.338A83.973,83.973,0,1,1,339.974,256,83.974,83.974,0,0,1,256,339.973Z" />
                        <circle cx="390.476" cy="121.524" r="30.23" />
                      </g>
                    </svg>
                  </button>
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
