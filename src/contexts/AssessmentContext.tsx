

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Surah {
  id: number;
  number: number;
  name: string;
  englishName: string;
  tier: number;
  rules: {
    ghunna: number;
    ikhfaa: number;
    idghaam: number;
    qalqalah: number;
  };
}

export interface MistakeCount {
  ghunna: number;
  ikhfaa: number;
  idghaam: number;
  qalqalah: number;
}

export interface MakhrajCount {
  nasal: number;
  lips: number;
  tongue: number;
  throat: number;
  chest: number;
}

export interface ChecklistMistakes {
  maddMistakes: {
    incorrectElongation: boolean;
    overElongation: boolean;
    wrongMaddType: boolean;
    inconsistentLength: boolean;
  };
  waqfIbtidaaMistakes: {
    stoppedWrongPlace: boolean;
    failedToStop: boolean;
    restartedIncorrectly: boolean;
    meaningConfusion: boolean;
  };
  minorMistakes: {
    skippedShaddah: boolean;
    misreadSukun: boolean;
    incorrectSound: boolean;
    nasalisationError: boolean;
    inconsistentTajweed: boolean;
  };
  majorMistakes: {
    skippedAyah: boolean;
    repeatedBreakdown: boolean;
    fluencyIssues: boolean;
    severeMispronunciation: boolean;
  };
}

export interface CategoryScores {
  coreTajweedScore: number;
  pronunciationScore: number;
  additionalCategoriesScore: number;
  finalWeightedScore: number;
}

interface AssessmentContextType {
  selectedSurah: Surah | null;
  setSelectedSurah: (surah: Surah | null) => void;
  mistakes: MistakeCount;
  setMistakes: (mistakes: MistakeCount) => void;
  incrementMistake: (rule: keyof MistakeCount) => void;
  decrementMistake: (rule: keyof MistakeCount) => void;
  resetMistakes: () => void;
  calculateAccuracy: (rule: keyof MistakeCount) => number;
  calculateOverallScore: () => number;
  getRAGStatus: (percentage: number) => 'red' | 'amber' | 'green';
  
  // New assessment categories
  makhrajMistakes: MakhrajCount;
  setMakhrajMistakes: (mistakes: MakhrajCount) => void;
  incrementMakhrajMistake: (type: keyof MakhrajCount) => void;
  decrementMakhrajMistake: (type: keyof MakhrajCount) => void;
  
  checklistMistakes: ChecklistMistakes;
  setChecklistMistakes: (mistakes: ChecklistMistakes) => void;
  toggleChecklistMistake: (category: keyof ChecklistMistakes, item: string) => void;
  
  // Updated scoring functions
  calculateMakhrajDeduction: () => number;
  calculateMaddDeduction: () => number;
  calculateWaqfIbtidaaDeduction: () => number;
  calculateMinorDeduction: () => number;
  calculateMajorDeduction: () => number;
  
  // New weighted scoring functions
  calculatePronunciationScore: () => number;
  calculateAdditionalCategoriesScore: () => number;
  calculateCategoryScores: () => CategoryScores;
  calculateFinalScore: () => number;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

interface AssessmentProviderProps {
  children: ReactNode;
}

export const AssessmentProvider: React.FC<AssessmentProviderProps> = ({ children }) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [mistakes, setMistakes] = useState<MistakeCount>({
    ghunna: 0,
    ikhfaa: 0,
    idghaam: 0,
    qalqalah: 0,
  });

  // New state for additional assessment categories
  const [makhrajMistakes, setMakhrajMistakes] = useState<MakhrajCount>({
    nasal: 0,
    lips: 0,
    tongue: 0,
    throat: 0,
    chest: 0,
  });

  const [checklistMistakes, setChecklistMistakes] = useState<ChecklistMistakes>({
    maddMistakes: {
      incorrectElongation: false,
      overElongation: false,
      wrongMaddType: false,
      inconsistentLength: false,
    },
    waqfIbtidaaMistakes: {
      stoppedWrongPlace: false,
      failedToStop: false,
      restartedIncorrectly: false,
      meaningConfusion: false,
    },
    minorMistakes: {
      skippedShaddah: false,
      misreadSukun: false,
      incorrectSound: false,
      nasalisationError: false,
      inconsistentTajweed: false,
    },
    majorMistakes: {
      skippedAyah: false,
      repeatedBreakdown: false,
      fluencyIssues: false,
      severeMispronunciation: false,
    },
  });

  const incrementMistake = (rule: keyof MistakeCount) => {
    setMistakes(prev => ({
      ...prev,
      [rule]: prev[rule] + 1,
    }));
  };

  const decrementMistake = (rule: keyof MistakeCount) => {
    setMistakes(prev => ({
      ...prev,
      [rule]: Math.max(0, prev[rule] - 1),
    }));
  };

  const resetMistakes = () => {
    setMistakes({
      ghunna: 0,
      ikhfaa: 0,
      idghaam: 0,
      qalqalah: 0,
    });
    setMakhrajMistakes({
      nasal: 0,
      lips: 0,
      tongue: 0,
      throat: 0,
      chest: 0,
    });
    setChecklistMistakes({
      maddMistakes: {
        incorrectElongation: false,
        overElongation: false,
        wrongMaddType: false,
        inconsistentLength: false,
      },
      waqfIbtidaaMistakes: {
        stoppedWrongPlace: false,
        failedToStop: false,
        restartedIncorrectly: false,
        meaningConfusion: false,
      },
      minorMistakes: {
        skippedShaddah: false,
        misreadSukun: false,
        incorrectSound: false,
        nasalisationError: false,
        inconsistentTajweed: false,
      },
      majorMistakes: {
        skippedAyah: false,
        repeatedBreakdown: false,
        fluencyIssues: false,
        severeMispronunciation: false,
      },
    });
  };

  // New functions for Makhraj mistakes
  const incrementMakhrajMistake = (type: keyof MakhrajCount) => {
    setMakhrajMistakes(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const decrementMakhrajMistake = (type: keyof MakhrajCount) => {
    setMakhrajMistakes(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] - 1),
    }));
  };

  // Function to toggle checklist mistakes
  const toggleChecklistMistake = (category: keyof ChecklistMistakes, item: string) => {
    setChecklistMistakes(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !(prev[category] as any)[item],
      },
    }));
  };

  const calculateAccuracy = (rule: keyof MistakeCount): number => {
    if (!selectedSurah) return 0;
    
    const expectedCount = selectedSurah.rules[rule];
    if (expectedCount === 0) return 100; // Skip rules with 0 expected count
    
    const mistakeCount = mistakes[rule];
    const accuracy = Math.max(0, ((expectedCount - mistakeCount) / expectedCount) * 100);
    return Math.round(accuracy);
  };

  const calculateOverallScore = (): number => {
    if (!selectedSurah) return 0;

    // Get rules with expected count > 0
    const validRules = Object.keys(selectedSurah.rules).filter(
      rule => selectedSurah.rules[rule as keyof MistakeCount] > 0
    ) as (keyof MistakeCount)[];

    if (validRules.length === 0) return 100;

    // Calculate total expected and total mistakes for instance-based scoring
    let totalExpected = 0;
    let totalMistakes = 0;

    validRules.forEach(rule => {
      const expectedCount = selectedSurah.rules[rule];
      const mistakeCount = mistakes[rule];
      
      totalExpected += expectedCount;
      totalMistakes += mistakeCount;
    });

    // If no expected instances, return 100%
    if (totalExpected === 0) return 100;

    // Instance-based scoring: (1 - (Total Mistakes / Total Expected)) * 100
    const score = (1 - (totalMistakes / totalExpected)) * 100;
    
    // Ensure score doesn't go below 0
    return Math.round(Math.max(0, score));
  };

  // Deduction calculation functions (kept for backward compatibility)
  const calculateMakhrajDeduction = (): number => {
    const totalMistakes = Object.values(makhrajMistakes).reduce((sum, count) => sum + count, 0);
    const deduction = totalMistakes * 2; // 2% per mistake
    return Math.min(deduction, 10); // Capped at 10%
  };

  const calculateMaddDeduction = (): number => {
    const checkedItems = Object.values(checklistMistakes.maddMistakes).filter(Boolean).length;
    const deduction = checkedItems * 2.5; // 2.5% per item
    return Math.min(deduction, 10); // Capped at 10%
  };

  const calculateWaqfIbtidaaDeduction = (): number => {
    const checkedItems = Object.values(checklistMistakes.waqfIbtidaaMistakes).filter(Boolean).length;
    const deduction = checkedItems * 2.5; // 2.5% per item
    return Math.min(deduction, 10); // Capped at 10%
  };

  const calculateMinorDeduction = (): number => {
    const checkedItems = Object.values(checklistMistakes.minorMistakes).filter(Boolean).length;
    const deduction = checkedItems * 1; // 1% per item
    return Math.min(deduction, 10); // Capped at 10%
  };

  const calculateMajorDeduction = (): number => {
    const checkedItems = Object.values(checklistMistakes.majorMistakes).filter(Boolean).length;
    const deduction = checkedItems * 5; // 5% per item
    return Math.min(deduction, 20); // Capped at 20%
  };

  // New weighted scoring functions
  const calculatePronunciationScore = (): number => {
    const makhrajDeduction = calculateMakhrajDeduction();
    const score = 100 - makhrajDeduction;
    return Math.max(0, Math.min(100, score));
  };

  const calculateAdditionalCategoriesScore = (): number => {
    const maddDeduction = calculateMaddDeduction();
    const waqfIbtidaaDeduction = calculateWaqfIbtidaaDeduction();
    const minorDeduction = calculateMinorDeduction();
    const majorDeduction = calculateMajorDeduction();
    
    const totalDeductions = maddDeduction + waqfIbtidaaDeduction + minorDeduction + majorDeduction;
    const score = 100 - totalDeductions;
    return Math.max(0, Math.min(100, score));
  };

  const calculateCategoryScores = (): CategoryScores => {
    const coreTajweedScore = calculateOverallScore();
    const pronunciationScore = calculatePronunciationScore();
    const additionalCategoriesScore = calculateAdditionalCategoriesScore();
    
    // Weighted final score: Core (40%) + Pronunciation (20%) + Additional (40%)
    const finalWeightedScore = Math.round(
      (coreTajweedScore * 0.4) + 
      (pronunciationScore * 0.2) + 
      (additionalCategoriesScore * 0.4)
    );

    return {
      coreTajweedScore,
      pronunciationScore,
      additionalCategoriesScore,
      finalWeightedScore: Math.max(0, Math.min(100, finalWeightedScore))
    };
  };

  const calculateFinalScore = (): number => {
    return calculateCategoryScores().finalWeightedScore;
  };

  const getRAGStatus = (percentage: number): 'red' | 'amber' | 'green' => {
    if (percentage < 60) return 'red';
    if (percentage < 85) return 'amber';
    return 'green';
  };

  const value: AssessmentContextType = {
    selectedSurah,
    setSelectedSurah,
    mistakes,
    setMistakes,
    incrementMistake,
    decrementMistake,
    resetMistakes,
    calculateAccuracy,
    calculateOverallScore,
    getRAGStatus,
    
    // New assessment categories
    makhrajMistakes,
    setMakhrajMistakes,
    incrementMakhrajMistake,
    decrementMakhrajMistake,
    
    checklistMistakes,
    setChecklistMistakes,
    toggleChecklistMistake,
    
    calculateMakhrajDeduction,
    calculateMaddDeduction,
    calculateWaqfIbtidaaDeduction,
    calculateMinorDeduction,
    calculateMajorDeduction,
    
    // New weighted scoring functions
    calculatePronunciationScore,
    calculateAdditionalCategoriesScore,
    calculateCategoryScores,
    calculateFinalScore,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};

