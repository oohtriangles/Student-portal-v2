import React from 'react';
import { Clock, Plus, BookOpen, FlaskConical, Globe, Award, Target, ArrowRight } from 'lucide-react';
import { UserProfile, Assignment } from '../types';

interface DashboardViewProps {
  userProfile: UserProfile;
  assignments: Assignment[];
  onSelectAssignment: (assignment: Assignment) => void;
  onSetGoalsClick: () => void;
  onNewTaskClick: () => void;
  onOpenFocusWords: () => void;
  onOpenWorkshops: () => void;
  onNavigateToTab: (tab: 'videos' | 'readings' | 'tasks' | 'calendar') => void;
}

export default function DashboardView({
  userProfile,
  assignments,
  onSelectAssignment,
  onSetGoalsClick,
  onNewTaskClick,
  onOpenFocusWords,
  onOpenWorkshops,
  onNavigateToTab
}: DashboardViewProps) {
  // Map icons to Lucide components
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'atm':
        return <BookOpen size={24} className="text-primary" />;
      case 'science':
        return <FlaskConical size={24} className="text-tertiary" />;
      case 'public':
        return <Globe size={24} className="text-primary" />;
      default:
        return <Award size={24} className="text-primary" />;
    }
  };

  return (
    <div id="dashboard-view" className="space-y-8 animate-fade-in">
      {/* Profile Banner */}
      <section id="profile-banner-section">
        <div className="relative overflow-hidden bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex items-center justify-between group">
          <div className="z-10 max-w-md">
            <h2 className="font-headline-md text-headline-md text-primary mb-2">Your Profile</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
              <span className="font-bold">Hi {userProfile.name}</span>, You have completed{' '}
              <span className="text-primary font-bold">{userProfile.progress}%</span> of your weekly targets.
              Keep learning with us like this.
            </p>
            <button
              id="btn-set-goals"
              onClick={onSetGoalsClick}
              className="px-6 py-2.5 bg-[#FFBF00] text-on-tertiary-fixed rounded-full font-headline-sm text-headline-sm hover:brightness-105 transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Target size={18} />
              <span>Set Goals</span>
            </button>
          </div>
          <div className="hidden md:block w-1/3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLSCDCbuljs9BGNGfozzJH8LUZmVDnJ8d6S9M-GcYz_0QePlqiQ6Giwpde5YGg75iVpSY6qBcgZKvFWv_cz47t-TFrO08-dshgcgE_GKfPX1WC92GnGWaD0_u5u6TGC63DsyahzCoXbMkPNprirhQXm1Sc5vMIyxyp83DN2NW3JI-QZbXqt_98edVOMssnFTWu2OsPbpnO1wH8RVlAqREazm1LF1Puxi-csUqTQ2vbOwKdp56iGGHWNvVQra3mx8Tt7IlmvSsUQy2m"
              alt="Kate studying with laptop illustration"
              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Your Assignments Section */}
      <section id="assignments-section" className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-headline-md text-headline-md text-on-surface">Your Assignments</h3>
          <button
            onClick={() => onNavigateToTab('tasks')}
            className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View More</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              id={`assignment-card-${assignment.id}`}
              onClick={() => onSelectAssignment(assignment)}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              {/* Icon container */}
              <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-4">
                {renderIcon(assignment.iconName)}
              </div>

              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1 block truncate w-full">
                {assignment.title}
              </h4>
              <p className="text-on-surface-variant font-body-md text-body-md mb-6 block truncate w-full">
                {assignment.type}
              </p>

              {/* Progress or tag indicator */}
              <div className="w-full mt-auto">
                {assignment.status === 'new' ? (
                  <div className="flex justify-between items-center w-full">
                    <span className="px-3 py-1 bg-[#76b900] text-white rounded text-[10px] font-bold uppercase tracking-wider">
                      New
                    </span>
                    <div className="flex items-center gap-1 text-outline font-label-md text-label-md">
                      <Clock size={12} />
                      <span>{assignment.dueDate}</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-outline">Progress</span>
                      <span className="text-primary font-bold text-xs">{assignment.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${assignment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lessons For You Section */}
      <section id="lessons-for-you-section" className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-headline-md text-headline-md text-on-surface">Lessons for you</h3>
          <button
            onClick={() => onNavigateToTab('readings')}
            className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View More</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Focus Words Card */}
          <div
            id="focus-words-card"
            onClick={onOpenFocusWords}
            className="bg-[#FFC107] rounded-xl p-6 flex items-center justify-between text-white group cursor-pointer hover:brightness-105 transition-all shadow-sm"
          >
            <div>
              <h4 className="font-headline-md text-headline-md mb-1 text-on-tertiary-fixed">Focus Words</h4>
              <p className="text-on-tertiary-fixed/80 font-body-lg text-body-lg">English</p>
            </div>
            <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center p-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ2UCq0EKxy-G5WKXiX8c7IthUFh0cngAQvaKoMl7A1VvjqSaOBrOWfv2_TbR8OOXbK_vwzrdtrjySEAShHfnNQz8vHc_friG2DRy6Oehv8lgb6jFm5x8o5lzaiP5TGvbAieXLUS4HUO3NkaQFXHjSjDopsjBJyHAaw7IoaQ48lVPUbTnM4qPAX2q0pTBdjjrsGRKIjsjNQMm6tssDBAIs7sfxCyOkPFQMJqNMcLr59OJr84cwBN3GnKTNEaOjYHtapy39cA4mv3tn"
                alt="Stylized book vector art"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Workshops Card */}
          <div
            id="workshops-card"
            onClick={onOpenWorkshops}
            className="bg-[#FF5C5C] rounded-xl p-6 flex items-center justify-between text-white group cursor-pointer hover:brightness-105 transition-all shadow-sm"
          >
            <div>
              <h4 className="font-headline-md text-headline-md mb-1">Workshops</h4>
              <p className="text-white/80 font-body-lg text-body-lg">Extra-Curricular</p>
            </div>
            <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg_a46UHdTQWzHCfiHZdmTaKQgiHioa2ieO7suYEp6k0DW11usjB_2ocVsgxVZfV8Csrt5vOnmu1Cpkd2Aqr2n66TIImtETVn6Z6vk8ipxIcm5bcvuJ69Hi2cJf92q_Y2YT519ekQYjk7K4IOn5NZRs5Awe_pF52n6KeFifOzla0ftOr8ams5xXbZ6wsTGn6B7sNz6Bchvl9qLQoBwbL5TkhmW__aYcU9Eri0Vd2zd1C3pShvWBKl_O1CJ57ifd7d2kAlXFr1MYCG1"
                alt="Collaborative learning illustration with diverse group of students"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button (New Task) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          id="btn-fab-new-task"
          onClick={onNewTaskClick}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={20} />
          <span className="font-headline-sm text-headline-sm">New Task</span>
        </button>
      </div>
    </div>
  );
}
