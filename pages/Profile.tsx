import React from 'react';
import { User } from '../types';
import { TrendingUp, BookOpen, CheckCircle2, ChevronRight, Edit2, LogOut } from '../components/Icons';

interface ProfileProps {
  user: User;
  xp: number;
  onEditProfile: () => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, xp, onEditProfile, onLogout }) => {
  return (
    <div className="h-full bg-black text-white p-6 pb-24 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 mt-4">
        <div className="w-24 h-24 rounded-full border-2 border-purple-500 p-1 mb-3">
          <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <span className="text-gray-400 text-sm">{user.handle || '@new_user'}</span>
        {user.bio && <p className="text-gray-400 text-xs mt-2 text-center max-w-[200px]">{user.bio}</p>}
        
        <div className="flex gap-3 mt-4">
          <button 
            onClick={onEditProfile}
            className="px-4 py-2 bg-gray-800 rounded-full text-xs font-bold border border-gray-700 hover:bg-gray-700 transition flex items-center gap-2"
          >
              <Edit2 size={12} />
              Edit Profile
          </button>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-red-900/20 text-red-400 rounded-full text-xs font-bold border border-red-900/50 hover:bg-red-900/40 transition flex items-center gap-2"
          >
              <LogOut size={12} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col items-center">
          <TrendingUp className="text-green-400 mb-2" size={24} />
          <span className="text-2xl font-bold">{xp}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Total XP</span>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col items-center">
          <BookOpen className="text-blue-400 mb-2" size={24} />
          <span className="text-2xl font-bold">12</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Lessons</span>
        </div>
      </div>

      {/* Streak Section */}
      <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border border-orange-500/30 p-4 rounded-xl mb-8 flex items-center justify-between shadow-lg shadow-orange-900/20">
        <div>
          <h3 className="font-bold text-lg text-orange-200">3 Day Streak! 🔥</h3>
          <p className="text-xs text-orange-300/70">Keep watching to maintain your fire.</p>
        </div>
        <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-black border border-orange-400">3</div>
      </div>

      {/* Recent Activity */}
      <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
        Recent Achievements
        <span className="text-xs text-purple-400 cursor-pointer">View All</span>
      </h3>
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-4 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
            <CheckCircle2 className="text-purple-500" size={20} />
            <div>
              <p className="text-sm font-medium">Completed Quiz: React Basics</p>
              <p className="text-xs text-gray-500">2 hours ago • +50 XP</p>
            </div>
        </div>
        <div className="flex items-center gap-4 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
            <CheckCircle2 className="text-purple-500" size={20} />
            <div>
              <p className="text-sm font-medium">Watched: Color Theory</p>
              <p className="text-xs text-gray-500">Yesterday • +10 XP</p>
            </div>
        </div>
        <div className="flex items-center gap-4 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">1</div>
            <div>
              <p className="text-sm font-medium">Joined SkillByte</p>
              <p className="text-xs text-gray-500">3 days ago</p>
            </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-1">
        {['Account Settings', 'Notifications', 'Help & Support'].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-900 cursor-pointer text-gray-300 hover:text-white transition">
                <span className="text-sm">{item}</span>
                <ChevronRight size={16} className="text-gray-600" />
            </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;