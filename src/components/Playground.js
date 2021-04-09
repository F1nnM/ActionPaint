import SectionFrame from "./SectionFrame";

import styles from "./ExampleSection.module.css";
import DrippingFrame from "./DrippingFrame";

function Playground({ name, children }) {
  return (
    <SectionFrame title="Playground">
      <p>Here you can play around without messing up existing components</p>
      <p>{name}</p>
      <p className={styles.playgroundLabel}>
        I will be displayed in blue color
      </p>
      <DrippingFrame>
        <span>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </span>
      </DrippingFrame>
      <div>{children}</div>
    </SectionFrame>
  );
}

export default Playground;
