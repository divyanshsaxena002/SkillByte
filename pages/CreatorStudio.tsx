import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Type, CheckCircle2, Mic, X, StopCircle } from 'lucide-react';
import { Category } from '../types';

const CreatorStudio = () => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<'upload' | 'camera' | 'audio'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  // Effect to attach stream to video element when mode changes to camera
  useEffect(() => {
    if (mode === 'camera' && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [mode]);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // --- Upload Logic ---
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(2);
      }, 1500);
    }
  };

  // --- Camera/Audio Logic ---
  const startCamera = async () => {
    try {
      // 1. Request Permission FIRST
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      // 2. Set Stream ref
      streamRef.current = stream;
      
      // 3. Switch UI Mode (triggers useEffect to attach stream)
      setMode('camera');
      
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Please allow camera and microphone permissions to record.");
    }
  };

  const startAudio = async () => {
    try {
      // 1. Request Permission FIRST
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // 2. Set Stream ref
      streamRef.current = stream;
      
      // 3. Switch UI Mode
      setMode('audio');
    } catch (err) {
      console.error("Microphone access denied", err);
      alert("Please allow microphone permissions to record audio.");
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop Recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      // Start Recording
      if (!streamRef.current) return;
      
      chunksRef.current = [];
      const mediaRecorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mode === 'camera' ? 'video/mp4' : 'audio/mp3' });
        const file = new File([blob], mode === 'camera' ? 'recorded-video.mp4' : 'voiceover.mp3', { type: blob.type });
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(blob));
        stopStream();
        setStep(2);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCancelRecording = () => {
    stopStream();
    setMode('upload');
    setIsRecording(false);
    setRecordingTime(0);
  };

  // --- Publish Logic ---
  const handlePublish = () => {
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
    }, 1500);
  };

  const resetFlow = () => {
    setStep(1);
    setMode('upload');
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="h-full bg-black text-white p-6 overflow-y-auto pb-24">
      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-purple-500">Creator</span> Studio
          </h1>

          {mode === 'upload' && (
            <div className="flex flex-col gap-6 animate-in slide-in-from-right">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="video/*"
                onChange={handleFileChange}
              />
              
              <div 
                onClick={triggerFileUpload}
                className="border-2 border-dashed border-gray-700 rounded-2xl h-64 flex flex-col items-center justify-center bg-gray-900/50 hover:bg-gray-900 hover:border-purple-500 transition-colors cursor-pointer group"
              >
                <div className="w-16 h-16 bg-gray-800 group-hover:bg-gray-700 rounded-full flex items-center justify-center mb-4 transition-colors">
                  <Upload className="text-purple-500" />
                </div>
                <p className="text-gray-400 font-medium group-hover:text-white transition-colors">Tap to upload video</p>
                <p className="text-xs text-gray-600 mt-2">MP4, MOV (Max 60s)</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={startCamera}
                  className="flex-1 bg-gray-800 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-gray-700 transition active:scale-95"
                >
                  <Camera size={24} className="text-blue-400" />
                  <span className="text-sm font-bold">Record</span>
                </button>
                <button 
                  onClick={startAudio}
                  className="flex-1 bg-gray-800 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-gray-700 transition active:scale-95"
                >
                  <Mic size={24} className="text-pink-400" />
                  <span className="text-sm font-bold">Voiceover</span>
                </button>
              </div>

              {isProcessing && (
                 <div className="w-full bg-purple-600 p-4 rounded-xl flex items-center justify-center gap-2 animate-pulse">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="font-bold">Analyzing Video...</span>
                 </div>
              )}
            </div>
          )}

          {mode === 'camera' && (
            <div className="fixed inset-0 z-50 bg-black flex flex-col">
              <div className="relative flex-1 bg-gray-900">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover transform scale-x-[-1]" 
                />
                <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse" style={{ opacity: isRecording ? 1 : 0 }}>
                  REC {formatTime(recordingTime)}
                </div>
                <button 
                  onClick={handleCancelRecording}
                  className="absolute top-4 left-4 p-2 bg-black/50 rounded-full text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="h-32 bg-black flex items-center justify-center gap-8">
                 <button 
                  onClick={toggleRecording}
                  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${isRecording ? 'border-red-500 bg-red-500/20' : 'border-white'}`}
                 >
                   <div className={`rounded-full transition-all ${isRecording ? 'w-8 h-8 bg-red-500 rounded-md' : 'w-16 h-16 bg-white'}`}></div>
                 </button>
              </div>
            </div>
          )}

          {mode === 'audio' && (
            <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8">
               <button 
                  onClick={handleCancelRecording}
                  className="absolute top-6 left-6 p-2 bg-gray-800 rounded-full text-white"
                >
                  <X size={24} />
                </button>

               <div className="flex items-center justify-center mb-12 relative">
                  {isRecording && (
                    <>
                      <div className="absolute w-48 h-48 bg-pink-500/30 rounded-full animate-ping"></div>
                      <div className="absolute w-64 h-64 bg-pink-500/10 rounded-full animate-ping delay-75"></div>
                    </>
                  )}
                  <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center z-10 border-2 border-pink-500">
                    <Mic size={48} className="text-pink-500" />
                  </div>
               </div>

               <div className="text-4xl font-mono font-bold text-white mb-12">
                 {formatTime(recordingTime)}
               </div>

               <button 
                  onClick={toggleRecording}
                  className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-pink-600 hover:bg-pink-700'}`}
               >
                 {isRecording ? <><StopCircle /> Stop Recording</> : <><Mic /> Start Recording</>}
               </button>
            </div>
          )}
        </>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right">
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                <div className="h-64 bg-gray-800 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center group">
                     {previewUrl ? (
                        <>
                          {selectedFile?.type.includes('video') ? (
                            <video src={previewUrl} className="w-full h-full object-cover" controls playsInline />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-pink-500">
                               <Mic size={48} className="mb-4" />
                               <span className="text-white font-bold">Audio Recording</span>
                               <span className="text-xs text-gray-500 mt-2">{selectedFile?.name}</span>
                            </div>
                          )}
                          <button 
                            onClick={resetFlow} 
                            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white z-10"
                          >
                            <X size={16} />
                          </button>
                        </>
                     ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">Preview Unavailable</div>
                     )}
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold">Smart Title (AI Generated)</label>
                        <input type="text" defaultValue={mode === 'audio' ? "My Podcast Episode" : "My New Lesson"} className="w-full bg-black border border-gray-700 rounded-lg p-3 mt-1 text-white focus:border-purple-500 outline-none" />
                    </div>
                     <div>
                        <label className="text-xs text-gray-400 uppercase font-bold">Description</label>
                        <textarea defaultValue="Learn how to use state in functional components." className="w-full bg-black border border-gray-700 rounded-lg p-3 mt-1 text-white focus:border-purple-500 outline-none h-20" />
                    </div>
                     <div>
                        <label className="text-xs text-gray-400 uppercase font-bold">Category</label>
                        <div className="flex gap-2 mt-1 overflow-x-auto pb-2 no-scrollbar">
                            {Object.values(Category).map(cat => (
                                <button key={cat} className="px-3 py-1 rounded-full bg-gray-800 text-xs whitespace-nowrap border border-gray-700 hover:bg-purple-900/50 hover:border-purple-500 transition">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

             <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl flex items-start gap-3">
                <Type className="text-purple-400 shrink-0 mt-1" size={18} />
                <div>
                    <p className="text-sm font-bold text-purple-200">AI Enhancement Active</p>
                    <p className="text-xs text-gray-400">We've generated a quiz and summary based on your transcript.</p>
                </div>
             </div>

            {isProcessing ? (
             <div className="w-full bg-purple-600 p-4 rounded-xl flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="font-bold">Publishing...</span>
             </div>
            ) : (
                <div className="flex gap-3">
                    <button 
                        onClick={resetFlow}
                        className="flex-1 bg-gray-800 text-white font-bold py-4 rounded-xl hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handlePublish}
                        className="flex-[2] bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition"
                    >
                        Publish Video
                    </button>
                </div>
            )}
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center justify-center h-[60vh] animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/30">
                <CheckCircle2 size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Live!</h2>
            <p className="text-gray-400 text-center max-w-xs mb-8">Your video is now live on the feed and has been added to the "Tech" category.</p>
            
            <button 
                onClick={resetFlow}
                className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-700 transition"
            >
                Upload Another
            </button>
        </div>
      )}
    </div>
  );
};

export default CreatorStudio;