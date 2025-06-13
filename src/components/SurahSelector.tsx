
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useAssessment, Surah } from '../contexts/AssessmentContext';

const SurahSelector: React.FC = () => {
  const { selectedSurah, setSelectedSurah, resetMistakes } = useAssessment();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('/surahs.json');
        const data = await response.json();
        setSurahs(data.surahs);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  const handleSurahSelect = (surah: Surah) => {
    setSelectedSurah(surah);
    resetMistakes();
    setIsOpen(false);
  };

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return { backgroundColor: '#dcfce7', color: '#166534' };
      case 2: return { backgroundColor: '#e0f2fe', color: '#075985' };
      case 3: return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 4: return { backgroundColor: '#fee2e2', color: '#991b1b' };
      default: return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  const getTierLabel = (tier: number) => {
    return `Tier ${tier}`;
  };

  const groupedSurahs = surahs.reduce((acc, surah) => {
    if (!acc[surah.tier]) {
      acc[surah.tier] = [];
    }
    acc[surah.tier].push(surah);
    return acc;
  }, {} as Record<number, Surah[]>);

  if (loading) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        padding: '1.5rem'
      }}>
        <div>
          <div style={{
            height: '1rem',
            backgroundColor: '#e5e7eb',
            borderRadius: '0.25rem',
            width: '25%',
            marginBottom: '1rem'
          }}></div>
          <div style={{
            height: '3rem',
            backgroundColor: '#e5e7eb',
            borderRadius: '0.25rem'
          }}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <FontAwesomeIcon icon={faBookOpen} style={{ color: '#0ea5e9' }} />
        <h2 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#111827',
          margin: 0
        }}>Select Surah</h2>
      </div>

      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: '#f9fafb',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {selectedSurah ? (
              <>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  borderRadius: '9999px',
                  ...getTierColor(selectedSurah.tier)
                }}>
                  {getTierLabel(selectedSurah.tier)}
                </span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{
                      fontWeight: '500',
                      color: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>{selectedSurah.number}.</span>
                      <span className="surah-arabic-name">{selectedSurah.name}</span>
                    </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>{selectedSurah.englishName}</div>
                </div>
              </>
            ) : (
              <span style={{ color: '#6b7280' }}>Choose a Surah to begin assessment</span>
            )}
          </div>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            style={{
              color: '#9ca3af',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }} 
          />
        </button>

        {isOpen && (
          <div style={{
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            marginTop: '0.5rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            maxHeight: '24rem',
            overflowY: 'auto'
          }}>
            {Object.keys(groupedSurahs).sort((a, b) => Number(a) - Number(b)).map(tier => (
              <div key={tier}>
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f9fafb',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    borderRadius: '9999px',
                    ...getTierColor(Number(tier))
                  }}>
                    {getTierLabel(Number(tier))}
                  </span>
                </div>
                {groupedSurahs[Number(tier)].map(surah => (
                  <button
                    key={surah.id}
                    onClick={() => handleSurahSelect(surah)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      border: 'none',
                      borderBottom: '1px solid #f3f4f6',
                      backgroundColor: 'transparent',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{
                          fontWeight: '500',
                          color: '#111827',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span>{surah.number}.</span>
                          <span className="surah-arabic-name">{surah.name}</span>
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#6b7280'
                        }}>{surah.englishName}</div>
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#9ca3af'
                      }}>
                        Rules: {Object.values(surah.rules).filter(count => count > 0).length}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurahSelector;
