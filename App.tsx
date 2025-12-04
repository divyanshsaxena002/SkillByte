import React, { useState } from 'react';
import Feed from './pages/Feed';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import Discover from './pages/Discover';
import CreatorStudio from './pages/CreatorStudio';
import CourseDetail from './pages/CourseDetail';
import AuthScreen from './pages/AuthScreen';
import EditProfile from './pages/EditProfile';
import BottomNav from './components/BottomNav';
import { Course, User } from './types';

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [xp, setXP] = useState(1250);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setIsEditingProfile(false);
  };

  const handleXP = (amount: number) => {
    setXP(prev => prev + amount);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  const handlePlayCourseVideo = (videoIndex: number) => {
    setActiveTab('home');
    setSelectedCourse(null);
  };

  // Auth Guard
  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Feed onXPEarned={handleXP} currentUser={currentUser} />;
      case 'courses':
        if (selectedCourse) {
            return (
                <CourseDetail 
                    course={selectedCourse} 
                    onBack={handleBackToCourses} 
                    onPlayVideo={handlePlayCourseVideo} 
                />
            );
        }
        return <Courses onSelectCourse={handleSelectCourse} />;
      case 'profile':
        return (
          <Profile 
            user={currentUser} 
            xp={xp} 
            onEditProfile={() => setIsEditingProfile(true)}
            onLogout={handleLogout}
          />
        );
      case 'discover':
        return <Discover />;
      case 'create':
        return <CreatorStudio />;
      default:
        return <Feed onXPEarned={handleXP} currentUser={currentUser} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black overflow-hidden relative font-sans">
      <main className="flex-1 h-full w-full relative overflow-hidden">
        {renderContent()}
      </main>
      
      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <EditProfile 
          user={currentUser} 
          onSave={handleUpdateProfile} 
          onCancel={() => setIsEditingProfile(false)} 
        />
      )}
      
      {/* 
        Hide BottomNav when inside a specific course detail to give full screen immersion 
      */}
      {!selectedCourse && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
};

export default App;