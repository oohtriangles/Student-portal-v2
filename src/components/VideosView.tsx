import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Bookmark, 
  BookmarkCheck,
  FileText, 
  Link as LinkIcon, 
  Download, 
  CheckSquare, 
  Plus, 
  Sparkles,
  AlertCircle,
  PlayCircle,
  FolderOpen
} from 'lucide-react';

interface PreClassItem {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'task';
  duration?: string;
  size?: string;
  details?: string;
  completed: boolean;
  isBookmarked?: boolean;
  priority?: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export default function VideosView() {
  // Video items state
  const [videos, setVideos] = useState<PreClassItem[]>([
    { id: 'v1', title: 'Foundations: Principles of modern design', type: 'video', duration: '12:45', completed: false },
    { id: 'v2', title: 'User Research & Analysis', type: 'video', duration: '8:20', completed: true },
    { id: 'v3', title: 'Tools and Prototype', type: 'video', duration: '15:10', completed: false },
    { id: 'v4', title: 'Testing and Iteration', type: 'video', duration: '10:30', completed: false },
  ]);

  // Reading items state
  const [readings, setReadings] = useState<PreClassItem[]>([
    { id: 'r1', title: 'Foundations: Design History', type: 'reading', duration: '8 min read', details: 'Exploring the origins of user-centric design from industrial revolution to modern digital products.', completed: true, isBookmarked: true },
    { id: 'r2', title: 'User Research PDF', type: 'reading', size: '1.2 MB', details: 'Complete interview guidelines, demographics data matrices and analysis models.', completed: false, isBookmarked: false },
    { id: 'r3', title: 'Tools Checklist', type: 'reading', size: 'External Link', details: 'A comprehensive list of recommended plugins and design system templates.', completed: false, isBookmarked: false },
    { id: 'r4', title: 'Iteration Guide', type: 'reading', duration: '5 min read', details: 'Feedback loop structures, rapid prototyping tips, and version control guidelines.', completed: false, isBookmarked: false },
  ]);

  // Tasks items state
  const [tasks, setTasks] = useState<PreClassItem[]>([
    { id: 't1', title: 'Foundations Quiz', type: 'task', dueDate: 'Completed on Jan 12', completed: true },
    { id: 't2', title: 'User Research Exercise', type: 'task', dueDate: 'Due in 2 hours', priority: 'high', completed: false },
    { id: 't3', title: 'Prototype Setup', type: 'task', dueDate: 'Install Figma plugins', completed: false },
    { id: 't4', title: 'Testing and Iteration', type: 'task', dueDate: 'Download assets', completed: false },
  ]);

  // Active Video Player Popup Modal State
  const [playingVideo, setPlayingVideo] = useState<PreClassItem | null>(null);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<any>(null);

  // Expanded Reading Detail Modal
  const [readingDetail, setReadingDetail] = useState<PreClassItem | null>(null);

  // Suggest Task custom modal / inline inputs
  const [showTaskSuggester, setShowTaskSuggester] = useState(false);
  const [customTaskTitle, setCustomTaskTitle] = useState('');

  const toggleVideoComplete = (id: string) => {
    setVideos(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const toggleReadingComplete = (id: string) => {
    setReadings(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const toggleReadingBookmark = (id: string) => {
    setReadings(prev => prev.map(item => item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item));
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleOpenVideo = (video: PreClassItem) => {
    setPlayingVideo(video);
    setSimulatedProgress(video.completed ? 100 : 0);
    setIsPlaying(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleStartPlay = () => {
    if (isPlaying) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const id = setInterval(() => {
        setSimulatedProgress(prev => {
          if (prev >= 100) {
            clearInterval(id);
            setIsPlaying(false);
            // Mark completed
            if (playingVideo) {
              toggleVideoComplete(playingVideo.id);
            }
            return 100;
          }
          return prev + 10;
        });
      }, 500);
      setIntervalId(id);
    }
  };

  const handleCloseVideo = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsPlaying(false);
    setPlayingVideo(null);
  };

  const handleSuggestTask = () => {
    if (!customTaskTitle.trim()) return;
    const newTask: PreClassItem = {
      id: `t-${Date.now()}`,
      title: customTaskTitle.trim(),
      type: 'task',
      dueDate: 'Suggested Just Now',
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setCustomTaskTitle('');
    setShowTaskSuggester(false);
  };

  // Dynamic Progress Calculation
  const totalItems = videos.length + readings.length + tasks.length;
  const completedItems = 
    videos.filter(v => v.completed).length + 
    readings.filter(r => r.completed).length + 
    tasks.filter(t => t.completed).length;
  
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <div id="preclass-content-screen" className="space-y-8 animate-fade-in relative">
      {/* Course Page Header Banner */}
      <header id="preclass-header" className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <nav className="flex text-label-sm font-label-sm text-outline mb-2">
            <span className="hover:text-primary transition-colors cursor-pointer">Courses</span>
            <span className="mx-2">/</span>
            <span className="text-primary font-semibold">UX Foundations</span>
          </nav>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Pre-class Content</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">Review these materials before the live session on Tuesday.</p>
        </div>
        
        <div className="flex gap-2 shrink-0">
          <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-label-sm font-semibold flex items-center gap-1">
            <PlayCircle size={12} />
            <span>4 Lessons</span>
          </span>
          <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-label-sm font-semibold flex items-center gap-1">
            <Clock size={12} />
            <span>2.5 Hours total</span>
          </span>
        </div>
      </header>

      {/* Bento Grid Content columns */}
      <div id="preclass-bento-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ================= VIDEOS COLUMN ================= */}
        <section id="column-videos" className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1 mb-1">
            <div className="flex items-center gap-2">
              <PlayCircle className="text-primary fill-primary/10" size={20} />
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Videos</h3>
            </div>
            <span className="text-label-sm text-outline font-semibold">
              {videos.filter(v => v.completed).length} / {videos.length} completed
            </span>
          </div>

          {/* Hero Main Video Card */}
          <div 
            id="main-video-hero-card"
            onClick={() => handleOpenVideo(videos[0])}
            className="group relative overflow-hidden bg-surface-container-lowest border border-outline-variant rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5oXBtewoar4sJDdlbNqFYw0En-tAt4hefsMRifxijc_BuSPdW0ur7Qxi9SS1gQfLmsiQEOIWYllU-zH9As_2WBg7ERmgmi8_Izgx_-h7VhSzkNyk_OL8HUixvbUXRwl1IHLr2rTSHd2cwwAHpXrPiwBs8FUW6mPYoA1mTVcVO3BGAhun0RT7JltRYp0yzK67TSNl6NeK8pcn0DB0T1LCI8xt6db3iqQZhSR6ZVk8Pfn2abydRr4tWl_8W4AY9LZC4SQyJ-Omee35b')` }}
              ></div>
              {/* Play Overlay Indicator */}
              <div className="absolute inset-0 bg-on-surface/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Play size={20} className="fill-primary ml-1" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                {videos[0].duration}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2">
              <div>
                <h4 className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                  {videos[0].title}
                </h4>
                <p className="text-label-sm text-outline mt-0.5">Principles of modern design</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVideoComplete(videos[0].id);
                }}
                className="p-1 text-outline hover:text-primary rounded-full hover:bg-surface-container-low transition-colors"
              >
                {videos[0].completed ? (
                  <CheckCircle2 className="text-green-600" size={18} />
                ) : (
                  <Circle size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Small Video Items List */}
          <div className="space-y-3">
            {videos.slice(1).map((video) => (
              <div 
                key={video.id}
                id={`video-row-${video.id}`}
                onClick={() => handleOpenVideo(video)}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex gap-4 items-center group cursor-pointer hover:bg-surface-container-low transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                  <Play size={18} className="group-hover:scale-110 transition-transform" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-label-md text-label-md text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-label-sm text-outline mt-0.5">{video.duration} • Video Lecture</p>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVideoComplete(video.id);
                  }}
                  className="p-1 text-outline hover:text-primary rounded-full hover:bg-surface-container-low transition-colors"
                >
                  {video.completed ? (
                    <CheckCircle2 className="text-green-600" size={18} />
                  ) : (
                    <Circle size={18} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= READINGS COLUMN ================= */}
        <section id="column-readings" className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1 mb-1">
            <div className="flex items-center gap-2">
              <BookOpen className="text-tertiary fill-tertiary/10" size={20} />
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Readings</h3>
            </div>
            <span className="text-label-sm text-outline font-semibold">
              {readings.filter(r => r.completed).length} / {readings.length} completed
            </span>
          </div>

          {/* Primary Feature Reading Article Card */}
          <div 
            id="featured-reading-card"
            onClick={() => setReadingDetail(readings[0])}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-tertiary/40 transition-all cursor-pointer hover:shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="bg-tertiary-container/10 text-tertiary text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                Article
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleReadingBookmark(readings[0].id);
                }}
                className="text-outline hover:text-tertiary transition-colors"
              >
                {readings[0].isBookmarked ? (
                  <Bookmark className="text-tertiary fill-tertiary" size={16} />
                ) : (
                  <Bookmark size={16} />
                )}
              </button>
            </div>

            <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-2 hover:text-tertiary transition-colors">
              {readings[0].title}
            </h4>
            <p className="text-body-md font-body-md text-on-surface-variant line-clamp-2">
              {readings[0].details}
            </p>

            <div className="mt-4 pt-4 border-t border-outline-variant/50 flex justify-between items-center">
              <span className="text-label-sm text-outline flex items-center gap-1 font-medium">
                <Clock size={12} />
                {readings[0].duration}
              </span>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleReadingComplete(readings[0].id);
                }}
                className="text-xs text-outline hover:text-tertiary font-bold flex items-center gap-1"
              >
                {readings[0].completed ? (
                  <span className="text-green-600 flex items-center gap-1">Completed <CheckCircle2 size={12} /></span>
                ) : (
                  <span>Mark Read</span>
                )}
              </button>
            </div>
          </div>

          {/* Reading Resources list */}
          <div className="space-y-3">
            {readings.slice(1).map((reading) => (
              <div 
                key={reading.id}
                id={`reading-row-${reading.id}`}
                onClick={() => setReadingDetail(reading)}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex gap-4 items-center hover:bg-surface-container-low transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                  {reading.size === 'External Link' ? (
                    <LinkIcon size={16} />
                  ) : reading.size ? (
                    <Download size={16} />
                  ) : (
                    <BookOpen size={16} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-label-md text-label-md text-on-surface font-semibold truncate group-hover:text-tertiary transition-colors">
                    {reading.title}
                  </h4>
                  <p className="text-label-sm text-outline mt-0.5">
                    {reading.size || reading.duration} • {reading.size === 'External Link' ? 'External resource' : 'Study materials'}
                  </p>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReadingComplete(reading.id);
                  }}
                  className="p-1 text-outline hover:text-tertiary rounded-full hover:bg-surface-container-low transition-colors"
                >
                  {reading.completed ? (
                    <CheckCircle2 className="text-green-600" size={18} />
                  ) : (
                    <Circle size={18} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TASKS COLUMN ================= */}
        <section id="column-tasks" className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1 mb-1">
            <div className="flex items-center gap-2">
              <CheckSquare className="text-secondary fill-secondary/10" size={20} />
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Tasks</h3>
            </div>
            <span className="text-label-sm text-outline font-semibold">
              {tasks.filter(t => t.completed).length} / {tasks.length} completed
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id}
                id={`task-item-card-${task.id}`}
                onClick={() => toggleTaskComplete(task.id)}
                className={`flex items-start gap-3.5 p-4 bg-surface-container-lowest border border-outline-variant rounded-xl cursor-pointer hover:border-primary/50 transition-all ${
                  task.completed ? 'bg-surface-container-low/45 opacity-75' : ''
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="text-green-600" size={18} />
                  ) : (
                    <Circle className="text-outline hover:text-primary" size={18} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`font-label-md text-label-md text-on-surface font-semibold ${
                    task.completed ? 'line-through text-outline font-normal' : ''
                  }`}>
                    {task.title}
                  </h4>
                  <p className={`text-label-sm mt-0.5 ${
                    task.priority === 'high' ? 'text-red-600 font-semibold' : 'text-outline'
                  }`}>
                    {task.dueDate}
                  </p>
                </div>

                {task.priority === 'high' && !task.completed && (
                  <span className="material-symbols-outlined text-white bg-red-600 rounded px-1.5 py-0.5 text-[11px] font-bold tracking-wider shrink-0 flex items-center justify-center">
                    !
                  </span>
                )}
              </div>
            ))}

            {/* Task Suggester Section */}
            {showTaskSuggester ? (
              <div className="p-4 bg-surface-container border border-outline rounded-xl space-y-3 animate-slide-up">
                <input 
                  type="text"
                  placeholder="Task title..."
                  value={customTaskTitle}
                  onChange={(e) => setCustomTaskTitle(e.target.value)}
                  className="w-full px-3 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-full text-xs"
                />
                <div className="flex gap-2 justify-end">
                  <button 
                    onClick={() => setShowTaskSuggester(false)}
                    className="px-3 py-1 bg-surface-container-high rounded-full text-xs text-on-surface"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSuggestTask}
                    className="px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <button 
                id="btn-suggest-task"
                onClick={() => setShowTaskSuggester(true)}
                className="w-full p-4 border-2 border-dashed border-outline-variant/40 rounded-xl flex items-center justify-center text-outline gap-2 hover:bg-surface-container-low hover:border-outline/55 transition-colors cursor-pointer"
              >
                <Plus size={16} />
                <span className="font-label-md text-label-md font-semibold">Suggest a Task</span>
              </button>
            )}
          </div>
        </section>

      </div>

      {/* Complete Footer Progress Status Section */}
      <footer id="preclass-footer" className="p-6 bg-primary-container text-on-primary-container rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center relative shrink-0">
            {/* Dynamic Circular progress SVG */}
            <svg className="w-16 h-16 absolute -rotate-90">
              <circle className="text-white/10" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
              <circle 
                className="text-white transition-all duration-700" 
                cx="32" 
                cy="32" 
                fill="transparent" 
                r="28" 
                stroke="currentColor" 
                strokeWidth="4"
                strokeDasharray="176" 
                strokeDashoffset={176 - (176 * progressPercent) / 100}
              ></circle>
            </svg>
            <span className="text-white font-headline-sm text-headline-sm">{progressPercent}%</span>
          </div>

          <div>
            <h4 className="font-headline-sm text-headline-sm text-white font-semibold">
              {progressPercent === 100 ? 'Class ready!' : progressPercent >= 70 ? 'Almost there!' : 'Keep learning!'}
            </h4>
            <p className="text-body-md font-body-md text-white/80">
              {progressPercent === 100 
                ? "Excellent job! You are fully prepared for the upcoming design foundations live class." 
                : `You've completed ${completedItems} of ${totalItems} lessons. Keep up the great momentum.`}
            </p>
          </div>
        </div>

        <button 
          onClick={() => {
            const firstIncomplete = [...videos, ...readings, ...tasks].find(item => !item.completed);
            if (firstIncomplete) {
              alert(`Resuming Foundations: Let's study "${firstIncomplete.title}"!`);
            } else {
              alert("You're all completed!");
            }
          }}
          className="bg-white text-primary px-6 py-2.5 rounded-full font-semibold text-label-md shadow-md hover:bg-surface-container-low transition-colors shrink-0 cursor-pointer"
        >
          Resume Foundations
        </button>
      </footer>

      {/* ================= MODAL: VIDEO LECTURE SIMULATOR PLAYER ================= */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant">
              <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                UX Foundations Series
              </span>
              <button 
                onClick={handleCloseVideo}
                className="p-1 hover:bg-surface-container-low rounded-full transition-colors font-bold text-outline hover:text-on-surface text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">{playingVideo.title}</h3>
              <p className="text-xs text-outline">Interactive class preparation simulation</p>
            </div>

            {/* Simulated Player Console Screen */}
            <div className="aspect-video bg-neutral-900 rounded-xl relative overflow-hidden flex flex-col justify-between p-4 text-white">
              <div className="text-center my-auto space-y-2">
                <PlayCircle size={40} className="mx-auto text-white/40 animate-pulse" />
                <p className="text-xs text-white/60">Simulating interactive video stream...</p>
                <p className="text-sm font-semibold">{simulatedProgress}% completed</p>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${simulatedProgress}%` }}></div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-white/75">
                  <span>0:00</span>
                  <span>{playingVideo.duration}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button 
                onClick={handleStartPlay}
                className={`px-4 py-2 rounded-full font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                  isPlaying 
                    ? 'bg-amber-600 text-white hover:bg-amber-700' 
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
              >
                {isPlaying ? 'Pause Simulation' : 'Start Simulation'}
              </button>
              <button 
                onClick={handleCloseVideo}
                className="px-4 py-2 bg-surface-container-high rounded-full font-semibold text-xs text-on-surface"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: READING MATERIAL DETAILS ================= */}
      {readingDetail && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant">
              <span className="text-[10px] bg-tertiary-container/15 text-tertiary font-bold px-2.5 py-0.5 rounded-full">
                Document Overview
              </span>
              <button 
                onClick={() => setReadingDetail(null)}
                className="p-1 hover:bg-surface-container-low rounded-full transition-colors text-outline hover:text-on-surface text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">{readingDetail.title}</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed bg-surface-container-low p-4 rounded-xl">
                {readingDetail.details || 'This is a core design document covering advanced industry guidelines, student case studies, and framework checklists.'}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={() => {
                  toggleReadingComplete(readingDetail.id);
                  setReadingDetail(null);
                }}
                className={`px-4 py-2 rounded-full font-semibold text-xs border transition-all ${
                  readingDetail.completed 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-primary text-on-primary border-primary'
                }`}
              >
                {readingDetail.completed ? 'Mark Incomplete' : 'Mark as Read'}
              </button>
              
              <button 
                onClick={() => setReadingDetail(null)}
                className="px-4 py-2 bg-surface-container-high rounded-full font-semibold text-xs text-on-surface"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
