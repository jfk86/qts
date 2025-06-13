
import React from 'react';
import { 
  faVolumeHigh, 
  faEyeSlash, 
  faHandshake, 
  faCircleDot 
} from '@fortawesome/free-solid-svg-icons';
import SurahSelector from '../components/SurahSelector';
import RuleCard from '../components/RuleCard';
import ScoreDisplay from '../components/ScoreDisplay';
import MakhrajSection from '../components/MakhrajSection';
import MaddMistakesSection from '../components/MaddMistakesSection';
import WaqfIbtidaaSection from '../components/WaqfIbtidaaSection';
import MinorMistakesSection from '../components/MinorMistakesSection';
import MajorMistakesSection from '../components/MajorMistakesSection';

const AssessmentPage: React.FC = () => {
  const tajweedRules = [
    {
      rule: 'ghunna' as const,
      title: 'Ghunna',
      description: 'Nasal sound with م and ن',
      icon: faVolumeHigh,
    },
    {
      rule: 'ikhfaa' as const,
      title: 'Ikhfaa',
      description: 'Concealment of ن and tanween',
      icon: faEyeSlash,
    },
    {
      rule: 'idghaam' as const,
      title: 'Idghaam',
      description: 'Merging of letters',
      icon: faHandshake,
    },
    {
      rule: 'qalqalah' as const,
      title: 'Qalqalah',
      description: 'Echoing sound with ق د ج ط ب',
      icon: faCircleDot,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '0.5rem'
          }}>
            Tajweed Assessment Dashboard
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '1.125rem'
          }}>
            Track and assess Tajweed rule application during Quran recitation
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem'
        }}>
          {/* Top Row - Surah Selection and Score */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <SurahSelector />
            <ScoreDisplay />
          </div>

          {/* Core Tajweed Rules Section */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Core Tajweed Rules Assessment
              </h2>
              <p style={{
                color: '#6b7280'
              }}>
                Track mistakes for each Tajweed rule during recitation
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {tajweedRules.map((ruleConfig) => (
                <RuleCard
                  key={ruleConfig.rule}
                  rule={ruleConfig.rule}
                  title={ruleConfig.title}
                  description={ruleConfig.description}
                  icon={ruleConfig.icon}
                />
              ))}
            </div>
          </div>

          {/* Pronunciation (Makhraj) Section */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Pronunciation Assessment
              </h2>
              <p style={{
                color: '#6b7280'
              }}>
                Track articulation point mistakes (Makhraj errors)
              </p>
            </div>
            
            <MakhrajSection />
          </div>

          {/* Additional Mistake Categories */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Additional Assessment Categories
              </h2>
              <p style={{
                color: '#6b7280'
              }}>
                Track various types of recitation mistakes and errors
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              <MaddMistakesSection />
              <WaqfIbtidaaSection />
              <MinorMistakesSection />
              <MajorMistakesSection />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          marginTop: '3rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Comprehensive Assessment Instructions
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <div>
              <div style={{
                fontWeight: '500',
                color: '#111827',
                marginBottom: '0.25rem'
              }}>1. Select Surah</div>
              <p>Choose a Surah from the dropdown, organized by difficulty tiers (1-4)</p>
            </div>
            <div>
              <div style={{
                fontWeight: '500',
                color: '#111827',
                marginBottom: '0.25rem'
              }}>2. Core Tajweed Rules</div>
              <p>Use +/- buttons to track mistakes for Ghunna, Ikhfaa, Idghaam, and Qalqalah</p>
            </div>
            <div>
              <div style={{
                fontWeight: '500',
                color: '#111827',
                marginBottom: '0.25rem'
              }}>3. Pronunciation (Makhraj)</div>
              <p>Track articulation mistakes for different letter groups (2% each, max 10%)</p>
            </div>
            <div>
              <div style={{
                fontWeight: '500',
                color: '#111827',
                marginBottom: '0.25rem'
              }}>4. Madd & Waqf/Ibtidaa</div>
              <p>Check boxes for elongation and stop/start errors (2.5% each, max 10%)</p>
            </div>
            <div>
              <div style={{
                fontWeight: '500',
                color: '#111827',
                marginBottom: '0.25rem'
              }}>5. Minor & Major Mistakes</div>
              <p>Track small errors (1% each) and serious mistakes (5% each) with caps</p>
            </div>
            <div>
              <div style={{
                fontWeight: '500',
                color: '#111827',
                marginBottom: '0.25rem'
              }}>6. Final Score</div>
              <p>Real-time calculation: Tajweed score minus all deductions with RAG status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
