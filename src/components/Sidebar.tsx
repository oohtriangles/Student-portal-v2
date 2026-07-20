import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  BookOpen, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  Settings as SettingsIcon, 
  LogOut,
  Plus
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onNewEntryClick: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onNewEntryClick }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'videos' as ActiveTab, label: 'Videos', icon: Video },
    { id: 'readings' as ActiveTab, label: 'Readings', icon: BookOpen },
    { id: 'tasks' as ActiveTab, label: 'Tasks', icon: CheckSquare },
    { id: 'calendar' as ActiveTab, label: 'Calendar', icon: CalendarIcon },
  ];

  return (
    <aside 
      id="student-sidebar"
      className="fixed left-0 top-0 h-full w-[240px] bg-surface-container-low border-r border-outline-variant flex flex-col py-8 px-4 z-50 transition-all duration-300"
    >
      {/* Brand Header */}
      <div id="sidebar-header" className="mb-8 px-4">
        <h1 className="font-headline-sm text-headline-sm text-primary tracking-tight">Student Portal</h1>
        <p className="text-label-md font-label-md text-outline">Productivity Hub</p>
      </div>

      {/* Navigation Links */}
      <nav id="sidebar-nav" className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 rounded-full px-4 py-2.5 text-left transition-all duration-200 ${
                isActive
                  ? 'bg-secondary-container text-on-surface font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-secondary-container/50 hover:text-on-surface'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-primary' : 'text-outline'} />
              <span className="text-label-md font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div id="sidebar-footer" className="mt-auto space-y-1 border-t border-outline-variant pt-4">
        <button
          id="btn-sidebar-new-entry"
          onClick={onNewEntryClick}
          className="w-full flex items-center justify-center gap-2 py-2.5 mb-4 bg-primary text-on-primary rounded-full text-label-md font-semibold hover:bg-primary-container active:scale-95 transition-all shadow-sm"
        >
          <Plus size={16} />
          <span>New Entry</span>
        </button>

        <button
          id="nav-item-settings"
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 rounded-full px-4 py-2.5 text-left transition-all duration-200 ${
            activeTab === 'settings'
              ? 'bg-secondary-container text-on-surface font-semibold'
              : 'text-on-surface-variant hover:bg-secondary-container/50 hover:text-on-surface'
          }`}
        >
          <SettingsIcon size={18} className="text-outline" />
          <span className="text-label-md font-medium">Settings</span>
        </button>

        <button
          id="nav-item-logout"
          onClick={() => alert('Logged out successfully! (Demo mode)')}
          className="w-full flex items-center gap-3 rounded-full px-4 py-2.5 text-left text-on-surface-variant hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={18} className="text-outline hover:text-red-600" />
          <span className="text-label-md font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
