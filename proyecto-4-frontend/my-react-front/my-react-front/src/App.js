import "./App.css";
import MyComponent from "./MyComponent";
import Nav from "./components/Nav";
import Admin from "./components/Admin";
import Allverbs from "./components/Allverbs";
import Randomverb from "./components/Randomverb";
import Quiz from "./components/Quiz";
import Knownverbs from "./components/Knownverbs";
import Halloffame from "./components/Halloffame";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Handlelogin from './components/Handlelogin';
import useToken from './hooks/useToken';
import Userheader from './components/userheader/Userheader';
import jwt_decode from 'jwt-decode';
import Loginadmin from "./components/Loginadmin";
import Error404 from "./components/Error404";


function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Handlelogin setToken={setToken} />
  }

  // check for role
let localStorageToken = JSON.parse(localStorage.getItem("token"));
let tokenForRole = (localStorageToken) ? localStorageToken.token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.EyJfaWQiOiI2MDYxZmQ5NzgwzYnvv70idXV1dSIsInBvaW50cyI6NDAsInJvbGU.uPoudIpvpgDq1Ul40uEBlGlPgIuc2eU7ruI-mqwkyjQ";
const decoded = jwt_decode(tokenForRole);

let authAdminState;
authAdmin();

function authAdmin() {
    if(decoded.role === "admin") {
        // console.log("TRUE")
        return authAdminState = true;
    } 
    else {
        // console.log("FALSE")
        return authAdminState = false;
    }
}

  function PrivateRoute({ children, ...rest }) {
    return(
      <Route {...rest} render={() => {
        return authAdminState === true
        ? children
        : <Loginadmin setToken={setToken} />
      }}/>
    )
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="with-header">
        <Userheader authAdminState={authAdminState}/>
        <Switch>
          <Route path="/" exact component={Home} />
          
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>

          <Route path="/allverbs" component={Allverbs} />
          <Route path="/randomverb" component={Randomverb} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/knownverbs" component={Knownverbs} />
          <Route path="/halloffame" component={Halloffame} />
          <Route component={Error404} />
          
        </Switch>
      </div>
      </div>
    </Router>
  );
}

export default App;
