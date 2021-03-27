import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Preferences from "./components/Preferences/Preferences";
import useToken from './useToken';


function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken}/>
  }
  
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
