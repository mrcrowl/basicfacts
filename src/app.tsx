import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GameScreen } from './screens/game';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <GameScreen />
          </Route>
          <Route path="/01"></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
