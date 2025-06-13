
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAssessment, MakhrajCount } from '../contexts/AssessmentContext';

const MakhrajSection: React.FC = () => {
  const { 
    selectedSurah, 
    makhrajMistakes, 
    incrementMakhrajMistake, 
    decrementMakhrajMistake, 
    calculateMakhrajDeduction,
    getRAGStatus 
  } = useAssessment();

  const makhrajTypes = [
    {
      type: 'nasal' as keyof MakhrajCount,
      title: 'Nasal Passage',
      description: 'ن، م',
      icon: faComment,
    },
    {
      type: 'lips' as keyof MakhrajCount,
      title: 'Lips/Mouth',
      description: 'ب، ف، م',
      icon: faComment,
    },
    {
      type: 'tongue' as keyof MakhrajCount,
      title: 'Tongue',
      description: 'ط، د، ت، ل، ر، ن، س، ش',
      icon: faComment,
    },
    {
      type: 'throat' as keyof MakhrajCount,
      title: 'Throat',
      description: 'ع، ح، خ، غ',
      icon: faComment,
    },
    {
      type: 'chest' as keyof MakhrajCount,
      title: 'Chest',
      description: 'ا، و، ي (long vowels)',
      icon: faHeart,
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
          <FontAwesomeIcon icon={faComment} style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <div style={{ fontWeight: '500' }}>Pronunciation (Makhraj)</div>
          <div style={{ fontSize: '0.875rem' }}>Select a Surah to begin</div>
        </div>
      </div>
    );
  }

  const deduction = calculateMakhrajDeduction();
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
            <FontAwesomeIcon icon={faComment} style={{ fontSize: '1.5rem', color: '#0ea5e9' }} />
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>Pronunciation (Makhraj)</h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0
              }}>Articulation point mistakes (2% each, max 10%)</p>
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {makhrajTypes.map((makhraj) => {
            const mistakeCount = makhrajMistakes[makhraj.type];
            
            return (
              <div
                key={makhraj.type}
                style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <FontAwesomeIcon icon={makhraj.icon} style={{ fontSize: '1rem', color: '#0ea5e9' }} />
                  <div>
                    <div style={{
                      fontWeight: '500',
                      color: '#111827',
                      fontSize: '0.875rem'
                    }}>{makhraj.title}</div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#6b7280'
                    }}>{makhraj.description}</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <button
                    onClick={() => decrementMakhrajMistake(makhraj.type)}
                    disabled={mistakeCount === 0}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      backgroundColor: mistakeCount === 0 ? '#f9fafb' : '#f3f4f6',
                      color: mistakeCount === 0 ? '#d1d5db' : '#374151',
                      border: 'none',
                      borderRadius: '0.375rem',
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
                    <FontAwesomeIcon icon={faMinus} style={{ fontSize: '0.75rem' }} />
                  </button>

                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#111827'
                  }}>
                    {mistakeCount}
                  </div>

                  <button
                    onClick={() => incrementMakhrajMistake(makhraj.type)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      backgroundColor: '#e0f2fe',
                      color: '#0284c7',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bae6fd'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e0f2fe'}
                  >
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '0.75rem' }} />
                  </button>
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

export default MakhrajSection;
