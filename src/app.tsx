import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Game } from './screens/game/game';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Game />
          </Route>
          <Route path="/01"></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
