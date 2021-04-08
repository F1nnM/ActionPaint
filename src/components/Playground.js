import SectionFrame from "./SectionFrame";

import styles from "./ExampleSection.module.css";

function Playground() {
  return (
    <SectionFrame title="Playground">
      <p>Here you can play around without messing up existing components</p>
      <p className={styles.playgroundLabel}>
        I will be displayed in blue color
      </p>
    </SectionFrame>
  );
}

export default Playground;
