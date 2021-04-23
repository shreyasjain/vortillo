import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Selected from './components/Selected';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Home}>
        </Route>
        <Route path="/selected" component={Selected}>
        </Route>
      </BrowserRouter>

    </div>
  );
}

export default App;
