import { Col, Row } from "react-bootstrap";
import styles from "./NavFrame.module.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";

function NavFrame({ tabs, children, data, goBack}) {
  return (
    <>
      <Tab.Container className={"mt-4"}>
        <Row>
          <Col md={2}>
            <ListGroup defaultActiveKey={"#" + tabs[0].label}>
              <ListGroup.Item variant="dark"  action className={styles.title} onClick={_=>goBack()}>
                <object className={styles.logo} type="image/svg+xml" data={process.env.REACT_APP_BACKEND + "images/logo_static.svg"}>
                  <img src={process.env.REACT_APP_BACKEND + "images/logo_static.svg"} alt="Logo" />
                </object><span>{data.brand.title}</span>
              </ListGroup.Item>
              {tabs.map((tab, idx) => (
                <>
                  {tab.isBreak && (
                    <>
                      <br />
                    </>
                  )}
                  <ListGroup.Item action href={"#" + tab.label} key={idx}>
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
