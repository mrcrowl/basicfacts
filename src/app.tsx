import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Game } from './screens/game/game';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Game options={{ max: 10, min: 1, mode: 'div', questions: 100, timeLimit: 'med' }} />
          </Route>
          <Route path="/01"></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
