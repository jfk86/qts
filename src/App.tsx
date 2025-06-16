import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AssessmentProvider } from './contexts/AssessmentContext';
import { QaidaProvider } from './contexts/QaidaContext';
import Header from './components/Header';
import DashboardSelector from './components/DashboardSelector';
import AssessmentPage from './pages/AssessmentPage';
import QaidaRoadmap from './components/QaidaRoadmap';
import QaidaAssessment from './components/QaidaAssessment';

function App() {
  return (
    <AssessmentProvider>
      <QaidaProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<DashboardSelector />} />
              <Route path="/tajweed" element={<AssessmentPage />} />
              <Route path="/qaida" element={<QaidaRoadmap />} />
              <Route path="/qaida/level/:levelId" element={<QaidaAssessment />} />
            </Routes>
          </div>
        </Router>
      </QaidaProvider>
    </AssessmentProvider>
  );
}

export default App;