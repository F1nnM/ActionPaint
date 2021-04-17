import styles from './Navbar.module.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import { Link, Events, scrollSpy } from 'react-scroll'

function NavbarFunc ({tmpinView, data}){

  var Scrollspeed = 500;

  Events.scrollEvent.register('begin', function(to, element) {
    console.log('begin', to, element);
  });
  Events.scrollEvent.register('end', function(to, element) {
    console.log('end', to, element);
  });
  scrollSpy.update();

  const artists = data.artists

  return(
    <Navbar expand={tmpinView ? !tmpinView : "sm"} fixed="top" className={tmpinView ? "" : styles.navbar}>
    <Link activeClass="active" className={tmpinView ? styles.navbaralt : styles.navbar} to="TitleScreen" spy={true} smooth={true} duration={Scrollspeed}>
      <Navbar.Brand className={tmpinView ? styles.navbaralt : styles.navbar}>
        ActionPaint
      </Navbar.Brand>
    </Link>
    <Navbar.Toggle className={styles.hamburger}/>
    <Navbar.Collapse className={!tmpinView ? styles.navbar : styles.collapseabletext} >
      <Nav>
        <NavDropdown title="Top Artists">
        {artists.map((ar, index) => (
          <Link key={"Link"+index} activeClass="active" to={ar.lastName+index} spy={true} smooth={true} duration={Scrollspeed}>
            <NavDropdown.Item>
              <NavDropdown.ItemText className={styles.dropitem}>
                <PersonIcon />{ar.firstName} {ar.lastName}
              </NavDropdown.ItemText>
            </NavDropdown.Item>
          </Link>
          ))}
        </NavDropdown>
        <Link activeClass="active" to="About Us" spy={true} smooth={true} duration={Scrollspeed}><Nav.Link>About Us</Nav.Link></Link>
        <Link activeClass="active" to="What We Do" spy={true} smooth={true} duration={Scrollspeed}><Nav.Link>What We Do</Nav.Link></Link>
        <Link activeClass="active" to="FAQ" spy={true} smooth={true} duration={Scrollspeed}><Nav.Link>FAQ</Nav.Link></Link>
        <Link activeClass="active" to="Contact Us" spy={true} smooth={true} duration={Scrollspeed}><Nav.Link>Contact</Nav.Link></Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default NavbarFunc;
