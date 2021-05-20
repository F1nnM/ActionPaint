import { Col, Row } from "react-bootstrap";
import styles from "./NavFrame.module.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";

function NavFrame({ tabs, data, goBack, activeTab, onTabChange }) {
  return (
    <>
      <Tab.Container className={"mt-4"} activeKey={tabs[activeTab].label}>
        <Row noGutters>
          <Col md={2}>
            <ListGroup defaultActiveKey={tabs[activeTab].label}>
              <ListGroup.Item
                variant="dark"
                action
                className={styles.title}
                onClick={(_) => goBack()}
              >
                <object
                  className={styles.logo + " d-inline-block align-top"}
                  type="image/svg+xml"
                  data={
                    process.env.REACT_APP_BACKEND + "images/logo_static.svg"
                  }
                  width="30"
                  height="30"
                >
                  <img
                    src={
                      process.env.REACT_APP_BACKEND + "images/logo_static.svg"
                    }
                    alt="Logo"
                  />
                </object>{" "}
                <span>{data.brand.title}</span>
              </ListGroup.Item>
              {tabs.map((tab, index) => (
                <ListGroup.Item
                  action
                  eventKey={tab.label}
                  onClick={(_) => onTabChange(index)}
                  key={tab + index + "2"}
                >
                  {tab.label}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={10}>
            <Tab.Content className={"p-5 overflow-auto "+styles.content}>
              {tabs.map((tab, index) => (
                <Tab.Pane key={tab + index} eventKey={tab.label}>
                  {tab.component}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default NavFrame;
