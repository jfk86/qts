import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AssessmentDashboard from './pages/AssessmentDashboard';
import HistoryAnalytics from './pages/HistoryAnalytics';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AssessmentDashboard />} />
            <Route path="/history" element={<HistoryAnalytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;