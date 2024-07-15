import React from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import StartPage from './pages/StartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import MyPage from './pages/MyPage';
import ResultPage from './pages/ResultPage';
import CharacterPage from './pages/CharacterPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage/>} />
        <Route path="/signup" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/myPage" element={<MyPage/>} />
        <Route path="/ResultPage" element={<ResultPage/>} />
        <Route path="/character" element={<CharacterPage/>} />
      </Routes>
    </Router>
  );
};
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);

export default App;