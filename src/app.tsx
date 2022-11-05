import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CountdownScreen } from './screens/countdown/CountdownScreen';
import { Game } from './screens/game/Game';
import { Menu } from './screens/menu/MenuScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/countdown" element={<CountdownScreen />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
