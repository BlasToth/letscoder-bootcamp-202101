import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Preferences from "./components/Preferences/Preferences";
import useToken from './useToken';
import Message from './Message'


function handleLogOut() {
  localStorage.removeItem('token');    
}


function App() {
  const { token, setToken } = useToken();

  const [message, setMessage] = useState("");

  if (!token) {
    return <Login setToken={setToken}/>
  }
  
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <button onClick={() => {
        handleLogOut();
        setMessage("Logged Out!");

      }}>Log Out</button>
      <h1>{message}</h1>

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
