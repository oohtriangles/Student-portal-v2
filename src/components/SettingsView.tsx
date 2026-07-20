import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Settings, Save, Sparkles, Sliders, User, Mail, ShieldAlert } from 'lucide-react';

interface SettingsViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function SettingsView({ userProfile, onUpdateProfile }: SettingsViewProps) {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [weeklyTarget, setWeeklyTarget] = useState(userProfile.weeklyTarget);
  const [currentCompleted, setCurrentCompleted] = useState(userProfile.currentCompleted);
  const [progress, setProgress] = useState(userProfile.progress);
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onUpdateProfile({
      name,
      email,
      weeklyTarget,
      currentCompleted,
      progress,
      avatarUrl,
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div id="settings-view" className="max-w-2xl mx-auto bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 space-y-6 animate-fade-in shadow-sm">
      <div className="flex items-center gap-3 pb-4 border-b border-outline-variant">
        <Settings size={22} className="text-primary" />
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Settings & Profile</h2>
          <p className="text-xs text-outline font-medium mt-0.5">Customize your student workspace & targets</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Details Block */}
        <div className="space-y-4">
          <h3 className="text-label-sm font-bold text-outline uppercase tracking-wider flex items-center gap-1.5">
            <User size={14} />
            <span>Student Identity</span>
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-surface-container-low/40 border border-outline-variant rounded-xl">
            {/* Avatar Selector and Preview */}
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/25 relative shrink-0">
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 space-y-1.5 w-full">
              <label className="text-label-md font-semibold text-on-surface-variant block">Avatar URL</label>
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Paste avatar image link..."
                className="w-full px-4 py-1.5 bg-surface-container-low border border-outline-variant rounded-full text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-label-md font-semibold text-on-surface-variant block">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-label-md font-semibold text-on-surface-variant block">Student Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Productivity Targets Block */}
        <div className="space-y-4 border-t border-outline-variant/60 pt-6">
          <h3 className="text-label-sm font-bold text-outline uppercase tracking-wider flex items-center gap-1.5">
            <Sliders size={14} />
            <span>Productivity Targets</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-label-md font-semibold text-on-surface-variant block">Weekly Goal (Assignments)</label>
              <input
                type="number"
                value={weeklyTarget}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setWeeklyTarget(val);
                  setProgress(Math.round((currentCompleted / val) * 100));
                }}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-label-md font-semibold text-on-surface-variant block">Completed This Week</label>
              <input
                type="number"
                value={currentCompleted}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setCurrentCompleted(val);
                  setProgress(Math.round((val / weeklyTarget) * 100));
                }}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-label-md font-semibold text-on-surface-variant block">Target Progress Percentage</label>
              <input
                type="text"
                disabled
                value={`${progress}%`}
                className="w-full px-4 py-2 bg-surface-container-low/50 border border-outline-variant rounded-full text-body-md text-outline font-semibold select-none"
              />
            </div>
          </div>
        </div>

        {/* Platform Info Block */}
        <div className="p-4 bg-yellow-50/50 border border-yellow-200 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-yellow-800 font-bold text-xs uppercase tracking-wide">
            <ShieldAlert size={14} />
            <span>Workspace Sync</span>
          </div>
          <p className="text-xs text-yellow-900 leading-relaxed">
            Your preferences, notes, scheduled study times, and complete states are stored locally inside your browser's persistent key-value store to ensure fluid offline usability.
          </p>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end pt-4 border-t border-outline-variant/60">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold text-label-md hover:bg-primary-container active:scale-95 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Save size={16} />
            <span>{isSaved ? 'Workspace Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
