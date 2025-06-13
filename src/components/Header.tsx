
import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Left side - Logo and text */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            flex: '1',
            minWidth: '250px'
          }}>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '2.2rem',
              fontWeight: '700',
              color: '#0E2A47',
              margin: '0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              MY MAKTAB
            </h1>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              color: '#666',
              margin: '0.25rem 0 0.5rem 0',
              fontWeight: '400'
            }}>
              Learn. Lead. Live Islam.
            </p>
            <div style={{
              fontSize: '0.875rem',
              color: '#0E2A47',
              fontWeight: '500',
              fontFamily: "'Poppins', sans-serif"
            }}>
              mymaktab.co.uk
            </div>
          </div>

          {/* Right side - Quranic Calligraphy Image */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '0 0 auto'
          }}>
            <img
              src="https://img.freepik.com/premium-vector/rabbi-zidni-ilma-quranic-calligraphy-quran-verse-my-lord-increase-me-knowledge_761928-168.jpg"
              alt="Rabbi Zidni Ilma - Quranic Calligraphy"
              style={{
                height: '80px',
                width: 'auto',
                maxWidth: '200px',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
              onError={(e) => {
                // Fallback in case image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Subtitle for the app */}
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #f0f0f0'
        }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#0E2A47',
            margin: '0',
            opacity: '0.8'
          }}>
            Tajweed Assessment Tool
          </h2>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.875rem',
            color: '#666',
            margin: '0.25rem 0 0 0',
            fontWeight: '400'
          }}>
            Real-time Quranic Recitation Analysis
          </p>
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .header-container {
            flex-direction: column !important;
            text-align: center !important;
          }
          
          .logo-section h1 {
            font-size: 1.8rem !important;
          }
          
          .logo-section p {
            font-size: 0.9rem !important;
          }
          
          .calligraphy-image {
            height: 60px !important;
            max-width: 150px !important;
            margin-top: 0.5rem;
          }
          
          .app-subtitle h2 {
            font-size: 1.1rem !important;
          }
          
          .app-subtitle p {
            font-size: 0.8rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .logo-section h1 {
            font-size: 1.6rem !important;
          }
          
          .logo-section p {
            font-size: 0.85rem !important;
          }
          
          .calligraphy-image {
            height: 50px !important;
            max-width: 120px !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
