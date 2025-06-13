import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAssessment } from '../contexts/AssessmentContext';

const StudentInput: React.FC = () => {
  const { studentName, setStudentName } = useAssessment();

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '1.5rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <FontAwesomeIcon 
          icon={faUser} 
          style={{
            color: '#3b82f6',
            fontSize: '1.25rem',
            marginRight: '0.5rem'
          }}
        />
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#111827',
          margin: '0'
        }}>
          Student Information
        </h3>
      </div>

      <div>
        <label 
          htmlFor="studentName"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.5rem'
          }}
        >
          Student Name
        </label>
        <input
          type="text"
          id="studentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter student's full name"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
            boxSizing: 'border-box'
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
        {!studentName && (
          <p style={{
            fontSize: '0.75rem',
            color: '#6b7280',
            marginTop: '0.25rem',
            margin: '0.25rem 0 0 0'
          }}>
            Please enter the student's name before starting the assessment
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentInput;
