import React, { useState, useCallback } from 'react';
import StudentSelector from '../components/StudentSelector';
import SurahSelector from '../components/SurahSelector';
import TajweedGrid from '../components/TajweedGrid';
import ScorePanel from '../components/ScorePanel';
import { createAssessment, Student, TajweedMistake } from '../utils/api';
import { Surah } from '../data/surahs';

const AssessmentDashboard: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [mistakes, setMistakes] = useState<TajweedMistake[]>([]);
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const totalMistakes = mistakes.reduce((sum, mistake) => sum + mistake.count, 0);
  const score = Math.max(0, 100 - (totalMistakes * 2)); // 2 points per mistake

  const handleStudentSelect = useCallback((student: Student) => {
    setSelectedStudent(student);
  }, []);

  const handleSurahSelect = useCallback((surah: Surah) => {
    setSelectedSurah(surah);
  }, []);

  const handleMistakeChange = useCallback((categoryId: string, count: number) => {
    setMistakes(prev => {
      const existingIndex = prev.findIndex(m => m.categoryId === categoryId);
      
      if (count === 0) {
        // Remove the mistake if count is 0
        return prev.filter(m => m.categoryId !== categoryId);
      }
      
      if (existingIndex >= 0) {
        // Update existing mistake
        const updated = [...prev];
        updated[existingIndex] = { categoryId, count };
        return updated;
      } else {
        // Add new mistake
        return [...prev, { categoryId, count }];
      }
    });
  }, []);

  const handleStartAssessment = useCallback(() => {
    if (!selectedStudent || !selectedSurah) {
      alert('Please select both a student and a Surah before starting the assessment.');
      return;
    }
    
    setIsAssessmentActive(true);
    setMistakes([]);
  }, [selectedStudent, selectedSurah]);

  const handleSaveAssessment = useCallback(async () => {
    if (!selectedStudent || !selectedSurah) {
      alert('Please select both a student and a Surah.');
      return;
    }

    setIsSaving(true);
    
    try {
      await createAssessment({
        studentId: selectedStudent.id,
        surahId: selectedSurah.id,
        surahName: selectedSurah.name,
        totalMistakes,
        score,
        mistakes,
        notes: `Assessment of ${selectedSurah.name} (${selectedSurah.nameEnglish})`,
      });
      
      alert('Assessment saved successfully!');
      
      // Reset the assessment
      setIsAssessmentActive(false);
      setMistakes([]);
    } catch (error) {
      console.error('Error saving assessment:', error);
      alert('Error saving assessment. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [selectedStudent, selectedSurah, totalMistakes, score, mistakes]);

  const handleResetAssessment = useCallback(() => {
    if (window.confirm('Are you sure you want to reset the current assessment? All progress will be lost.')) {
      setIsAssessmentActive(false);
      setMistakes([]);
    }
  }, []);

  return (
    <div className="container">
      <div className="mb-4">
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          Tajweed Assessment Dashboard
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Assess student recitation and track Tajweed mistakes in real-time
        </p>
      </div>
      
      <div className="assessment-container">
        <div className="controls-panel">
          <StudentSelector
            selectedStudent={selectedStudent}
            onStudentSelect={handleStudentSelect}
          />
          
          <SurahSelector
            selectedSurah={selectedSurah}
            onSurahSelect={handleSurahSelect}
          />
          
          <ScorePanel
            totalMistakes={totalMistakes}
            score={score}
            isActive={isAssessmentActive}
            onStartAssessment={handleStartAssessment}
            onSaveAssessment={handleSaveAssessment}
            onResetAssessment={handleResetAssessment}
            isSaving={isSaving}
          />
        </div>
        
        <div className="assessment-panel">
          <TajweedGrid
            mistakes={mistakes}
            onMistakeChange={handleMistakeChange}
            isActive={isAssessmentActive}
          />
          
          {isAssessmentActive && (selectedStudent && selectedSurah) && (
            <div className="card">
              <h4 style={{ marginBottom: '12px', color: '#374151' }}>
                Current Assessment
              </h4>
              <div style={{ 
                background: '#F3F4F6', 
                padding: '16px', 
                borderRadius: '6px',
                fontSize: '14px'
              }}>
                <p><strong>Student:</strong> {selectedStudent.name}</p>
                <p><strong>Surah:</strong> {selectedSurah.number}. {selectedSurah.name} ({selectedSurah.nameEnglish})</p>
                <p><strong>Verses:</strong> {selectedSurah.verses}</p>
                <p><strong>Juz:</strong> {selectedSurah.juzNumber}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentDashboard;