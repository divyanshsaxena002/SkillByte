import React, { useState } from 'react';
import { Chrome, Facebook, Mail } from '../components/Icons';
import { User } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialLogin = (provider: string) => {
    setIsLoading(provider);
    
    // Simulate network delay
    setTimeout(() => {
      // Create a mock user based on "login"
      const mockUser: User = {
        id: 'u_aryan1414',
        name: 'Aryan Sharma',
        email: 'aryan@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan',
        bio: 'Learning something new every day! 🚀',
        handle: '@aryan_sharma1414'
      };
      onLogin(mockUser);
    }, 1500);
  };

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-purple-600/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-600/30 rounded-full blur-[100px]"></div>

      <div className="z-10 w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/20 transform rotate-3">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
             </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Skill<span className="text-purple-500">Byte</span></h1>
          <p className="text-gray-400">Bite-sized learning for busy minds.</p>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-4">
          <button 
            onClick={() => handleSocialLogin('google')}
            disabled={!!isLoading}
            className="w-full bg-white text-gray-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition active:scale-95 disabled:opacity-70 disabled:scale-100"
          >
            {isLoading === 'google' ? (
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Chrome size={20} className="text-blue-600" />
            )}
            Continue with Google
          </button>

          <button 
            onClick={() => handleSocialLogin('facebook')}
            disabled={!!isLoading}
            className="w-full bg-[#1877F2] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-[#166fe5] transition active:scale-95 disabled:opacity-70 disabled:scale-100"
          >
             {isLoading === 'facebook' ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Facebook size={20} fill="currentColor" />
            )}
            Continue with Facebook
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-500">Or continue with email</span>
            </div>
          </div>

          <button 
            disabled
            className="w-full bg-transparent border border-gray-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
          >
            <Mail size={20} />
            Sign up with Email
          </button>
        </div>

        <p className="mt-8 text-xs text-center text-gray-600">
          By continuing, you agree to our <span className="text-gray-400 underline">Terms of Service</span> and <span className="text-gray-400 underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;