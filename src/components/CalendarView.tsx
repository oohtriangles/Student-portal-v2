import React, { useState } from 'react';
import { StudySession } from '../types';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, Tag, BookOpen, AlertCircle } from 'lucide-react';

interface CalendarViewProps {
  sessions: StudySession[];
  onAddSession: (session: Omit<StudySession, 'id'>) => void;
  onDeleteSession: (id: string) => void;
}

export default function CalendarView({ sessions, onAddSession, onDeleteSession }: CalendarViewProps) {
  // We'll set July 2026 as the active month
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 6 is July (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number>(19); // Default to 19th July 2026
  
  // Schedule Form State
  const [newTitle, setNewTitle] = useState('');
  const [newStartTime, setNewStartTime] = useState('09:00');
  const [newEndTime, setNewEndTime] = useState('11:00');
  const [newCategory, setNewCategory] = useState('Mathematics');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in July 2026 (31 days, starts on Wednesday = 3)
  const daysInMonth = 31;
  const startDayOfWeek = 3; // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const formattedSelectedDate = `${currentYear}-07-${selectedDay.toString().padStart(2, '0')}`;

  const selectedDaySessions = sessions.filter(
    (session) => session.date === formattedSelectedDate
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddSession({
      title: newTitle.trim(),
      date: formattedSelectedDate,
      startTime: newStartTime,
      endTime: newEndTime,
      category: newCategory,
    });

    setNewTitle('');
    alert(`Study session "${newTitle}" successfully scheduled!`);
  };

  // Helper to check if a day has any sessions
  const getDaySessions = (day: number) => {
    const dateStr = `${currentYear}-07-${day.toString().padStart(2, '0')}`;
    return sessions.filter((session) => session.date === dateStr);
  };

  // Create empty grids for pre-start of month
  const blanks = Array(startDayOfWeek).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const gridCells = [...blanks, ...days];

  return (
    <div id="calendar-view" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      {/* Calendar Grid Section (Left 2 columns) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
            <div className="flex items-center gap-2">
              <CalendarIcon size={20} className="text-primary" />
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {monthNames[currentMonth]} {currentYear}
              </h2>
            </div>
            <span className="text-xs text-outline font-semibold">Academic Study Calendar</span>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center py-4 border-b border-outline-variant/60">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-xs font-bold text-outline uppercase tracking-wider">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2 pt-4">
            {gridCells.map((cell, idx) => {
              if (cell === null) {
                return <div key={`blank-${idx}`} className="aspect-square"></div>;
              }

              const isSelected = selectedDay === cell;
              const daySessions = getDaySessions(cell);
              const hasSessions = daySessions.length > 0;

              return (
                <button
                  key={`day-${cell}`}
                  onClick={() => handleDayClick(cell)}
                  className={`aspect-square rounded-xl flex flex-col justify-between p-2 border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-primary border-primary text-on-primary shadow-sm scale-105 z-10'
                      : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container-low hover:border-outline'
                  }`}
                >
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                    {cell}
                  </span>

                  {/* Indicators for sessions */}
                  {hasSessions && (
                    <div className="flex justify-center gap-1 w-full mt-auto">
                      {daySessions.slice(0, 3).map((session, sIdx) => (
                        <span
                          key={sIdx}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected
                              ? 'bg-white'
                              : session.category === 'Mathematics'
                              ? 'bg-orange-500'
                              : session.category === 'English'
                              ? 'bg-blue-500'
                              : session.category === 'History'
                              ? 'bg-indigo-500'
                              : 'bg-green-500'
                          }`}
                        ></span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day's Schedule List */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Schedule for July {selectedDay}, {currentYear}
            </h3>
            <span className="text-xs bg-surface-container-low border border-outline-variant text-on-surface-variant px-3 py-1 rounded-full font-semibold">
              {selectedDaySessions.length} sessions
            </span>
          </div>

          {selectedDaySessions.length === 0 ? (
            <div className="py-6 flex flex-col items-center justify-center text-center text-outline gap-2">
              <AlertCircle size={24} className="opacity-50" />
              <p className="text-body-md font-medium">No study sessions scheduled for today.</p>
              <p className="text-xs text-outline max-w-sm">Use the planning form on the right to block study sessions!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDaySessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 bg-surface-container-low/40 border border-outline-variant rounded-xl flex items-center justify-between gap-4 hover:border-outline transition-all"
                >
                  <div className="flex items-center gap-3">
                    {/* Color bar */}
                    <div
                      className={`w-1.5 h-12 rounded-full ${
                        session.category === 'Mathematics' ? 'bg-orange-500' :
                        session.category === 'English' ? 'bg-blue-500' :
                        session.category === 'History' ? 'bg-indigo-500' :
                        'bg-green-500'
                      }`}
                    ></div>

                    <div className="space-y-1">
                      <h4 className="font-semibold text-body-lg text-on-surface">{session.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          session.category === 'Mathematics' ? 'bg-orange-100 text-orange-800' :
                          session.category === 'History' ? 'bg-indigo-100 text-indigo-800' :
                          session.category === 'English' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {session.category}
                        </span>

                        <span className="flex items-center gap-1 text-outline font-medium">
                          <Clock size={11} />
                          {session.startTime} - {session.endTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteSession(session.id)}
                    className="p-2 hover:bg-red-50 hover:text-red-600 text-outline rounded-full transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Schedule Form Sidebar (Right Column) */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4 shadow-sm h-fit">
        <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          <span>Plan Study Session</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-label-md font-semibold text-on-surface-variant block">Session Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="E.g., Review Math Induction proofs"
              className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-label-md font-semibold text-on-surface-variant block">Subject / Course</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="History">Medieval History</option>
              <option value="English">English</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Extra-Curricular">Extracurricular</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-label-md font-semibold text-on-surface-variant block">Start Time</label>
              <input
                type="time"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-label-md font-semibold text-on-surface-variant block">End Time</label>
              <input
                type="time"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#FFBF00] text-on-tertiary-fixed rounded-full font-semibold text-label-md hover:brightness-105 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            <span>Block Calendar Time</span>
          </button>
        </form>
      </div>
    </div>
  );
}
