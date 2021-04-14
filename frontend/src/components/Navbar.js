import styles from './Navbar.module.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {useState} from 'react';

function NavbarFunc (){
  const [expanded = true, setExpanded] = useState(false);
  window.onscroll = function(){
    if(window.pageYOffset >= 890){
      setExpanded(true);
    }else{
      setExpanded(false);
    }
  }
  return(
    <Navbar expand={expanded} fixed="top" className={expanded ? styles.navbar : "" }>
    <Navbar.Brand className={expanded ? styles.navbar : styles.navbaralt }>ActionPaint</Navbar.Brand>
    <Navbar.Toggle className={styles.hamburger} aria-controls="responsive-navbar-nav"/>
    <Navbar.Collapse className={expanded ? styles.navbar : styles.collapseabletext}>
      <Nav>
        <NavDropdown title="Our Artists">
          <NavDropdown.Item href={"#Example Section"}>
            <NavDropdown.ItemText>Artist 1</NavDropdown.ItemText>
          </NavDropdown.Item>
          <NavDropdown.Item href={"#Example Section"}>
            <NavDropdown.ItemText>Artist 2</NavDropdown.ItemText>
          </NavDropdown.Item>
          <NavDropdown.Item href={"#Playground"}>
            <NavDropdown.ItemText>Artist 3</NavDropdown.ItemText>
          </NavDropdown.Item>
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
