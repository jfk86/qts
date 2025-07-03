import React, { useState } from 'react';
import { surahs } from '../data/surahs';

interface Surah {
  id: number;
  number: number;
  name: string;
  nameArabic: string;
  nameEnglish: string;
  verses: number;
  juzNumber: number;
}

interface SurahSelectorProps {
  selectedSurah: Surah | null;
  onSurahSelect: (surah: Surah) => void;
}

const SurahSelector: React.FC<SurahSelectorProps> = ({
  selectedSurah,
  onSurahSelect,
}) => {
  const [activeTab, setActiveTab] = useState<'surah' | 'juz'>('surah');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurahs = surahs.filter(surah =>
    surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.number.toString().includes(searchTerm)
  );

  const juzGroups = surahs.reduce((acc, surah) => {
    if (!acc[surah.juzNumber]) {
      acc[surah.juzNumber] = [];
    }
    acc[surah.juzNumber].push(surah);
    return acc;
  }, {} as Record<number, Surah[]>);

  return (
    <div className="card">
      <h3>Select Surah/Juz</h3>
      
      <div className="flex mb-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
        <button
          className={`btn ${activeTab === 'surah' ? 'btn-primary' : 'btn-secondary'} rounded-none`}
          onClick={() => setActiveTab('surah')}
          style={{ borderRadius: '6px 6px 0 0' }}
        >
          By Surah
        </button>
        <button
          className={`btn ${activeTab === 'juz' ? 'btn-primary' : 'btn-secondary'} rounded-none`}
          onClick={() => setActiveTab('juz')}
          style={{ borderRadius: '6px 6px 0 0' }}
        >
          By Juz
        </button>
      </div>

      {activeTab === 'surah' && (
        <>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Search Surah by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {filteredSurahs.map((surah) => (
              <div
                key={surah.id}
                className={`p-3 cursor-pointer border rounded mb-2 ${
                  selectedSurah?.id === surah.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => onSurahSelect(surah)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{surah.number}. {surah.name}</strong>
                    <div className="text-sm text-gray-600">
                      {surah.nameEnglish} • {surah.verses} verses • Juz {surah.juzNumber}
                    </div>
                  </div>
                  <div className="arabic-text text-lg">
                    {surah.nameArabic}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'juz' && (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {Object.entries(juzGroups).map(([juzNumber, juzSurahs]) => (
            <div key={juzNumber} className="mb-4">
              <h4 className="font-semibold mb-2">Juz {juzNumber}</h4>
              {juzSurahs.map((surah) => (
                <div
                  key={surah.id}
                  className={`p-2 cursor-pointer border rounded mb-1 ${
                    selectedSurah?.id === surah.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => onSurahSelect(surah)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {surah.number}. {surah.name} ({surah.verses} verses)
                    </span>
                    <span className="arabic-text">
                      {surah.nameArabic}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      
      {selectedSurah && (
        <div className="mt-4 p-4 rounded" style={{ backgroundColor: '#EBF8FF' }}>
          <strong>Selected:</strong> {selectedSurah.number}. {selectedSurah.name}
          <div className="text-sm text-gray-600">
            {selectedSurah.nameEnglish} • {selectedSurah.verses} verses • Juz {selectedSurah.juzNumber}
          </div>
        </div>
      )}
    </div>
  );
};

export default SurahSelector;