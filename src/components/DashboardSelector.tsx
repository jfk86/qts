import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookQuran, faGraduationCap, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const DashboardSelector: React.FC = () => {
  const navigate = useNavigate();

  const dashboards = [
    {
      id: 'tajweed',
      title: 'Tajweed Assessment',
      description: 'Real-time Quranic Recitation Analysis',
      subtitle: 'Advanced assessment for experienced reciters',
      icon: faBookQuran,
      color: '#0E2A47',
      bgColor: '#f0f7ff',
      path: '/tajweed'
    },
    {
      id: 'qaida',
      title: 'Qaida Testing Dashboard',
      description: 'Progressive Arabic Reading Skills',
      subtitle: 'Step-by-step learning from basics to fluency',
      icon: faGraduationCap,
      color: '#2563eb',
      bgColor: '#eff6ff',
      path: '/qaida'
    }
  ];

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#f8fafc', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#0E2A47',
            marginBottom: '1rem',
            fontFamily: "'Poppins', sans-serif"
          }}>
            Choose Your Learning Path
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontFamily: "'Poppins', sans-serif"
          }}>
            Select the assessment tool that matches your current level and learning goals
          </p>
        </div>

        {/* Dashboard Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              onClick={() => navigate(dashboard.path)}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid #e2e8f0',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                backgroundColor: dashboard.bgColor,
                borderRadius: '50%',
                transform: 'translate(30px, -30px)',
                opacity: 0.5
              }} />
              
              {/* Icon */}
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: dashboard.bgColor,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1
              }}>
                <FontAwesomeIcon 
                  icon={dashboard.icon} 
                  style={{ 
                    fontSize: '1.5rem', 
                    color: dashboard.color 
                  }} 
                />
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '0.5rem',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  {dashboard.title}
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  color: dashboard.color,
                  fontWeight: '500',
                  marginBottom: '0.75rem',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  {dashboard.description}
                </p>
                
                <p style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                  marginBottom: '1.5rem',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  {dashboard.subtitle}
                </p>

                {/* Action Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: dashboard.color,
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  <span>Get Started</span>
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    style={{ 
                      marginLeft: '0.5rem',
                      fontSize: '0.75rem',
                      transition: 'transform 0.3s ease'
                    }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          margin: '3rem auto 0'
        }}>
          <h4 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '0.5rem',
            fontFamily: "'Poppins', sans-serif"
          }}>
            Need Help Choosing?
          </h4>
          <p style={{
            fontSize: '0.875rem',
            color: '#64748b',
            lineHeight: '1.5',
            fontFamily: "'Poppins', sans-serif"
          }}>
            <strong>Qaida Testing</strong> is perfect for beginners learning Arabic letters and basic reading skills.
            <br />
            <strong>Tajweed Assessment</strong> is designed for advanced students who can already read Arabic fluently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector;