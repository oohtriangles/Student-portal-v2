export interface AssignmentQuestion {
  id: string;
  text: string;
  type: 'mcq' | 'text';
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  type: string;
  status: 'new' | 'in_progress' | 'completed';
  progress: number;
  dueDate: string;
  iconName: 'atm' | 'science' | 'public' | 'book' | 'code';
  details: string;
  questions?: AssignmentQuestion[];
}

export interface VideoLecture {
  id: string;
  title: string;
  duration: string;
  instructor: string;
  videoUrl: string;
  isCompleted: boolean;
  category: string;
  description: string;
}

export interface ReadingMaterial {
  id: string;
  title: string;
  category: string;
  author: string;
  readTime: string;
  content: string;
  summary?: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface StudySession {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  category: string;
}

export interface UserProfile {
  name: string;
  email: string;
  progress: number;
  weeklyTarget: number;
  currentCompleted: number;
  avatarUrl: string;
}

export type ActiveTab = 'dashboard' | 'videos' | 'readings' | 'tasks' | 'calendar' | 'social' | 'settings';
