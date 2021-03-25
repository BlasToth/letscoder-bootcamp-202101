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
  );
}

export default App;
