import React, { useState, useEffect } from 'react';

interface ScorePanelProps {
  totalMistakes: number;
  score: number;
  isActive: boolean;
  onStartAssessment: () => void;
  onSaveAssessment: () => void;
  onResetAssessment: () => void;
  isSaving: boolean;
}

const ScorePanel: React.FC<ScorePanelProps> = ({
  totalMistakes,
  score,
  isActive,
  onStartAssessment,
  onSaveAssessment,
  onResetAssessment,
  isSaving,
}) => {
  const [duration, setDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      setIsRecording(true);
      // In a real implementation, you would start recording audio here
      console.log('Audio recording started');
    } else {
      alert('Audio recording is not supported in this browser');
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real implementation, you would stop and save the recording
    console.log('Audio recording stopped');
  };

  return (
    <div className="card">
      <div className="score-panel">
        <div className="score-item">
          <div className="score-label">Total Mistakes</div>
          <div className="score-value">{totalMistakes}</div>
        </div>
        
        <div className="score-item">
          <div className="score-label">Score</div>
          <div className="score-value">{score.toFixed(1)}%</div>
        </div>
        
        <div className="score-item">
          <div className="score-label">Duration</div>
          <div className="score-value">{formatTime(duration)}</div>
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        {!isActive ? (
          <button
            className="btn btn-primary w-full"
            onClick={onStartAssessment}
          >
            Start Assessment
          </button>
        ) : (
          <>
            <button
              className="btn btn-primary w-full"
              onClick={onSaveAssessment}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Assessment'}
            </button>
            
            <button
              className="btn btn-danger w-full"
              onClick={onResetAssessment}
            >
              Reset Assessment
            </button>
          </>
        )}
        
        <div className="border-t pt-3">
          <div className="text-sm font-semibold mb-2">Audio Recording</div>
          {!isRecording ? (
            <button
              className="btn btn-secondary w-full"
              onClick={handleStartRecording}
              disabled={!isActive}
            >
              🎤 Start Recording
            </button>
          ) : (
            <button
              className="btn btn-danger w-full"
              onClick={handleStopRecording}
            >
              ⏹️ Stop Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScorePanel;