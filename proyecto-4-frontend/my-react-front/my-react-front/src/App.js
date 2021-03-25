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

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
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
