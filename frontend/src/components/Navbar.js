import styles from "./Navbar.module.scss";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";
import { Link, Events, scrollSpy } from "react-scroll";
import { ReactComponent as ReactLogo} from '../img/logo.svg';

function NavbarFunc({ tmpinView, data }) {
  var Scrollspeed = 500;

  Events.scrollEvent.register("begin", function (to, element) {
    console.log("begin", to, element);
  });
  Events.scrollEvent.register("end", function (to, element) {
    console.log("end", to, element);
  });
  scrollSpy.update();

  const artists = data.artists;

  return (
    <Navbar
      expand={tmpinView ? !tmpinView : "sm"}
      fixed="top"
      className={tmpinView ? "" : styles.navbar}
    >
      <Link
        activeClass="active"
        to="TitleScreen"
        className={tmpinView ? styles.navbaralt : styles.navbar}
        spy={true}
        smooth={true}
        duration={Scrollspeed}
      >
        <Navbar.Brand className={styles.brand}>
          <ReactLogo 
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Navbar Logo"
            />{' '}
          ActionPaint
        </Navbar.Brand>
        
      </Link>
      <Navbar.Toggle className={styles.hamburger} />
      <Navbar.Collapse
        className={!tmpinView ? styles.navbar : styles.collapseabletext}
      >
        <Nav>
          <NavDropdown title="Top Artists">
            {artists.map((ar, index) => (
              <NavDropdown.Item key={ar.firstName+ar.lastName}>
                <Link
                  to={index + ": " + ar.firstName + " " + ar.lastName}
                  key={"Link" + index}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={Scrollspeed}
                >
                  <NavDropdown.ItemText className={styles.dropitem}>
                    <PersonIcon />
                    {ar.firstName} {ar.lastName}
                  </NavDropdown.ItemText>
                </Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <Link
            activeClass="active"
            to={data["sections"]["About Us"]}
            spy={true}
            smooth={true}
            duration={Scrollspeed}
          >
            <Nav.Link>{data["sections"]["About Us"]}</Nav.Link>
          </Link>
          <Link
            activeClass="active"
            to={data["sections"]["What We Do"]}
            spy={true}
            smooth={true}
            duration={Scrollspeed}
          >
            <Nav.Link>{data["sections"]["What We Do"]}</Nav.Link>
          </Link>
          <Link
            activeClass="active"
            to={data["sections"]["FAQ"]}
            spy={true}
            smooth={true}
            duration={Scrollspeed}
          >
            <Nav.Link>{data["sections"]["FAQ"]}</Nav.Link>
          </Link>
          <Link
            activeClass="active"
            to={data["sections"]["Contact Us"]}
            spy={true}
            smooth={true}
            duration={Scrollspeed}
          >
            <Nav.Link>{data["sections"]["Contact Us"]}</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarFunc;
