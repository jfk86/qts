import React, { useState, useEffect } from 'react';
import { getAssessmentStats, getAssessments, getStudents } from '../utils/api';
import { Assessment, Student } from '../utils/api';
import { tajweedCategories } from '../data/tajweedCategories';

interface AssessmentStats {
  totalAssessments: number;
  totalStudents: number;
  averageScore: number;
  mistakeFrequency: Record<string, number>;
  recentAssessments: Assessment[];
}

const HistoryAnalytics: React.FC = () => {
  const [stats, setStats] = useState<AssessmentStats | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [statsData, assessmentsData, studentsData] = await Promise.all([
        getAssessmentStats(),
        getAssessments(),
        getStudents(),
      ]);
      
      setStats(statsData);
      setAssessments(assessmentsData);
      setStudents(studentsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAssessments = selectedStudentFilter
    ? assessments.filter(assessment => assessment.studentId === selectedStudentFilter)
    : assessments;

  const getStudentName = (studentId: string): string => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const getCategoryName = (categoryId: string): string => {
    const category = tajweedCategories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Student', 'Surah', 'Score', 'Total Mistakes', 'Duration (min)'];
    const rows = filteredAssessments.map(assessment => [
      formatDate(assessment.createdAt),
      getStudentName(assessment.studentId),
      assessment.surahName,
      assessment.score.toFixed(1) + '%',
      assessment.totalMistakes.toString(),
      assessment.duration ? Math.round(assessment.duration / 60).toString() : 'N/A',
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mymaktab_assessments_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="text-center" style={{ padding: '60px 0' }}>
          <h2>Loading Analytics...</h2>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container">
        <div className="text-center" style={{ padding: '60px 0' }}>
          <h2>Error loading analytics data</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mb-4">
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          History & Analytics
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          View assessment history and analyze student performance trends
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-4 mb-4">
        <div className="card text-center">
          <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#3B82F6', marginBottom: '4px' }}>
            {stats.totalAssessments}
          </h3>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>Total Assessments</p>
        </div>
        
        <div className="card text-center">
          <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#10B981', marginBottom: '4px' }}>
            {stats.totalStudents}
          </h3>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>Active Students</p>
        </div>
        
        <div className="card text-center">
          <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#F59E0B', marginBottom: '4px' }}>
            {stats.averageScore.toFixed(1)}%
          </h3>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>Average Score</p>
        </div>
        
        <div className="card text-center">
          <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#EF4444', marginBottom: '4px' }}>
            {Object.values(stats.mistakeFrequency).reduce((sum, count) => sum + count, 0)}
          </h3>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>Total Mistakes</p>
        </div>
      </div>

      {/* Common Mistakes Chart */}
      {Object.keys(stats.mistakeFrequency).length > 0 && (
        <div className="card mb-4">
          <h3 style={{ marginBottom: '16px' }}>Most Common Mistake Categories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(stats.mistakeFrequency)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 8)
              .map(([categoryId, count]) => {
                const maxCount = Math.max(...Object.values(stats.mistakeFrequency));
                const percentage = (count / maxCount) * 100;
                
                return (
                  <div key={categoryId} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ minWidth: '120px', fontSize: '14px', fontWeight: '500' }}>
                      {getCategoryName(categoryId)}
                    </div>
                    <div style={{ flex: 1, background: '#F3F4F6', borderRadius: '4px', height: '20px', position: 'relative' }}>
                      <div
                        style={{
                          background: '#3B82F6',
                          height: '100%',
                          borderRadius: '4px',
                          width: `${percentage}%`,
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                    <div style={{ minWidth: '40px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                      {count}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Assessment History */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3>Assessment History</h3>
          <div className="flex items-center space-x-4">
            <select
              className="form-select"
              value={selectedStudentFilter}
              onChange={(e) => setSelectedStudentFilter(e.target.value)}
              style={{ minWidth: '200px' }}
            >
              <option value="">All Students</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
            
            <button
              className="btn btn-secondary"
              onClick={exportToCSV}
              disabled={filteredAssessments.length === 0}
            >
              Export CSV
            </button>
          </div>
        </div>

        {filteredAssessments.length === 0 ? (
          <div className="text-center" style={{ padding: '40px 0', color: '#6B7280' }}>
            <p>No assessments found. Start by conducting some assessments!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Student</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Surah</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Score</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Mistakes</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((assessment) => (
                    <tr key={assessment.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '12px', fontSize: '14px' }}>
                        {formatDate(assessment.createdAt)}
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>
                        {getStudentName(assessment.studentId)}
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>
                        {assessment.surahName}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: assessment.score >= 80 ? '#D1FAE5' : assessment.score >= 60 ? '#FEF3C7' : '#FEE2E2',
                            color: assessment.score >= 80 ? '#065F46' : assessment.score >= 60 ? '#92400E' : '#991B1B',
                          }}
                        >
                          {assessment.score.toFixed(1)}%
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>
                        {assessment.totalMistakes}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>
                        {assessment.duration ? `${Math.round(assessment.duration / 60)}m` : 'N/A'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryAnalytics;