
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AssessmentProvider } from './contexts/AssessmentContext';
import Header from './components/Header';
import AssessmentPage from './pages/AssessmentPage';

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<AssessmentPage />} />
          </Routes>
        </div>
      </Router>
    </AssessmentProvider>
  );
}

export default App;
