import React, { useState, useRef } from 'react';
import { User } from '../types';
import { X, Camera } from '../components/Icons';

interface EditProfileProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [handle, setHandle] = useState(user.handle || '@user');
  const [bio, setBio] = useState(user.bio || '');
  const [avatar, setAvatar] = useState(user.avatar);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      onSave({
        ...user,
        name,
        handle,
        bio,
        avatar
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button onClick={onCancel} className="text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <span className="font-bold text-lg">Edit Profile</span>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="text-purple-500 font-bold text-sm disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="p-6 flex flex-col items-center gap-6">
        {/* Avatar Edit */}
        <div 
          className="relative group cursor-pointer"
          onClick={handleAvatarClick}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-800 group-hover:border-purple-500 transition-colors">
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border border-black group-hover:bg-purple-600 transition-colors">
            <Camera size={16} className="text-white" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="w-full space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Display Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Username</label>
            <input 
              type="text" 
              value={handle} 
              onChange={(e) => setHandle(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Bio</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none h-24 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;