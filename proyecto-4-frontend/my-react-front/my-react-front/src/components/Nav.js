// import './Nav.css';
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";

function Nav() {
  return (
    <ReactBootStrap.Navbar 
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      sticky='top'
    >
      <ReactBootStrap.Navbar.Brand href="/">
        English verbs👩🏻‍🏫
      </ReactBootStrap.Navbar.Brand>
      <ReactBootStrap.Navbar.Toggle aria-controls="responsive-ReactBootStrap.-nav" />
      <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
        <ReactBootStrap.Nav className="mr-auto">
          <ReactBootStrap.Nav.Link href="/">HOME</ReactBootStrap.Nav.Link>
          <ReactBootStrap.Nav.Link href="/admin">ADMIN</ReactBootStrap.Nav.Link>
          <ReactBootStrap.Nav.Link href="/quiz">QUIZ</ReactBootStrap.Nav.Link>
          <ReactBootStrap.Nav.Link href="/halloffame">
            HALL OF FAME
          </ReactBootStrap.Nav.Link>
          <ReactBootStrap.NavDropdown
            title="Verbs"
            id="collasible-nav-dropdown"
          >
            <ReactBootStrap.NavDropdown.Item href="/allverbs">
              ALL VERBS
            </ReactBootStrap.NavDropdown.Item>
            <ReactBootStrap.NavDropdown.Item href="/randomverb">
              RANDOM VERB
            </ReactBootStrap.NavDropdown.Item>
            <ReactBootStrap.NavDropdown.Item href="/knownverbs">
              KNOWN VERBS
            </ReactBootStrap.NavDropdown.Item>
          </ReactBootStrap.NavDropdown>
        </ReactBootStrap.Nav>
      </ReactBootStrap.Navbar.Collapse>
    </ReactBootStrap.Navbar>
  );
}

export default Nav;
