import { Video, Course, Creator, Category } from './types';

export const CURRENT_USER = {
  id: 'u1',
  name: 'Alex Learner',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
};

const creator1: Creator = {
  id: 'c1',
  name: 'CodeMaster JS',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMaster',
  isVerified: true,
};

const creator2: Creator = {
  id: 'c2',
  name: 'UX Daily',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UXDaily',
  isVerified: true,
};

const creator3: Creator = {
  id: 'c3',
  name: 'Startup 101',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Startup',
  isVerified: false,
};

const creator4: Creator = {
  id: 'c4',
  name: 'Science Today',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Science',
  isVerified: true,
};

const creator5: Creator = {
  id: 'c5',
  name: 'Mindful Life',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mindful',
  isVerified: false,
};

export const COURSES: Course[] = [
  {
    id: 'course1',
    title: 'React Fundamentals',
    description: 'Master the core concepts of React in 5 minutes.',
    creator: creator1,
    totalVideos: 3,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    category: Category.TECH
  },
  {
    id: 'course2',
    title: 'Color Theory Basics',
    description: 'Understand color for UI design.',
    creator: creator2,
    totalVideos: 2,
    thumbnail: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&q=80',
    category: Category.DESIGN
  },
  {
    id: 'course3',
    title: 'Startup Growth',
    description: 'How to scale from 0 to 1 users.',
    creator: creator3,
    totalVideos: 2,
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    category: Category.BUSINESS
  }
];

export const VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'React Hooks: useState',
    description: 'Manage local state in functional components using useState. It returns a state value and updater function.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    creator: creator1,
    likes: 1240,
    comments: 45,
    category: Category.TECH,
    tags: ['react', 'javascript', 'frontend'],
    courseId: 'course1',
    orderInCourse: 1
  },
  {
    id: 'v2',
    title: 'The 60-30-10 Rule',
    description: 'A classic decor rule: 60% dominant color, 30% secondary color, and 10% accent color.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&q=80',
    creator: creator2,
    likes: 8500,
    comments: 210,
    category: Category.DESIGN,
    tags: ['ui', 'ux', 'color', 'design'],
    courseId: 'course2',
    orderInCourse: 1
  },
  {
    id: 'v3',
    title: 'React Hooks: useEffect',
    description: 'Handle side effects like data fetching and subscriptions in React components.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80',
    creator: creator1,
    likes: 920,
    comments: 30,
    category: Category.TECH,
    tags: ['react', 'hooks', 'webdev'],
    courseId: 'course1',
    orderInCourse: 2
  },
  {
    id: 'v_q1',
    title: 'Quantum Entanglement',
    description: 'Spooky action at a distance explained simply. How particles remain connected across vast distances.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    creator: creator4,
    likes: 15400,
    comments: 890,
    category: Category.SCIENCE,
    tags: ['physics', 'quantum', 'science'],
  },
  {
    id: 'v_css1',
    title: 'How to Center a Div',
    description: 'The ultimate guide: Flexbox vs Grid for perfect centering.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
    creator: creator1,
    likes: 9999,
    comments: 500,
    category: Category.TECH,
    tags: ['css', 'webdev', 'flexbox'],
  },
  {
    id: 'v4',
    title: 'Product Market Fit',
    description: 'How to know if you have PMF: Exponential organic growth and high retention.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    creator: creator3,
    likes: 450,
    comments: 12,
    category: Category.BUSINESS,
    tags: ['startup', 'growth', 'business'],
    courseId: 'course3',
    orderInCourse: 1
  },
  {
    id: 'v_art1',
    title: 'Golden Ratio in Art',
    description: 'Why 1.618 makes everything look beautiful. From Da Vinci to Modern Logos.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80',
    creator: creator2,
    likes: 3420,
    comments: 88,
    category: Category.DESIGN,
    tags: ['art', 'goldenratio', 'history'],
  },
  {
    id: 'v5',
    title: 'React Custom Hooks',
    description: 'Extract component logic into reusable functions.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&q=80',
    creator: creator1,
    likes: 880,
    comments: 15,
    category: Category.TECH,
    tags: ['react', 'hooks'],
    courseId: 'course1',
    orderInCourse: 3
  },
  {
    id: 'v_life1',
    title: 'Morning Routine Hacks',
    description: '3 simple habits to boost your productivity before 9 AM.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    creator: creator5,
    likes: 4320,
    comments: 120,
    category: Category.LIFESTYLE,
    tags: ['productivity', 'health', 'morning'],
  },
  {
    id: 'v_biz2',
    title: 'Compound Interest',
    description: 'Einstein called it the 8th wonder of the world. Start early.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    creator: creator3,
    likes: 6700,
    comments: 150,
    category: Category.BUSINESS,
    tags: ['money', 'investing', 'finance'],
  },
  {
    id: 'v_des2',
    title: 'Typography Hierarchy',
    description: 'Why size, weight, and color matter in making text readable.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    creator: creator2,
    likes: 2100,
    comments: 56,
    category: Category.DESIGN,
    tags: ['typography', 'design', 'ui'],
  },
  {
    id: 'v_life2',
    title: 'The Pomodoro Technique',
    description: 'Work for 25 minutes, break for 5. The ultimate focus hack.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1456324504439-367cee10d6b1?w=800&q=80',
    creator: creator5,
    likes: 6700,
    comments: 340,
    category: Category.LIFESTYLE,
    tags: ['focus', 'productivity', 'study'],
  },
  {
    id: 'v_sci2',
    title: 'Photosynthesis Explained',
    description: 'How plants convert light into chemical energy in under 60 seconds.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
    creator: creator4,
    likes: 8900,
    comments: 230,
    category: Category.SCIENCE,
    tags: ['biology', 'plants', 'nature'],
  },
  {
    id: 'v_sci3',
    title: 'Black Holes 101',
    description: 'What happens when a star collapses? The event horizon explained.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
    creator: creator4,
    likes: 12500,
    comments: 400,
    category: Category.SCIENCE,
    tags: ['space', 'physics', 'astronomy'],
  }
];