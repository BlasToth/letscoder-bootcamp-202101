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
import Login from './components/Login'
import useToken from './hooks/useToken'
import Userheader from './components/userheader/Userheader'

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Userheader />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/allverbs" component={Allverbs} />
          <Route path="/randomverb" component={Randomverb} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/knownverbs" component={Knownverbs} />
          <Route path="/halloffame" component={Halloffame} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
