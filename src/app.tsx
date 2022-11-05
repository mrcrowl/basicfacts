import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Game } from './screens/game/Game';
import { GameOptions } from './screens/game/model';
import { Menu } from './screens/menu/Menu';

const DEFAULT_GAME_OPTIONS: GameOptions = { max: 10, min: 1, mode: 'div', questions: 100, timeLimit: 'med' };

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game" element={<Game options={DEFAULT_GAME_OPTIONS} />} />
      </Routes>
    </Router>
  );
}

export default App;
