

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faRotateLeft, faBook, faMicrophone, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useAssessment } from '../contexts/AssessmentContext';

const ScoreDisplay: React.FC = () => {
  const { 
    selectedSurah, 
    calculateCategoryScores,
    getRAGStatus, 
    resetMistakes 
  } = useAssessment();

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
          <FontAwesomeIcon icon={faTrophy} style={{ fontSize: '3rem', marginBottom: '0.75rem' }} />
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>Overall Assessment Score</h3>
          <p style={{ fontSize: '0.875rem' }}>Select a Surah to begin assessment</p>
        </div>
      </div>
    );
  }

  const categoryScores = calculateCategoryScores();
  const ragStatus = getRAGStatus(categoryScores.finalWeightedScore);

  const getScoreColor = (status: string) => {
    switch (status) {
      case 'green': return '#16a34a';
      case 'amber': return '#d97706';
      case 'red': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getScoreBg = (status: string) => {
    switch (status) {
      case 'green': return { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' };
      case 'amber': return { backgroundColor: '#fffbeb', borderColor: '#fde68a' };
      case 'red': return { backgroundColor: '#fef2f2', borderColor: '#fecaca' };
      default: return { backgroundColor: '#f9fafb', borderColor: '#e5e7eb' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'green': return 'Excellent';
      case 'amber': return 'Good';
      case 'red': return 'Needs Improvement';
      default: return 'Not Assessed';
    }
  };

  const validRulesCount = Object.values(selectedSurah.rules).filter(count => count > 0).length;
  const scoreBg = getScoreBg(ragStatus);

  return (
    <div style={{
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: `2px solid ${scoreBg.borderColor}`,
      transition: 'all 0.3s',
      ...scoreBg
    }}>
      <div style={{ padding: '1.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FontAwesomeIcon icon={faTrophy} style={{ fontSize: '2rem', color: '#0ea5e9' }} />
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>Overall Assessment Score</h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0
              }}>
                {selectedSurah.name} - {selectedSurah.englishName}
              </p>
            </div>
          </div>
          <button
            onClick={resetMistakes}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            title="Reset Assessment"
          >
            <FontAwesomeIcon icon={faRotateLeft} style={{ fontSize: '0.875rem' }} />
            <span style={{ fontSize: '0.875rem' }}>Reset</span>
          </button>
        </div>

        {/* Final Weighted Score */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            fontSize: '6rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: getScoreColor(ragStatus)
          }}>
            {categoryScores.finalWeightedScore}%
          </div>
          <div style={{
            fontSize: '1.125rem',
            fontWeight: '500',
            color: getScoreColor(ragStatus)
          }}>
            {getStatusText(ragStatus)}
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            marginTop: '0.5rem'
          }}>
            Weighted Assessment Score
          </div>
        </div>

        {/* Category Breakdown */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* Core Tajweed Rules */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <FontAwesomeIcon icon={faBook} style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '0.5rem' }} />
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: getScoreColor(getRAGStatus(categoryScores.coreTajweedScore))
            }}>
              {categoryScores.coreTajweedScore}%
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              marginBottom: '0.25rem'
            }}>Core Tajweed</div>
            <div style={{
              fontSize: '0.625rem',
              color: '#9ca3af'
            }}>Weight: 40%</div>
          </div>

          {/* Pronunciation */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <FontAwesomeIcon icon={faMicrophone} style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.5rem' }} />
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: getScoreColor(getRAGStatus(categoryScores.pronunciationScore))
            }}>
              {categoryScores.pronunciationScore}%
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              marginBottom: '0.25rem'
            }}>Pronunciation</div>
            <div style={{
              fontSize: '0.625rem',
              color: '#9ca3af'
            }}>Weight: 20%</div>
          </div>

          {/* Additional Categories */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: '1.5rem', color: '#f59e0b', marginBottom: '0.5rem' }} />
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: getScoreColor(getRAGStatus(categoryScores.additionalCategoriesScore))
            }}>
              {categoryScores.additionalCategoriesScore}%
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              marginBottom: '0.25rem'
            }}>Additional</div>
            <div style={{
              fontSize: '0.625rem',
              color: '#9ca3af'
            }}>Weight: 40%</div>
          </div>
        </div>

        {/* Surah Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#111827'
            }}>{validRulesCount}</div>
            <div style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>Active Rules</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#111827'
            }}>
              {Object.values(selectedSurah.rules).reduce((sum, count) => sum + count, 0)}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>Total Expected</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: getScoreColor(ragStatus)
            }}>
              {ragStatus.toUpperCase()}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>Status</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          height: '0.75rem',
          marginBottom: '1rem'
        }}>
          <div
            style={{
              height: '0.75rem',
              borderRadius: '9999px',
              width: `${categoryScores.finalWeightedScore}%`,
              backgroundColor: getScoreColor(ragStatus),
              transition: 'all 0.5s'
            }}
          ></div>
        </div>

        {/* RAG Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              backgroundColor: '#ef4444',
              borderRadius: '50%'
            }}></div>
            <span>&lt;60% Poor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              backgroundColor: '#f59e0b',
              borderRadius: '50%'
            }}></div>
            <span>60-85% Good</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              backgroundColor: '#22c55e',
              borderRadius: '50%'
            }}></div>
            <span>&gt;85% Excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;

