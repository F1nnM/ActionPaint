import SectionFrame from "./SectionFrame";
import faq from "../data/faq";
import HelpIcon from '@material-ui/icons/Help';
import { Accordion, Card, Button} from 'react-bootstrap';
import styles from './FAQ.module.css';

function FAQ({ name, children }) {
  return (
    <SectionFrame title="FAQ">
      <Accordion defaultActiveKey="0"> 
        {faq.map((questions, idx) => (
          <Card bsPrefix={idx % 2 === 0 ? styles.orangeborder : styles.blueborder}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="light" eventKey={idx+1}>
                <p><HelpIcon className={ idx % 2 === 0 ? styles.orange : styles.blue}/>  
                <span className={idx % 2 === 0 ? styles.orange : styles.blue}> {questions.q}</span></p>
              </Accordion.Toggle>
            </Card.Header>
              <Accordion.Collapse eventKey={idx+1}>
                <Card.Body>
                  {questions.a}
                </Card.Body>
              </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </SectionFrame>
  );
}

export default FAQ;
