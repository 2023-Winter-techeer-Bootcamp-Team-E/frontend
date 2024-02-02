import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CalendarPage from './pages/CalendarPage';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DiaryPage from './pages/DiaryPage';
import GlobalStyles from './GlobalStyles';
import PastPage from './pages/PastPage';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/diary/:diary_id" element={<DiaryPage />} />
        <Route path="/past" element={<PastPage />} />
      </Routes>
    </Router>
  );
}

export default App;
