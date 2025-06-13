
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useAssessment, MistakeCount } from '../contexts/AssessmentContext';

interface RuleCardProps {
  rule: keyof MistakeCount;
  title: string;
  description: string;
  icon: any;
}

const RuleCard: React.FC<RuleCardProps> = ({ rule, title, description, icon }) => {
  const { selectedSurah, mistakes, incrementMistake, decrementMistake, calculateAccuracy, getRAGStatus } = useAssessment();

  if (!selectedSurah) {
    return (
      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        border: '2px dashed #d1d5db',
        padding: '1.5rem'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <FontAwesomeIcon icon={icon} style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <div style={{ fontWeight: '500' }}>{title}</div>
          <div style={{ fontSize: '0.875rem' }}>Select a Surah to begin</div>
        </div>
      </div>
    );
  }

  const expectedCount = selectedSurah.rules[rule];
  const mistakeCount = mistakes[rule];
  const accuracy = calculateAccuracy(rule);
  const ragStatus = getRAGStatus(accuracy);

  // Skip rendering if expected count is 0
  if (expectedCount === 0) {
    return (
      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        padding: '1.5rem',
        opacity: 0.5
      }}>
        <div style={{ textAlign: 'center', color: '#9ca3af' }}>
          <FontAwesomeIcon icon={icon} style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <div style={{ fontWeight: '500' }}>{title}</div>
          <div style={{ fontSize: '0.875rem' }}>Not applicable for this Surah</div>
        </div>
      </div>
    );
  }

  const getRAGColor = (status: string) => {
    switch (status) {
      case 'green': return { color: '#16a34a', backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' };
      case 'amber': return { color: '#d97706', backgroundColor: '#fffbeb', borderColor: '#fde68a' };
      case 'red': return { color: '#dc2626', backgroundColor: '#fef2f2', borderColor: '#fecaca' };
      default: return { color: '#6b7280', backgroundColor: '#f9fafb', borderColor: '#e5e7eb' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'green': return '#22c55e';
      case 'amber': return '#f59e0b';
      case 'red': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const ragColors = getRAGColor(ragStatus);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: `2px solid ${ragColors.borderColor}`,
      transition: 'all 0.2s'
    }}>
      <div style={{ padding: '1.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FontAwesomeIcon icon={icon} style={{ fontSize: '1.25rem', color: '#0ea5e9' }} />
            <div>
              <h3 style={{
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>{title}</h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0
              }}>{description}</p>
            </div>
          </div>
          <FontAwesomeIcon 
            icon={faCircle} 
            style={{
              fontSize: '1.125rem',
              color: getStatusIcon(ragStatus)
            }} 
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#111827'
            }}>{expectedCount}</div>
            <div style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>Expected</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#111827'
            }}>{mistakeCount}</div>
            <div style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>Mistakes</div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <button
            onClick={() => decrementMistake(rule)}
            disabled={mistakeCount === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              backgroundColor: mistakeCount === 0 ? '#f9fafb' : '#f3f4f6',
              color: mistakeCount === 0 ? '#d1d5db' : '#374151',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: mistakeCount === 0 ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (mistakeCount > 0) e.currentTarget.style.backgroundColor = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              if (mistakeCount > 0) e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: getStatusIcon(ragStatus)
            }}>
              {accuracy}%
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>Accuracy</div>
          </div>

          <button
            onClick={() => incrementMistake(rule)}
            disabled={mistakeCount >= expectedCount}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              backgroundColor: mistakeCount >= expectedCount ? '#f9fafb' : '#e0f2fe',
              color: mistakeCount >= expectedCount ? '#d1d5db' : '#0284c7',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: mistakeCount >= expectedCount ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (mistakeCount < expectedCount) e.currentTarget.style.backgroundColor = '#bae6fd';
            }}
            onMouseLeave={(e) => {
              if (mistakeCount < expectedCount) e.currentTarget.style.backgroundColor = '#e0f2fe';
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <div style={{
          width: '100%',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          height: '0.5rem'
        }}>
          <div
            style={{
              height: '0.5rem',
              borderRadius: '9999px',
              width: `${accuracy}%`,
              backgroundColor: getStatusIcon(ragStatus),
              transition: 'all 0.3s'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RuleCard;
