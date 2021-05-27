import styles from "./Navbar.module.scss";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-scroll";

function NavbarFunc({ hideNavbar, data }) {
  var Scrollspeed = 500;  
  const artists = data.artists;

  return (
    <>
    {/* Create navbar which collapses based on a visible percentage of the titlescreen-component (90%).
        Embed clickable logo and title to return to the titlescreen.
          */}
      <Navbar
        expand={hideNavbar ? !hideNavbar : "sm"}
        fixed="top"
        className={hideNavbar ? "" : styles.navbar}
      >
        <Link
          activeClass="active"
          to="TitleScreen"
          className={hideNavbar ? styles.navbaralt : ""}
          spy={true}
          smooth={true}
          duration={Scrollspeed}
        >
          <Navbar.Brand className={styles.brand}>
          <object
            type="image/svg+xml"
            data={process.env.REACT_APP_BACKEND + "images/logo_static.svg"}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Navbar Logo">
            <img src={process.env.REACT_APP_BACKEND + "images/logo_static.svg"} alt="Logo"/>
          </object>
          {' '}
          {data.brand.title}
        </Navbar.Brand>
        </Link>

        {/* Enable toggle and style the hamburger menu and the link elements while being collapsed (including mobile)*/}

        <Navbar.Toggle className={styles.hamburger} />
        <Navbar.Collapse className={!hideNavbar ? styles.smallCollapse : styles.collapseabletext}>
          <Nav>
            <NavDropdown title={data.sections["Our Artists"]}>

              {/* Iterate over all artists and create a corresponding dropdown item with a link to its component */}

              {artists.map((artist, index) => (
                <NavDropdown.Item key={artist.firstName + artist.lastName}>
                  <Link
                    to={index + ": " + artist.firstName + " " + artist.lastName}
                    key={"Link" + index}
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={Scrollspeed}
                  >
                    <NavDropdown.ItemText className={styles.dropitem}>
                      <PersonIcon />
                      {artist.firstName} {artist.lastName}
                    </NavDropdown.ItemText>
                  </Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* Create links for all remaining sections with dynamic titles based on the adminsection input */}

            <Link
              activeClass="active"
              to="About Us"
              spy={true}
              smooth={true}
              duration={Scrollspeed}
              className={styles.navitem}
            >
              <Container className={styles.navitem} bsPrefix={'nav-link'}>{data.sections["About Us"]}</Container>
            </Link>
            <Link
              activeClass="active"
              to="What We Do"
              spy={true}
              smooth={true}
              duration={Scrollspeed}
              className={styles.navitem}
            >
              <Container className={styles.navitem} bsPrefix={'nav-link'}>{data.sections["What We Do"]}</Container>
            </Link>
            <Link
              activeClass="active"
              to="FAQ"
              spy={true}
              smooth={true}
              duration={Scrollspeed}
              className={styles.navitem}
            >
              <Container className={styles.navitem} bsPrefix={'nav-link'}>{data.sections["FAQ"]}</Container>
            </Link>
            <Link
              activeClass="active"
              to="Contact Us"
              spy={true}
              smooth={true}
              duration={Scrollspeed}
              className={styles.navitem}
            >
              <Container className={styles.navitem} bsPrefix={'nav-link'}>{data.sections["Contact Us"]}</Container>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <svg viewBox="0 0 2.6470001 3.97" className={styles.dropletShadow + " " + styles.droplet + " " + (!hideNavbar ? styles.dripanimation : "")}>
        {/* This is the droplet shadow */}
        <g transform="translate(0,-19.03)">
          <path
            id="Droplet"
            d="M 2.645834,21.677083 C 2.645834,22.40771 2.053544,23 1.322917,23 0.59229,23 0,22.40771 0,21.677083 c 0,-0.730627 0.529167,-1.5875 1.5875,-2.645833 0.264584,1.852083 1.058334,1.915206 1.058334,2.645833 z" />
        </g>
      </svg>
      <svg viewBox="0 0 2.6470001 3.97" className={styles.droplet + " " + (!hideNavbar ? styles.dripanimation : "")}>
        {/* This is the droplet itself */}
        <g transform="translate(0,-19.03)">
          <path
            id="Droplet"
            d="M 2.645834,21.677083 C 2.645834,22.40771 2.053544,23 1.322917,23 0.59229,23 0,22.40771 0,21.677083 c 0,-0.730627 0.529167,-1.5875 1.5875,-2.645833 0.264584,1.852083 1.058334,1.915206 1.058334,2.645833 z" />
        </g>
      </svg>
      {!hideNavbar && (
        <svg viewBox="0 0 100 6" className={styles.curvedBaseNavbar}>
        {/* This is the base body of the navbarextension */}
        <g transform="scale(0.05555556,0.49937021)">
          <path d="M 0,0 H 1800 V 6 C 1292.2945,-0.5551 443.3498,-1 0,6 Z" />
        </g>
      </svg>
      )}
      {!hideNavbar && (
       <svg viewBox="0 0 200 14" className={styles.curvedDripNavbar}>
       {/* This is the body of the navbar with the building body of the droplet*/}
       <g>
         <path d="M 32,0.2553291 C -0.36636208,0.3477646 1.7979987e-4,0 1.7979987e-4,0 17.318234,0.2643583 12.671446,7.5171128 16.654902,7.5124378 19.642496,7.5089598 14.709115,0.28731875 32,0.2553291 Z" />
       </g>
     </svg>
      )}        
    </>
  );
}

export default NavbarFunc;
