import React from 'react';
import { Course, Video } from '../types';
import { VIDEOS } from '../mockData';
import { ChevronLeft, PlayCircle, CheckCircle2, Lock } from 'lucide-react';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onPlayVideo: (videoIndex: number) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onPlayVideo }) => {
  // Filter videos for this course
  const courseVideos = VIDEOS.filter(v => v.courseId === course.id).sort((a, b) => (a.orderInCourse || 0) - (b.orderInCourse || 0));

  return (
    <div className="h-full bg-black text-white flex flex-col z-50 absolute inset-0">
      {/* Header Image */}
      <div className="relative h-64 shrink-0">
        <img src={course.thumbnail} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-black/50 p-2 rounded-full backdrop-blur-md z-10"
        >
          <ChevronLeft className="text-white" />
        </button>

        <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="bg-purple-600 text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block shadow-lg">Micro-Course</span>
            <h1 className="text-3xl font-bold leading-tight mb-2 text-shadow-sm">{course.title}</h1>
            <div className="flex items-center gap-2 mb-4">
                <img src={course.creator.avatar} className="w-6 h-6 rounded-full border border-white" />
                <span className="text-sm font-medium">{course.creator.name}</span>
            </div>
            <button className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition">
                <PlayCircle fill="black" className="text-white" />
                Start Learning
            </button>
        </div>
      </div>

      {/* Syllabus */}
      <div className="flex-1 overflow-y-auto bg-black p-4 pb-20">
        <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Syllabus</h2>
            <span className="text-xs text-gray-500">{courseVideos.length} Lessons • ~5 mins</span>
        </div>

        <div className="space-y-4">
            {courseVideos.map((video, idx) => (
                <div 
                    key={video.id} 
                    onClick={() => {
                        // Find the global index of this video to play it in the feed
                        const globalIndex = VIDEOS.findIndex(v => v.id === video.id);
                        if(globalIndex !== -1) onPlayVideo(globalIndex);
                    }}
                    className="flex gap-4 p-3 rounded-xl hover:bg-gray-900 transition active:scale-95 cursor-pointer border border-transparent hover:border-gray-800"
                >
                    <div className="relative w-24 h-16 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                        <img src={video.thumbnailUrl} className="w-full h-full object-cover opacity-70" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            {idx === 0 ? <PlayCircle size={20} /> : <Lock size={16} className="text-gray-400" />}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold leading-tight mb-1 truncate">{idx + 1}. {video.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-2">{video.description}</p>
                    </div>
                    {idx === 0 && <CheckCircle2 size={16} className="text-green-500 shrink-0 self-center" />}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;