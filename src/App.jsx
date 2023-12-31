import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CalendarPage from './pages/CalendarPage';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TutorialPage from './pages/TutorialPage';
import DiaryPage from './pages/DiaryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/diary" element={<DiaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
