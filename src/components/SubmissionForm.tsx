import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComments, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAssessment } from '../contexts/AssessmentContext';

const SubmissionForm: React.FC = () => {
  const { 
    studentName, 
    examinerComments, 
    setExaminerComments,
    selectedSurah,
    mistakes,
    makhrajMistakes,
    checklistMistakes,
    calculateCategoryScores
  } = useAssessment();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const categoryScores = calculateCategoryScores();

  const handleSubmit = async () => {
    if (!studentName.trim()) {
      alert('Please enter the student name before submitting.');
      return;
    }

    if (!selectedSurah) {
      alert('Please select a Surah before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare form data for Google Forms
      const formData = new FormData();
      
      // Form data mapping based on the form structure
      // Note: These entry IDs are estimated based on typical Google Forms patterns
      // You may need to inspect the actual form to get the exact entry IDs
      
      // Basic Information (fields 1-4)
      formData.append('entry.1234567890', studentName); // Student Name
      formData.append('entry.1234567891', selectedSurah.englishName); // Surah Name (English)
      formData.append('entry.1234567892', selectedSurah.name); // Surah Name (Arabic)
      formData.append('entry.1234567893', new Date().toISOString()); // Assessment Date
      
      // Scores (fields 5-8)
      formData.append('entry.1234567894', categoryScores.finalWeightedScore.toString()); // Final Weighted Score
      formData.append('entry.1234567895', categoryScores.coreTajweedScore.toString()); // Core Tajweed Score
      formData.append('entry.1234567896', categoryScores.pronunciationScore.toString()); // Pronunciation Score
      formData.append('entry.1234567897', categoryScores.additionalCategoriesScore.toString()); // Additional Categories Score
      
      // Core Tajweed Mistakes (fields 9-12)
      formData.append('entry.1234567898', mistakes.ghunna.toString()); // Ghunna Mistakes
      formData.append('entry.1234567899', mistakes.ikhfaa.toString()); // Ikhfaa Mistakes
      formData.append('entry.1234567900', mistakes.idghaam.toString()); // Idghaam Mistakes
      formData.append('entry.1234567901', mistakes.qalqalah.toString()); // Qalqalah Mistakes
      
      // Pronunciation (Makhraj) Mistakes (fields 13-17)
      formData.append('entry.1234567902', makhrajMistakes.nasal.toString()); // Nasal Mistakes
      formData.append('entry.1234567903', makhrajMistakes.lips.toString()); // Lips Mistakes
      formData.append('entry.1234567904', makhrajMistakes.tongue.toString()); // Tongue Mistakes
      formData.append('entry.1234567905', makhrajMistakes.throat.toString()); // Throat Mistakes
      formData.append('entry.1234567906', makhrajMistakes.chest.toString()); // Chest Mistakes
      
      // Checklist Mistakes (fields 18-21) - Convert boolean arrays to readable text
      const maddMistakesList = Object.entries(checklistMistakes.maddMistakes)
        .filter(([_, value]) => value)
        .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
        .join(', ');
      formData.append('entry.1234567907', maddMistakesList || 'None'); // Madd Mistakes
      
      const waqfMistakesList = Object.entries(checklistMistakes.waqfIbtidaaMistakes)
        .filter(([_, value]) => value)
        .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
        .join(', ');
      formData.append('entry.1234567908', waqfMistakesList || 'None'); // Waqf/Ibtidaa Mistakes
      
      const minorMistakesList = Object.entries(checklistMistakes.minorMistakes)
        .filter(([_, value]) => value)
        .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
        .join(', ');
      formData.append('entry.1234567909', minorMistakesList || 'None'); // Minor Mistakes
      
      const majorMistakesList = Object.entries(checklistMistakes.majorMistakes)
        .filter(([_, value]) => value)
        .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
        .join(', ');
      formData.append('entry.1234567910', majorMistakesList || 'None'); // Major Mistakes
      
      // Examiner Comments (field 22)
      formData.append('entry.1234567911', examinerComments || 'No additional comments'); // Examiner Comments

      // Google Form submission URL
      const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdaSjezrJ50rAQAzhFf-aC4GIoz2noTs7YMjkq8HpJphA/formResponse';
      
      const response = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for Google Forms
      });

      // Since we're using no-cors mode, we can't check the actual response
      // We'll assume success if no error is thrown
      setSubmitStatus('success');
      
      // Optional: Reset form after successful submission
      // resetMistakes();
      // setStudentName('');
      // setExaminerComments('');
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = studentName.trim() && selectedSurah && !isSubmitting;

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '1.5rem',
      marginTop: '2rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <FontAwesomeIcon 
          icon={faComments} 
          style={{
            color: '#10b981',
            fontSize: '1.25rem',
            marginRight: '0.5rem'
          }}
        />
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#111827',
          margin: '0'
        }}>
          Assessment Completion
        </h3>
      </div>

      {/* Examiner Comments */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label 
          htmlFor="examinerComments"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.5rem'
          }}
        >
          Examiner Comments
        </label>
        <textarea
          id="examinerComments"
          value={examinerComments}
          onChange={(e) => setExaminerComments(e.target.value)}
          placeholder="Add any additional observations, recommendations, or feedback about the student's performance..."
          rows={4}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            outline: 'none',
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
            boxSizing: 'border-box',
            resize: 'vertical',
            minHeight: '100px'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Assessment Summary */}
      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: '0.375rem',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 0.5rem 0'
        }}>
          Assessment Summary
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.5rem',
          fontSize: '0.75rem',
          color: '#6b7280'
        }}>
          <div><strong>Student:</strong> {studentName || 'Not specified'}</div>
          <div><strong>Surah:</strong> {selectedSurah?.englishName || 'Not selected'}</div>
          <div><strong>Final Score:</strong> {categoryScores.finalWeightedScore}%</div>
          <div><strong>Status:</strong> {
            categoryScores.finalWeightedScore >= 85 ? '🟢 Excellent' :
            categoryScores.finalWeightedScore >= 60 ? '🟡 Good' : '🔴 Needs Improvement'
          }</div>
        </div>
      </div>

      {/* Submit Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            backgroundColor: canSubmit ? '#10b981' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            margin: '0 auto',
            transition: 'background-color 0.15s ease-in-out',
            minWidth: '200px'
          }}
          onMouseOver={(e) => {
            if (canSubmit) {
              e.currentTarget.style.backgroundColor = '#059669';
            }
          }}
          onMouseOut={(e) => {
            if (canSubmit) {
              e.currentTarget.style.backgroundColor = '#10b981';
            }
          }}
        >
          <FontAwesomeIcon 
            icon={isSubmitting ? faSpinner : faPaperPlane}
            style={{
              animation: isSubmitting ? 'spin 1s linear infinite' : 'none'
            }}
          />
          {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#d1fae5',
            border: '1px solid #a7f3d0',
            borderRadius: '0.375rem',
            color: '#065f46',
            fontSize: '0.875rem'
          }}>
            ✅ Assessment submitted successfully!
          </div>
        )}

        {submitStatus === 'error' && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '0.375rem',
            color: '#991b1b',
            fontSize: '0.875rem'
          }}>
            ❌ Submission failed. Please try again or contact support.
          </div>
        )}

        {!canSubmit && (
          <div style={{
            marginTop: '1rem',
            fontSize: '0.75rem',
            color: '#6b7280'
          }}>
            Please complete student name and Surah selection to submit
          </div>
        )}
      </div>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SubmissionForm;
