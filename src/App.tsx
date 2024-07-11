import React from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import StartPage from './pages/StartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LLoadingPage from './pages/LLoadingPage';
import DLoadingPage from './pages/DLoadingPage';
import ALoadingPage from './pages/ALoadingPage';
import MainPage from './pages/MainPage'
import SelectPage from './pages/SelectPage';
import MyPage from './pages/MyPage';
import ResultPage from './pages/ResultPage';
import TalkPage from './pages/TalkPage';
import CaseSelectPage from './pages/CaseSelectPage';

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
        <Route path="/select" element={<SelectPage/>} />
        <Route path="/talk" element={<TalkPage/>} />
        <Route path="/caseSelect" element={<CaseSelectPage/>} />
        <Route path="/aloading" element={<ALoadingPage/>} />
        <Route path="/dloading" element={<DLoadingPage/>} />
        <Route path="/lloading" element={<LLoadingPage/>} />

      </Routes>
    </Router>
  );
};
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);

export default App;