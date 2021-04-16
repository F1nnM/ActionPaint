import styles from './Navbar.module.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import artists from "../data/artists";
import PersonIcon from '@material-ui/icons/Person';

function NavbarFunc ({tmpinView}){

  return(
    <Navbar expand={tmpinView ? !tmpinView : "sm"} fixed="top" className={tmpinView ? "" : styles.navbar}>
    <Navbar.Brand href={"#TitleScreen"} className={tmpinView ? styles.navbaralt : styles.navbar}>ActionPaint</Navbar.Brand>
    <Navbar.Toggle className={styles.hamburger}/>
    <Navbar.Collapse className={!tmpinView ? styles.navbar : styles.collapseabletext} >
      <Nav>
        <NavDropdown title="Top Artists">
        {artists.map((ar, index) => (
          <NavDropdown.Item key={"NavDropdown"+index} className={styles.dropitem} href={"#"+ar.lastName+index}>
            <NavDropdown.ItemText className={styles.dropitem}><PersonIcon />{ar.firstName} {ar.lastName}</NavDropdown.ItemText>
          </NavDropdown.Item>
          ))}
        </NavDropdown>
        <Nav.Link href={"#About Us"}>About Us</Nav.Link>
        <Nav.Link href={"#What We Do"}>What We Do</Nav.Link>
        <Nav.Link href={"#FAQ"}>FAQ</Nav.Link>
        <Nav.Link href={"#Contact Us"}>Contact</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default NavbarFunc;
