import React from 'react';
import { Home, Search, PlusSquare, BookOpen, User } from './Icons';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Feed' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'create', icon: PlusSquare, label: 'Create' }, // Creator Flow
    { id: 'courses', icon: BookOpen, label: 'Learn' }, // Structured Learning
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800 pb-safe z-50">
      <div className="flex justify-between items-center px-4 py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 ${
              activeTab === item.id ? 'text-white' : 'text-gray-500'
            }`}
          >
            <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;