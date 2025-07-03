import React, { useState, useEffect } from 'react';
import { tajweedCategories } from '../data/tajweedCategories';

interface TajweedCategory {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  tooltip: string;
}

interface TajweedMistake {
  categoryId: string;
  count: number;
}

interface TajweedGridProps {
  mistakes: TajweedMistake[];
  onMistakeChange: (categoryId: string, count: number) => void;
  isActive: boolean;
}

const TajweedGrid: React.FC<TajweedGridProps> = ({
  mistakes,
  onMistakeChange,
  isActive,
}) => {
  const getMistakeCount = (categoryId: string): number => {
    const mistake = mistakes.find(m => m.categoryId === categoryId);
    return mistake ? mistake.count : 0;
  };

  const handleCategoryClick = (categoryId: string) => {
    if (!isActive) return;
    
    const currentCount = getMistakeCount(categoryId);
    onMistakeChange(categoryId, currentCount + 1);
  };

  const handleCategoryRightClick = (e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    if (!isActive) return;
    
    const currentCount = getMistakeCount(categoryId);
    if (currentCount > 0) {
      onMistakeChange(categoryId, currentCount - 1);
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3>Tajweed Assessment Grid</h3>
        {!isActive && (
          <span className="text-sm text-gray-500">
            Select student and Surah to begin assessment
          </span>
        )}
      </div>
      
      <div className="tajweed-grid">
        {tajweedCategories.map((category) => {
          const mistakeCount = getMistakeCount(category.id);
          const hasMistakes = mistakeCount > 0;
          
          return (
            <div
              key={category.id}
              className={`tajweed-category tooltip ${hasMistakes ? 'has-mistakes' : ''} ${
                !isActive ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleCategoryClick(category.id)}
              onContextMenu={(e) => handleCategoryRightClick(e, category.id)}
              style={{
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <div className="category-name">{category.name}</div>
              <div className="arabic-text text-sm mb-2">{category.nameArabic}</div>
              
              {hasMistakes && (
                <div className="mistake-count">
                  {mistakeCount}
                </div>
              )}
              
              <div className="tooltip-content">
                <strong>{category.name}</strong><br />
                {category.tooltip}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Instructions:</strong></p>
        <ul style={{ listStyle: 'disc', marginLeft: '20px' }}>
          <li>Left click to add a mistake</li>
          <li>Right click to remove a mistake</li>
          <li>Hover over categories for definitions</li>
        </ul>
      </div>
    </div>
  );
};

export default TajweedGrid;