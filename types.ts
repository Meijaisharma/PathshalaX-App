
export enum AppScreen {
  LOGIN = 'LOGIN',
  OTP = 'OTP',
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  TESTS = 'TESTS',
  NOTIFICATIONS = 'NOTIFICATIONS',
  LIBRARY = 'LIBRARY',
  STORE = 'STORE',
  BATCHES = 'BATCHES',
  SEARCH = 'SEARCH',
  SUBJECTS = 'SUBJECTS',
  CHAPTERS = 'CHAPTERS',
  LECTURES = 'LECTURES',
  PROFILE = 'PROFILE',
  AI_CHAT = 'AI_CHAT',
  DOUBTS = 'DOUBTS',
  AI_GRADER = 'AI_GRADER'
}

export interface User {
  id: string;
  name: string;
  phone: string;
  xp: number;
  role: 'Student' | 'Instructor' | 'Admin';
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz' | 'live';
  duration: string;
  teacher: string;
  date: string;
  hls_manifest?: string;
  isDownloaded?: boolean;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lectures_count: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  instructor: string;
  tags: string[];
  modules?: Module[];
}
