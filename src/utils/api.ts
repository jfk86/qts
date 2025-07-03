import { PrismaClient } from '@prisma/client';

// Note: In a real CRA app, this would be done through API routes
// For this demo, we'll simulate API calls with local storage and mock data

const STORAGE_KEYS = {
  STUDENTS: 'mymaktab_students',
  ASSESSMENTS: 'mymaktab_assessments',
  CATEGORIES: 'mymaktab_categories',
};

// Types
export interface Student {
  id: string;
  name: string;
  email?: string;
  grade?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assessment {
  id: string;
  studentId: string;
  surahId: number;
  surahName: string;
  assessorName?: string;
  totalMistakes: number;
  score: number;
  duration?: number;
  audioUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  mistakes: TajweedMistake[];
}

export interface TajweedMistake {
  categoryId: string;
  count: number;
}

export interface CreateStudentData {
  name: string;
  email?: string;
  grade?: string;
}

export interface CreateAssessmentData {
  studentId: string;
  surahId: number;
  surahName: string;
  assessorName?: string;
  totalMistakes: number;
  score: number;
  duration?: number;
  audioUrl?: string;
  notes?: string;
  mistakes: TajweedMistake[];
}

// Utility functions
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error getting ${key} from storage:`, error);
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
};

// Student API functions
export const getStudents = async (): Promise<Student[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let students = getFromStorage<Student>(STORAGE_KEYS.STUDENTS);
  
  // Add demo students if none exist
  if (students.length === 0) {
    const demoStudents: Student[] = [
      {
        id: generateId(),
        name: 'Ahmed Ali',
        grade: 'Grade 7',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        name: 'Fatima Hassan',
        grade: 'Grade 6',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        name: 'Omar Mohamed',
        grade: 'Grade 8',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    saveToStorage(STORAGE_KEYS.STUDENTS, demoStudents);
    students = demoStudents;
  }
  
  return students;
};

export const createStudent = async (data: CreateStudentData): Promise<Student> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const newStudent: Student = {
    id: generateId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const students = getFromStorage<Student>(STORAGE_KEYS.STUDENTS);
  students.push(newStudent);
  saveToStorage(STORAGE_KEYS.STUDENTS, students);
  
  return newStudent;
};

// Assessment API functions
export const getAssessments = async (): Promise<Assessment[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return getFromStorage<Assessment>(STORAGE_KEYS.ASSESSMENTS);
};

export const createAssessment = async (data: CreateAssessmentData): Promise<Assessment> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const newAssessment: Assessment = {
    id: generateId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const assessments = getFromStorage<Assessment>(STORAGE_KEYS.ASSESSMENTS);
  assessments.push(newAssessment);
  saveToStorage(STORAGE_KEYS.ASSESSMENTS, assessments);
  
  return newAssessment;
};

export const getAssessmentsByStudent = async (studentId: string): Promise<Assessment[]> => {
  const assessments = await getAssessments();
  return assessments.filter(assessment => assessment.studentId === studentId);
};

// Analytics functions
export const getAssessmentStats = async () => {
  const assessments = await getAssessments();
  const students = await getStudents();
  
  const totalAssessments = assessments.length;
  const totalStudents = students.length;
  const averageScore = assessments.length > 0 
    ? assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length 
    : 0;
  
  // Calculate mistake frequency by category
  const mistakeFrequency: Record<string, number> = {};
  assessments.forEach(assessment => {
    assessment.mistakes.forEach(mistake => {
      mistakeFrequency[mistake.categoryId] = (mistakeFrequency[mistake.categoryId] || 0) + mistake.count;
    });
  });
  
  return {
    totalAssessments,
    totalStudents,
    averageScore,
    mistakeFrequency,
    recentAssessments: assessments.slice(-10).reverse(),
  };
};