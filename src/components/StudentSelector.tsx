import React, { useState, useEffect } from 'react';
import { getStudents, createStudent, Student } from '../utils/api';

interface StudentSelectorProps {
  selectedStudent: Student | null;
  onStudentSelect: (student: Student) => void;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({
  selectedStudent,
  onStudentSelect,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const studentData = await getStudents();
      setStudents(studentData);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    try {
      const newStudent = await createStudent({
        name: newStudentName.trim(),
        grade: newStudentGrade.trim() || undefined,
      });
      setStudents([...students, newStudent]);
      setNewStudentName('');
      setNewStudentGrade('');
      setShowAddForm(false);
      onStudentSelect(newStudent);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="card">
        <h3>Select Student</h3>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Select Student</h3>
      
      {!showAddForm ? (
        <>
          <div className="form-group">
            <select
              className="form-select"
              value={selectedStudent?.id || ''}
              onChange={(e) => {
                const student = students.find(s => s.id === e.target.value);
                if (student) onStudentSelect(student);
              }}
            >
              <option value="">Choose a student...</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} {student.grade ? `(${student.grade})` : ''}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowAddForm(true)}
          >
            Add New Student
          </button>
        </>
      ) : (
        <form onSubmit={handleAddStudent}>
          <div className="form-group">
            <label className="form-label">Student Name *</label>
            <input
              type="text"
              className="form-input"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="Enter student name"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Grade (Optional)</label>
            <input
              type="text"
              className="form-input"
              value={newStudentGrade}
              onChange={(e) => setNewStudentGrade(e.target.value)}
              placeholder="e.g., Grade 5"
            />
          </div>
          
          <div className="flex space-x-4">
            <button type="submit" className="btn btn-primary">
              Add Student
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowAddForm(false);
                setNewStudentName('');
                setNewStudentGrade('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      {selectedStudent && (
        <div className="mt-4 p-4 rounded" style={{ backgroundColor: '#EBF8FF' }}>
          <strong>Selected:</strong> {selectedStudent.name}
          {selectedStudent.grade && ` (${selectedStudent.grade})`}
        </div>
      )}
    </div>
  );
};

export default StudentSelector;