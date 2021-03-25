// import './Nav.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <h3>Logo</h3>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/admin">
          <li>Admin</li>
        </Link>
        <Link to="/allverbs">
          <li>All verbs</li>
        </Link>
        <Link to="/randomverb">
          <li>Random Verb</li>
        </Link>
        <Link to="/quiz">
          <li>Quiz</li>
        </Link>
        <Link to="/knownverbs">
          <li>Known verbs</li>
        </Link>
        <Link to="/halloffame">
          <li>Hall of fame</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
