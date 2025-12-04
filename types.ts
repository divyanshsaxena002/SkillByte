export enum Category {
  TECH = 'Technology',
  DESIGN = 'Design',
  BUSINESS = 'Business',
  LIFESTYLE = 'Lifestyle',
  SCIENCE = 'Science'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  bio?: string;
  handle?: string;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  creator: Creator;
  likes: number;
  comments: number;
  category: Category;
  tags: string[];
  courseId?: string; // Links this reel to a structured course
  orderInCourse?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  creator: Creator;
  totalVideos: number;
  thumbnail: string;
  category: Category;
}

export interface UserProgress {
  completedVideoIds: string[];
  xp: number;
  streakDays: number;
  savedCourseIds: string[];
}