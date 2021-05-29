import HelpIcon from "@material-ui/icons/Help";
import { Accordion, Card } from "react-bootstrap";
import styles from "./FAQ.module.scss";

function FAQ({ data }) {
  const faq = data.faq;

  return (
    <Accordion defaultActiveKey="0">
      {/* Iterating over faq.json while assigning colors based on index (odd = primary, even = accent). 
          Header/Toggle = Question
          Body/Collapse = Answer     
          */}
      {faq.map((question, index) => (
        <Card
          key={`Card${index}`}
          bsPrefix={ `${styles.FAQBorder} mb-4 ${index % 2 === 0 ? styles.primaryBorder : styles.accentBorder}`}
        >
          <Card.Header
            className={
              `${styles.cardheader} ${(index % 2 === 0 ? `text-primary ${styles.bgAccent}` : `bg-primary ${styles.textAccent}`)}`
            }
          >
            <Accordion.Toggle
              className={styles.button}
              as={Card.Header}
              eventKey={index + 1}
            >
              <p style={{ cursor: "pointer" }}>
                <HelpIcon
                  className={
                    index % 2 === 0
                      ? `text-primary ${styles.bgAccent}`
                      : "text-primary"
                  }
                />
                <span
                  className={
                    index % 2 === 0
                      ? `text-primary ${styles.bgAccent}`
                      : "text-primary"
                  }
                >
                  {" "}
                  {question.q}
                </span>
              </p>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={index + 1}>
            <Card.Body className={styles.answer}>{question.a}</Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
}

export default FAQ;
