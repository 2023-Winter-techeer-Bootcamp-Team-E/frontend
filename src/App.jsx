import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';
import "./assets/Fonts/fonts.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
