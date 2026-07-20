import React, { useState } from 'react';
import { 
  initialUserProfile, 
  initialAssignments, 
  initialVideoLectures, 
  initialReadingMaterials, 
  initialTasks, 
  initialStudySessions 
} from './data';
import { ActiveTab, Assignment, VideoLecture, ReadingMaterial, Task, StudySession, UserProfile } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import VideosView from './components/VideosView';
import ReadingsView from './components/ReadingsView';
import TasksView from './components/TasksView';
import CalendarView from './components/CalendarView';
import SettingsView from './components/SettingsView';
import SocialView from './components/SocialView';
import { 
  Award, 
  CheckCircle, 
  Clock, 
  X, 
  BookOpen, 
  Sparkles, 
  Volume2,
  Calendar,
  Layers,
  Cpu,
  Bookmark
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Application Data States (for reactive data flow)
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [videos, setVideos] = useState<VideoLecture[]>(initialVideoLectures);
  const [readings, setReadings] = useState<ReadingMaterial[]>(initialReadingMaterials);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [sessions, setSessions] = useState<StudySession[]>(initialStudySessions);

  // Modal Workspace States
  const [activeAssignmentWorkspace, setActiveAssignmentWorkspace] = useState<Assignment | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});
  const [isGraded, setIsGraded] = useState(false);
  const [earnedGrade, setEarnedGrade] = useState('');

  // Lessons Extra Modals State
  const [showFocusWords, setShowFocusWords] = useState(false);
  const [showWorkshops, setShowWorkshops] = useState(false);

  // Vocabulary Pronunciation simulation
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  // Handlers for App state modifications
  const handleToggleVideoComplete = (id: string) => {
    setVideos(prev => prev.map(vid => vid.id === id ? { ...vid, isCompleted: !vid.isCompleted } : vid));
  };

  const handleToggleReadingComplete = (id: string) => {
    setReadings(prev => prev.map(rm => rm.id === id ? { ...rm, isCompleted: !rm.isCompleted } : rm));
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: `task-${Date.now()}`
    };
    setTasks(prev => [task, ...prev]);
  };

  const handleToggleTaskComplete = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddSession = (newSession: Omit<StudySession, 'id'>) => {
    const session: StudySession = {
      ...newSession,
      id: `session-${Date.now()}`
    };
    setSessions(prev => [...prev, session]);
  };

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  // Select resources from autocomplete search bar
  const handleSelectResourceFromSearch = (type: 'assignment' | 'video' | 'reading', item: any) => {
    if (type === 'assignment') {
      setActiveAssignmentWorkspace(item);
    } else if (type === 'video') {
      setActiveTab('videos');
    } else if (type === 'reading') {
      setActiveTab('readings');
    }
  };

  // Grader logic for Assignment Workspace
  const handleOpenAssignment = (assignment: Assignment) => {
    setActiveAssignmentWorkspace(assignment);
    setIsGraded(false);
    setEarnedGrade('');
    
    // Pre-populate with previous user answers or empty
    const initialAnswers: { [qId: string]: string } = {};
    assignment.questions?.forEach(q => {
      initialAnswers[q.id] = q.userAnswer || '';
    });
    setUserAnswers(initialAnswers);
  };

  const handleAnswerChange = (qId: string, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: value
    }));
  };

  const handleGradeAssignment = () => {
    if (!activeAssignmentWorkspace || !activeAssignmentWorkspace.questions) return;
    
    let correctCount = 0;
    const questions = activeAssignmentWorkspace.questions;
    
    questions.forEach(q => {
      const uAns = userAnswers[q.id]?.trim().toLowerCase();
      const cAns = q.correctAnswer?.trim().toLowerCase();
      if (uAns && cAns && (uAns === cAns || cAns.includes(uAns) || uAns.includes(cAns))) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    let gradeLetter = 'F';
    if (percent >= 90) gradeLetter = 'A';
    else if (percent >= 80) gradeLetter = 'B';
    else if (percent >= 70) gradeLetter = 'C';
    else if (percent >= 60) gradeLetter = 'D';

    setEarnedGrade(`${gradeLetter} (${percent}%)`);
    setIsGraded(true);

    // Save state back to assignments
    setAssignments(prev => prev.map(asg => {
      if (asg.id === activeAssignmentWorkspace.id) {
        return {
          ...asg,
          status: 'completed',
          progress: 100,
          questions: asg.questions?.map(q => ({
            ...q,
            userAnswer: userAnswers[q.id]
          }))
        };
      }
      return asg;
    }));

    // Update user stats
    setUserProfile(prev => {
      const newCompleted = prev.currentCompleted + 1;
      return {
        ...prev,
        currentCompleted: newCompleted,
        progress: Math.min(100, Math.round((newCompleted / prev.weeklyTarget) * 100))
      };
    });
  };

  // Simulating pronunciation of Focus Words
  const speakWord = (word: string) => {
    setPlayingWord(word);
    setTimeout(() => setPlayingWord(null), 1200);
  };

  // Render correct main view based on state
  const renderMainView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView 
            userProfile={userProfile}
            assignments={assignments}
            onSelectAssignment={handleOpenAssignment}
            onSetGoalsClick={() => setActiveTab('settings')}
            onNewTaskClick={() => setActiveTab('tasks')}
            onOpenFocusWords={() => setShowFocusWords(true)}
            onOpenWorkshops={() => setShowWorkshops(true)}
            onNavigateToTab={setActiveTab}
          />
        );
      case 'videos':
        // Pre-class content screen is rendered inside Videos tab as instructed by user
        return <VideosView />;
      case 'readings':
        // Software Download Guide screen is rendered inside Readings tab as instructed by user
        return <ReadingsView />;
      case 'tasks':
        return (
          <TasksView 
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTaskComplete={handleToggleTaskComplete}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'calendar':
        return (
          <CalendarView 
            sessions={sessions}
            onAddSession={handleAddSession}
            onDeleteSession={handleDeleteSession}
          />
        );
      case 'social':
        return (
          <SocialView />
        );
      case 'settings':
        return (
          <SettingsView 
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      default:
        return <div className="text-outline">View not found</div>;
    }
  };

  return (
    <div id="student-portal-app" className="min-h-screen bg-surface-container-lowest text-on-surface">
      {/* Sidebar Layout */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onNewEntryClick={() => {
          if (activeTab === 'tasks') {
            const input = document.querySelector('#tasks-view input');
            if (input) (input as HTMLElement).focus();
          } else if (activeTab === 'calendar') {
            const input = document.querySelector('#calendar-view input');
            if (input) (input as HTMLElement).focus();
          } else {
            setActiveTab('tasks');
          }
        }}
      />

      {/* Main Panel Content container (with left-padding matching sidebar width) */}
      <div id="portal-workspace" className="pl-[240px] flex flex-col min-h-screen">
        <Header 
          userProfile={userProfile}
          assignments={assignments}
          videos={videos}
          readings={readings}
          onSelectResource={handleSelectResourceFromSearch}
        />

        {/* Workspace content wrapper */}
        <main id="portal-main-panel" className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {renderMainView()}
        </main>
      </div>

      {/* ================= INTERACTIVE MODAL: ASSIGNMENT WORKSPACE GRADER ================= */}
      {activeAssignmentWorkspace && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-outline-variant pb-4">
              <div>
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeAssignmentWorkspace.course} Assessment
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-2 font-bold">
                  {activeAssignmentWorkspace.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveAssignmentWorkspace(null)}
                className="p-1 hover:bg-surface-container-low rounded-full transition-colors font-bold text-outline hover:text-on-surface"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-body-md text-on-surface-variant bg-surface-container-low p-4 rounded-xl leading-relaxed">
              {activeAssignmentWorkspace.details}
            </p>

            {/* Questions Form */}
            <div className="space-y-6">
              {activeAssignmentWorkspace.questions?.map((q, idx) => (
                <div key={q.id} id={`workspace-q-${q.id}`} className="space-y-3">
                  <h4 className="font-semibold text-body-lg text-on-surface flex gap-2">
                    <span className="text-primary font-bold">{idx + 1}.</span>
                    <span>{q.text}</span>
                  </h4>

                  {q.type === 'mcq' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4">
                      {q.options?.map((opt) => (
                        <label 
                          key={opt} 
                          className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all hover:bg-surface-container-low ${
                            userAnswers[q.id] === opt 
                              ? 'border-primary bg-primary/5 font-semibold text-primary' 
                              : 'border-outline-variant'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name={`q-ans-${q.id}`}
                            value={opt}
                            checked={userAnswers[q.id] === opt}
                            onChange={() => handleAnswerChange(q.id, opt)}
                            className="text-primary focus:ring-primary accent-primary"
                          />
                          <span className="text-xs">{opt}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      placeholder="Write your thesis statement or complete response here..."
                      rows={3}
                      className="w-full p-4 bg-surface-container-low border border-outline-variant rounded-xl text-body-md placeholder:text-outline focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Grader Output Display */}
            {isGraded && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between animate-slide-up">
                <div className="flex items-center gap-3">
                  <Award className="text-green-700" size={32} />
                  <div>
                    <h5 className="font-bold text-green-800 text-sm">Workspace Grader Result</h5>
                    <p className="text-xs text-green-900 mt-0.5">Your responses have been successfully compiled and graded.</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-green-700 font-semibold block">GRADE EARNED</span>
                  <span className="text-2xl font-bold text-green-800">{earnedGrade}</span>
                </div>
              </div>
            )}

            {/* Actions Ribbon */}
            <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
              <span className="text-xs text-outline font-medium flex items-center gap-1.5">
                <Clock size={12} />
                Due {activeAssignmentWorkspace.dueDate}
              </span>

              <div className="flex gap-2">
                <button 
                  onClick={handleGradeAssignment}
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold text-label-md hover:bg-primary-container transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  Grade & Submit
                </button>
                <button 
                  onClick={() => setActiveAssignmentWorkspace(null)}
                  className="px-5 py-2.5 bg-surface-container-low rounded-full font-semibold text-label-md text-on-surface hover:bg-surface-container-high transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= INTERACTIVE MODAL: ENGLISH FOCUS WORDS ================= */}
      {showFocusWords && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary" size={20} />
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Weekly Vocabulary Words</h3>
              </div>
              <button 
                onClick={() => setShowFocusWords(false)}
                className="p-1 hover:bg-surface-container-low rounded-full transition-colors text-outline"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-on-surface-variant">
                From Cal Newport's **Deep Work** unit. Click the speaker icon next to each keyword to simulate vocal pronunciation.
              </p>

              {/* Focus words mapping */}
              <div className="space-y-3.5">
                {[
                  { word: 'Cognitive Backlog', pos: 'noun', def: 'The residual mental clutter or backlog created by rapidly switching focus between shallow tasks or feeds.' },
                  { word: 'Attention Residue', pos: 'noun', def: 'The cognitive deficit that remains on a previous task when switching to a new one, hindering full performance.' },
                  { word: 'Bimodal Scheduling', pos: 'adjective', def: 'A system of organizing work where you partition deep, uninterrupted focus blocks from shallow operations.' }
                ].map((item) => (
                  <div key={item.word} className="p-4 bg-surface-container-low/40 border border-outline-variant rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-on-surface text-body-lg">{item.word}</span>
                        <span className="text-[10px] text-outline font-serif italic">{item.pos}</span>
                      </div>

                      <button 
                        onClick={() => speakWord(item.word)}
                        className={`p-1.5 rounded-full transition-all ${
                          playingWord === item.word 
                            ? 'bg-primary text-white scale-110' 
                            : 'text-outline hover:text-primary hover:bg-surface-container-high'
                        }`}
                        title="Simulate vocal sound pronunciation"
                      >
                        <Volume2 size={14} className={playingWord === item.word ? 'animate-bounce' : ''} />
                      </button>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.def}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end border-t border-outline-variant pt-4">
              <button 
                onClick={() => setShowFocusWords(false)}
                className="px-5 py-2 bg-primary text-on-primary rounded-full text-xs font-semibold hover:bg-primary-container"
              >
                Close Vocabulary List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= INTERACTIVE MODAL: WORKSHOPS ================= */}
      {showWorkshops && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <Sparkles className="text-tertiary" size={20} />
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Extra-Curricular Workshops</h3>
              </div>
              <button 
                onClick={() => setShowWorkshops(false)}
                className="p-1 hover:bg-surface-container-low rounded-full transition-colors text-outline"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-on-surface-variant">
                Select your interest block to register and lock your seat for the upcoming extra-curricular interactive groups.
              </p>

              <div className="space-y-3.5">
                {[
                  { title: 'AI Prototyping Workshop', date: 'Thur, July 23 • 4:00 PM', seats: '5 seats left', color: 'border-orange-200' },
                  { title: 'Interactive Web Prototyping', date: 'Fri, July 24 • 1:00 PM', seats: 'Full (Waiting list open)', color: 'border-blue-200' },
                  { title: 'Student Success and Focus Skills', date: 'Mon, July 27 • 10:00 AM', seats: '12 seats left', color: 'border-green-200' }
                ].map((wk) => (
                  <div key={wk.title} className={`p-4 border ${wk.color} rounded-xl flex justify-between items-center gap-4`}>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm">{wk.title}</h4>
                      <p className="text-xs text-outline mt-0.5">{wk.date}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Registered successfully for "${wk.title}"!`)}
                      className="px-3.5 py-1.5 bg-surface-container-high border border-outline-variant hover:bg-primary hover:text-on-primary hover:border-primary rounded-full text-[11px] font-bold transition-all shrink-0"
                    >
                      {wk.seats.includes('Full') ? 'Join Waiting List' : 'Register'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end border-t border-outline-variant pt-4">
              <button 
                onClick={() => setShowWorkshops(false)}
                className="px-5 py-2 bg-primary text-on-primary rounded-full text-xs font-semibold hover:bg-primary-container"
              >
                Close Workshops Panel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
