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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage/>} />
        <Route path="/signup" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/lloading" element={<LLoadingPage/>} />
        {/*<Route path="/Dloading" element={<DLoadingPage/>} />*/}
        <Route path="/Aloading" element={<ALoadingPage/>} />
      </Routes>
    </Router>
  );
};
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
export default App;









