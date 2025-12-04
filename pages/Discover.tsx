import React, { useState } from 'react';
import { Search, TrendingUp, Hash, X } from 'lucide-react';
import { Category } from '../types';
import { VIDEOS } from '../mockData';

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter videos based on active category and search query
  const displayedVideos = VIDEOS.filter(video => {
    const matchesCategory = activeCategory ? video.category === activeCategory : true;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full bg-black text-white p-4 pb-20 overflow-y-auto">
        <div className="sticky top-0 bg-black/90 backdrop-blur-md z-10 pb-2 pt-2">
            <h1 className="text-2xl font-bold mb-4">Discover</h1>
            <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-500" size={20} />
                <input 
                    type="text" 
                    placeholder="Search skills, creators, tags..." 
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-purple-500 outline-none placeholder:text-gray-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        {/* Trending Categories */}
        <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <TrendingUp className="text-pink-500" size={18} />
                    Trending Topics
                </h2>
                {activeCategory && (
                    <button 
                        onClick={() => setActiveCategory(null)}
                        className="text-xs text-purple-400 font-bold flex items-center gap-1 bg-purple-900/30 px-2 py-1 rounded-lg"
                    >
                        Clear Filter <X size={12} />
                    </button>
                )}
            </div>
            
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {Object.values(Category).map((cat, i) => {
                    const isActive = activeCategory === cat;
                    return (
                        <div 
                            key={i} 
                            onClick={() => setActiveCategory(isActive ? null : cat)}
                            className={`flex-shrink-0 w-32 h-20 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-300 ${isActive ? 'ring-2 ring-white scale-95' : 'opacity-80 hover:opacity-100'}`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(i)}`}></div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition"></div>
                            <span className="relative font-bold text-shadow z-10">{cat}</span>
                            {isActive && <div className="absolute top-2 right-2 bg-white rounded-full p-0.5"><div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div></div>}
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Popular Tags */}
        <div className="mt-6">
             <h2 className="text-lg font-bold mb-3">Popular Tags</h2>
             <div className="flex flex-wrap gap-2">
                {['#react', '#design', '#startup', '#ai', '#productivity', '#coding'].map(tag => (
                    <button 
                        key={tag} 
                        onClick={() => setSearchQuery(tag.replace('#', ''))}
                        className="px-3 py-1.5 bg-gray-900 rounded-lg text-sm text-gray-300 border border-gray-800 flex items-center gap-1 hover:border-purple-500 transition-colors"
                    >
                        <Hash size={12} className="text-purple-500" />
                        {tag.replace('#', '')}
                    </button>
                ))}
             </div>
        </div>

        {/* Featured Micro-Lessons */}
        <div className="mt-8">
            <h2 className="text-lg font-bold mb-3">
                {activeCategory ? `${activeCategory} Lessons` : 'Top Micro-Lessons'}
                <span className="ml-2 text-xs font-normal text-gray-500">({displayedVideos.length})</span>
            </h2>
            
            {displayedVideos.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {displayedVideos.map((video) => (
                        <div key={video.id} className="relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-900 group">
                            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-xs font-bold text-white line-clamp-2 leading-tight mb-1">{video.title}</p>
                                <div className="flex items-center gap-1">
                                    <img src={video.creator.avatar} className="w-4 h-4 rounded-full" />
                                    <span className="text-[10px] text-gray-300 truncate">{video.creator.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500">
                    <p>No lessons found for this category.</p>
                </div>
            )}
        </div>
    </div>
  );
};

const getGradient = (index: number) => {
    const gradients = [
        'from-blue-600 to-cyan-400',
        'from-purple-600 to-pink-400',
        'from-green-600 to-emerald-400',
        'from-orange-600 to-amber-400',
        'from-red-600 to-rose-400',
    ];
    return gradients[index % gradients.length];
};

export default Discover;