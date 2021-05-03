import { Col, Row } from "react-bootstrap";
import styles from "./NavFrame.module.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import logo from '../img/logo.svg';

function NavFrame({ tabs, children }) {
  return (
    <>
      <Tab.Container className={"mt-4"}>
        <Row>
          <Col md={2}>

            <ListGroup
              defaultActiveKey={"#" + (tabs.length > 0 ? tabs[0].label : "")}
            >
              <ListGroup.Item variant="dark" className={styles.title}>
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Navbar Logo"
                  />{' '}
                  <span>ActionPaint</span>
              </ListGroup.Item>
              {tabs.map((tab) => (
                <>
                  {tab.isBreak && (
                    <>
                      <br />
                    </>
                  )}
                  <ListGroup.Item action href={"#" + tab.label}>
                    {tab.label}
                  </ListGroup.Item>
                </>
              ))}
            </ListGroup>
          </Col>
          <Col md={10}>
            <Tab.Content>
              {tabs.map((tab, index) => (
                <>
                  <Tab.Pane eventKey={"#" + tab.label}>
                    {tab.component}
                  </Tab.Pane>
                </>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default NavFrame;
