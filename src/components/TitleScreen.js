import styles from './TitleScreen.module.css'

import { Container } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';

function TitleScreen() {

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.9,
  });

  return (
    <Container className={styles.fullHeight + " " + styles.backgroundImage+ " d-flex flex-column"} ref={ref}>
      <div className="flex-grow-1"/>
      <div>
        <div className="text-center">
          <span className={styles.title}>ActionPaint</span>
        </div>
      </div>
      <div>
        <div className="text-center">
          <span className={styles.subtitle}>- The modern agency for modern artists -</span>
        </div>
      </div>
      <div className="flex-grow-1"/>
      <div>
        <div className={styles.scrollNotice+" text-center"}>
          <span className={styles.shadowBack + ' ' + styles.hideable + (inView?'': ' '+styles.hidden)}>v Scroll down v</span>
        </div>
      </div>
    </Container>
  );
}

export default TitleScreen;
