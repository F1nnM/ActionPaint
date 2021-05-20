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
      {faq.map((questions, idx) => (
        <Card
          key={"Card" + idx}
          bsPrefix={
            (idx % 2 === 0 ? styles.primaryBorder : styles.accentBorder) +
            " mb-4 " +
            styles.borderBottomOnly
          }
        >
          <Card.Header
            className={
              (idx % 2 === 0
                ? "text-primary " + styles.bgAccent
                : "bg-primary " + styles.textAccent) +
              " " +
              styles.cardheader
            }
          >
            <Accordion.Toggle
              className={styles.button}
              as={Card.Header}
              eventKey={idx + 1}
            >
              <p style={{ cursor: "pointer" }}>
                <HelpIcon
                  className={
                    idx % 2 === 0
                      ? "text-primary " + styles.bgAccent
                      : "text-primary"
                  }
                />
                <span
                  className={
                    idx % 2 === 0
                      ? "text-primary " + styles.bgAccent
                      : "text-primary"
                  }
                >
                  {" "}
                  {questions.q}
                </span>
              </p>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={idx + 1}>
            <Card.Body className={styles.answer}>{questions.a}</Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
}

export default FAQ;
