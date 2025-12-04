import React, { useRef, useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, BrainCircuit, ListVideo, ChevronRight, X, Send } from './Icons';
import { Video, User } from '../types';
import { COURSES } from '../mockData';

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  toggleMute: () => void;
  isMuted: boolean;
  onOpenAI: () => void;
  currentUser: User;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isActive, toggleMute, isMuted, onOpenAI, currentUser }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Interaction States
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: 'Sarah Dev', avatar: 'S', text: 'This explanation is actually clearer than the docs!', time: '2m' },
    { id: 2, user: 'CodeNewbie', avatar: 'C', text: 'Finally I understand this hook.', time: '1h' },
    { id: 3, user: 'SeniorEng_Mike', avatar: 'M', text: 'Great summary.', time: '3h' }
  ]);
  const [newComment, setNewComment] = useState('');

  // Find related course if any
  const relatedCourse = COURSES.find(c => c.id === video.courseId);

  useEffect(() => {
    if (isActive) {
      const playPromise = videoRef.current?.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
      setShowComments(false); // Close comments when swiping away
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: `Check out this lesson on SkillByte: ${video.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      alert('Link copied to clipboard!');
    }
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setComments([
      { 
        id: Date.now(), 
        user: currentUser.name, 
        avatar: currentUser.name[0], // Simplified avatar for comments
        text: newComment, 
        time: 'Just now' 
      },
      ...comments
    ]);
    setNewComment('');
  };

  return (
    <div className="relative w-full h-full snap-start flex-shrink-0 bg-gray-900 overflow-hidden">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Progress Bar */}
      <div className="absolute bottom-[80px] left-0 right-0 h-1 bg-gray-800/50 z-20">
        <div 
          className="h-full bg-purple-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Side Actions */}
      <div className="absolute right-2 bottom-28 flex flex-col items-center gap-6 z-20">
        {/* Like */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={handleLike}
            className="p-2 bg-gray-800/60 backdrop-blur-sm rounded-full active:scale-90 transition-transform"
          >
            <Heart 
              size={28} 
              className={isLiked ? "text-red-500 fill-red-500" : "text-white"} 
              strokeWidth={1.5} 
            />
          </button>
          <span className="text-xs font-medium drop-shadow-md text-white">{likeCount}</span>
        </div>

        {/* Comment */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
            className="p-2 bg-gray-800/60 backdrop-blur-sm rounded-full active:scale-90 transition-transform"
          >
            <MessageCircle size={28} className="text-white" strokeWidth={1.5} />
          </button>
          <span className="text-xs font-medium drop-shadow-md text-white">{comments.length}</span>
        </div>
        
        {/* AI Brain */}
        <div className="flex flex-col items-center gap-1">
           <button 
            onClick={(e) => { e.stopPropagation(); onOpenAI(); }}
            className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/30 animate-pulse hover:animate-none hover:scale-110 transition-transform"
          >
            <BrainCircuit size={28} className="text-white" />
          </button>
          <span className="text-[10px] font-bold text-purple-300 drop-shadow-md bg-black/50 px-2 py-0.5 rounded-full">AI INSIGHT</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-1">
           <button 
            onClick={handleShare}
            className="p-2 bg-gray-800/60 backdrop-blur-sm rounded-full active:scale-90 transition-transform"
           >
            <Share2 size={24} className="text-white" strokeWidth={1.5} />
          </button>
          <span className="text-xs font-medium drop-shadow-md text-white">Share</span>
        </div>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-3 pointer-events-auto">
          <img src={video.creator.avatar} alt={video.creator.name} className="w-8 h-8 rounded-full border border-white/50" />
          <span className="text-sm font-semibold text-white drop-shadow-md">{video.creator.name}</span>
          {video.creator.isVerified && <div className="bg-blue-500 rounded-full p-[2px]"><div className="w-2 h-2 bg-white rounded-full"></div></div>}
        </div>

        <h2 className="text-base font-bold text-white mb-1 line-clamp-2 pr-12 drop-shadow-md">{video.title}</h2>
        <p className="text-sm text-gray-200 line-clamp-1 mb-3 drop-shadow-md">{video.description}</p>
        
        {/* Course Context Pill */}
        {relatedCourse && (
          <div className="flex items-center justify-between bg-gray-800/80 backdrop-blur-md rounded-lg p-2 pr-3 max-w-[85%] border border-gray-700/50 mb-6 pointer-events-auto">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-1.5 rounded-md">
                <ListVideo size={14} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 leading-none">Part of Course</span>
                <span className="text-xs font-bold text-white truncate max-w-[150px]">{relatedCourse.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-gray-300">
              {video.orderInCourse}/{relatedCourse.totalVideos}
              <ChevronRight size={14} />
            </div>
          </div>
        )}
      </div>

      {/* Comments Overlay */}
      {showComments && (
        <div 
          className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 flex flex-col justify-end"
          onClick={(e) => { e.stopPropagation(); setShowComments(false); }}
        >
          <div 
            className="bg-gray-900 rounded-t-2xl h-[60%] w-full flex flex-col border-t border-gray-700 shadow-2xl animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <span className="font-bold text-white text-sm">{comments.length} Comments</span>
              <button onClick={() => setShowComments(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-gray-300">{comment.user}</span>
                      <span className="text-[10px] text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-snug mt-0.5">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800 bg-gray-900 pb-safe">
              <div className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2 border border-gray-700 focus-within:border-purple-500 transition-colors">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="bg-transparent text-sm text-white placeholder-gray-500 flex-1 outline-none"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                />
                <button 
                  onClick={handlePostComment}
                  disabled={!newComment.trim()}
                  className={`p-1.5 rounded-full transition-all ${newComment.trim() ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-500'}`}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;