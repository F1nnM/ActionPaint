import SectionFrame from "./SectionFrame";

import styles from "./ExampleSection.module.css";

function ExampleSection() {
  return (
    <SectionFrame title="Example Section">
      <span className={styles.exampleClass}>This is some content</span>
    </SectionFrame>
  );
}

export default ExampleSection;
