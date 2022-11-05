import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Menu } from './screens/menu/Menu';
import { Game } from './screens/game/Game';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Menu />
        </Route>
        <Route exact path="/game">
          <Game options={{ max: 10, min: 1, mode: 'div', questions: 100, timeLimit: 'med' }} />
        </Route>
        <Route path="/01"></Route>
      </Switch>
    </Router>
  );
}

export default App;
