import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QaidaContextType {
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  completedLevels: number[];
  setCompletedLevels: (levels: number[]) => void;
  currentWordIndex: number;
  setCurrentWordIndex: (index: number) => void;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  assessmentResults: any[];
  setAssessmentResults: (results: any[]) => void;
}

const QaidaContext = createContext<QaidaContextType | undefined>(undefined);

export const QaidaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [studentName, setStudentName] = useState('');
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<any[]>([]);

  return (
    <QaidaContext.Provider value={{
      currentLevel,
      setCurrentLevel,
      studentName,
      setStudentName,
      completedLevels,
      setCompletedLevels,
      currentWordIndex,
      setCurrentWordIndex,
      showResults,
      setShowResults,
      assessmentResults,
      setAssessmentResults
    }}>
      {children}
    </QaidaContext.Provider>
  );
};

export const useQaida = () => {
  const context = useContext(QaidaContext);
  if (context === undefined) {
    throw new Error('useQaida must be used within a QaidaProvider');
  }
  return context;
};