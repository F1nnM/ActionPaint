import faq from "../data/faq";
import HelpIcon from '@material-ui/icons/Help';
import { Accordion, Card} from 'react-bootstrap';
import styles from './FAQ.module.css';

function FAQ() {
  return (
      <Accordion defaultActiveKey="0"> 
        {faq.map((questions, idx) => (
          <Card bsPrefix={idx % 2 === 0 ? styles.orangeborder : styles.blueborder}>
            <Card.Header className={styles.cardheader}>
              <Accordion.Toggle className={styles.button} as={Card.Header}  eventKey={idx+1}>
                <p><HelpIcon className={ idx % 2 === 0 ? styles.orange : styles.blue}/>  
                <span className={idx % 2 === 0 ? styles.orange : styles.blue}> {questions.q}</span></p>
              </Accordion.Toggle>
            </Card.Header>
              <Accordion.Collapse eventKey={idx+1}>
                <Card.Body className={styles.answer}>
                  {questions.a}
                </Card.Body>
              </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
  );
}

export default FAQ;
