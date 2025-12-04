import React, { useState, useEffect, useRef } from 'react';
import VideoCard from '../components/VideoCard';
import AIOverlay from '../components/AIOverlay';
import { VIDEOS } from '../mockData';
import { Video, User } from '../types';

interface FeedProps {
  onXPEarned: (amount: number) => void;
  currentUser: User;
}

const Feed: React.FC<FeedProps> = ({ onXPEarned, currentUser }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isAIPlaneOpen, setIsAIPlaneOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect which video is in view
  useEffect(() => {
    const options = {
      root: containerRef.current,
      threshold: 0.6, // Video is considered "active" when 60% visible
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveVideoIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    
    const elements = containerRef.current?.querySelectorAll('.video-snap-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="relative w-full h-full bg-black">
      {/* Top Bar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-lg">
          Skill<span className="text-purple-500">Byte</span>
        </h1>
        <div className="bg-gray-800/60 backdrop-blur px-3 py-1 rounded-full border border-white/10 pointer-events-auto">
          <span className="text-xs font-bold text-yellow-400">🔥 Learning Mode</span>
        </div>
      </div>

      {/* Main Scroll Container */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y-mandatory no-scrollbar"
      >
        {VIDEOS.map((video, index) => (
          <div key={video.id} data-index={index} className="video-snap-item w-full h-full snap-center">
            <VideoCard 
              video={video} 
              isActive={index === activeVideoIndex}
              isMuted={isMuted}
              toggleMute={toggleMute}
              onOpenAI={() => setIsAIPlaneOpen(true)}
              currentUser={currentUser}
            />
          </div>
        ))}
      </div>

      {/* AI Drawer */}
      <AIOverlay 
        video={VIDEOS[activeVideoIndex]} 
        isOpen={isAIPlaneOpen} 
        onClose={() => setIsAIPlaneOpen(false)}
        onXPEarned={onXPEarned}
      />
    </div>
  );
};

export default Feed;