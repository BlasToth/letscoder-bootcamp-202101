<<<<<<< HEAD
import "./App.css";
import Verb from "./Verb";
import MyComponent from "./MyComponent";
import Nav from "./components/Nav";
import Admin from "./components/Admin";
import Allverbs from "./components/Allverbs";
import Randomverb from "./components/Randomverb";
import Quiz from "./components/Quiz";
import Knownverbs from "./components/Knownverbs";
import Halloffame from "./components/Halloffame";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Admin />
        <Allverbs />
        <Randomverb />
        <Quiz />
        <Knownverbs />
        <Halloffame />
      </div>
    </Router>
=======
import './App.css';
import Verb from './Verb';
import MyComponent from './MyComponent'
import Nav from './components/Nav'
import Admin from './components/Admin'
import Allverbs from './components/Allverbs';
import Randomverb from './components/Randomverb';
import Quiz from './components/Quiz';
import Knownverbs from './components/Knownverbs';
import Halloffame from './components/Halloffame';

function App() {
  return (
    <div className="App">
      <Nav />
      <Admin />
      <Allverbs />
      <Randomverb />
      <Quiz />
      <Knownverbs />
      <Halloffame />
    </div>
>>>>>>> e89334ca4df808b075093aa8fac41337979cecce
  );
}

export default App;
