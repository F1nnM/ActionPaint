import SectionFrame from "./SectionFrame";

import styles from "./ExampleSection.module.css";

function Playground({ name, children }) {
  var team = [
    {
      name: "Fabian",
      age: 20,
    },
    {
      name: "Finn",
      age: 20,
    },
    {
      name: "Bernd",
      age: 20,
    },
  ];

  return (
    <SectionFrame title="About Us">
      <p>So...what to write here? Well, we're a cool team.</p>
      <p>Lorem ipsum</p>
      <ul className={styles.aboutUsClass}>
        <li>
          {team.map((member) => (
            <div>
              <p>{member.name}</p>
              <p>{member.age}</p>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "team_images/" +
                  member.name.toLowerCase() +
                  ".jpg"
                  /* could not load image via import because in public folder */
                }
                alt={"Picture of " + member.name}
              />
              <p>
                {(process.env.PUBLIC_URL + member.name + ".jpg").toLowerCase()}
              </p>
            </div>
          ))}
        </li>
      </ul>
    </SectionFrame>
  );
}

export default Playground;
