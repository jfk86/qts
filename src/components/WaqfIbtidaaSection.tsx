import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPause } from '@fortawesome/free-solid-svg-icons';
import { useAssessment } from '../contexts/AssessmentContext';

const WaqfIbtidaaSection: React.FC = () => {
  const { 
    selectedSurah, 
    checklistMistakes, 
    toggleChecklistMistake, 
    calculateWaqfIbtidaaDeduction,
    getRAGStatus 
  } = useAssessment();

  const waqfIbtidaaMistakes = [
    {
      key: 'stoppedWrongPlace',
      title: 'Stopped at wrong place',
      description: 'Paused where continuation required'
    },
    {
      key: 'failedToStop',
      title: 'Failed to stop',
      description: 'Continued where pause required'
    },
    {
      key: 'restartedIncorrectly',
      title: 'Restarted incorrectly',
      description: 'Wrong word or pronunciation after pause'
    },

  ];

  if (!selectedSurah) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        padding: '1.5rem'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <FontAwesomeIcon icon={faPause} style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <div style={{ fontWeight: '500' }}>Waqf/Ibtidaa Errors</div>
          <div style={{ fontSize: '0.875rem' }}>Select a Surah to begin</div>
        </div>
      </div>
    );
  }

  const deduction = calculateWaqfIbtidaaDeduction();
  const ragStatus = getRAGStatus(100 - deduction);

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
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FontAwesomeIcon icon={faPause} style={{ fontSize: '1.5rem', color: '#0ea5e9' }} />
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>Waqf/Ibtidaa Errors</h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0
              }}>Stop/start mistakes (2.5% each, max 10%)</p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: getStatusIcon(ragStatus)
            }}>
              -{deduction}%
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>Deduction</div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '0.75rem'
        }}>
          {waqfIbtidaaMistakes.map((mistake) => {
            const isChecked = checklistMistakes.waqfIbtidaaMistakes[mistake.key as keyof typeof checklistMistakes.waqfIbtidaaMistakes];
            
            return (
              <div
                key={mistake.key}
                onClick={() => toggleChecklistMistake('waqfIbtidaaMistakes', mistake.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  backgroundColor: isChecked ? '#fef3c7' : '#f9fafb',
                  borderRadius: '0.5rem',
                  border: `1px solid ${isChecked ? '#fbbf24' : '#e5e7eb'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isChecked) e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  if (!isChecked) e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '1.5rem',
                  height: '1.5rem',
                  backgroundColor: isChecked ? '#fbbf24' : 'white',
                  border: `2px solid ${isChecked ? '#fbbf24' : '#d1d5db'}`,
                  borderRadius: '0.25rem',
                  transition: 'all 0.2s'
                }}>
                  {isChecked && (
                    <FontAwesomeIcon 
                      icon={faCheck} 
                      style={{ 
                        fontSize: '0.75rem', 
                        color: 'white' 
                      }} 
                    />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: '500',
                    color: '#111827',
                    fontSize: '0.875rem'
                  }}>{mistake.title}</div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}>{mistake.description}</div>
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: isChecked ? '#d97706' : '#6b7280'
                }}>
                  -2.5%
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: '1rem',
          width: '100%',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          height: '0.5rem'
        }}>
          <div
            style={{
              height: '0.5rem',
              borderRadius: '9999px',
              width: `${Math.max(0, 100 - deduction)}%`,
              backgroundColor: getStatusIcon(ragStatus),
              transition: 'all 0.3s'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WaqfIbtidaaSection;