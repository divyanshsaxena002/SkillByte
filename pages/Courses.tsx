import React from 'react';
import { COURSES } from '../mockData';
import { ListVideo } from '../components/Icons';
import { Course } from '../types';

interface CoursesProps {
  onSelectCourse: (course: Course) => void;
}

const Courses: React.FC<CoursesProps> = ({ onSelectCourse }) => {
  return (
    <div className="h-full bg-black text-white p-4 pb-24 overflow-y-auto">
      <div className="flex items-center justify-between mb-6 mt-2">
        <h2 className="text-2xl font-bold">Structured Paths</h2>
        <div className="bg-gray-800 px-3 py-1 rounded-full text-xs font-bold text-purple-400">
             {COURSES.length} Available
        </div>
      </div>
      
      <div className="space-y-6">
        {COURSES.map(course => (
          <div 
            key={course.id} 
            onClick={() => onSelectCourse(course)}
            className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-xl active:scale-98 transition-transform cursor-pointer group"
          >
            <div className="relative h-40">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="bg-purple-600/90 backdrop-blur text-[10px] font-bold px-2 py-0.5 rounded mb-2 w-fit uppercase tracking-wide">
                            {course.category}
                        </div>
                        <h3 className="font-bold text-xl leading-tight text-white shadow-black drop-shadow-lg">{course.title}</h3>
                    </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center justify-between border-t border-gray-800 pt-3">
                <div className="flex items-center gap-2">
                  <img src={course.creator.avatar} className="w-6 h-6 rounded-full border border-gray-700" />
                  <span className="text-xs font-medium text-gray-300">{course.creator.name}</span>
                </div>
                
                <div className="flex items-center gap-1 text-gray-400 text-xs bg-gray-800 px-2 py-1 rounded-lg">
                  <ListVideo size={14} />
                  <span>{course.totalVideos} Lessons</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Spacer for bottom nav */}
        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default Courses;