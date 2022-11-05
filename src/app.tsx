import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Game } from './screens/game/Game';
import { Menu } from './screens/menu/Menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route
          path="/game"
          element={<Game options={{ max: 10, min: 1, mode: 'div', questions: 100, timeLimit: 'med' }} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
