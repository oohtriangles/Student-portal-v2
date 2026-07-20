import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, HelpCircle, Settings, BookOpen, Video, FileText } from 'lucide-react';
import { UserProfile, Assignment, VideoLecture, ReadingMaterial } from '../types';

interface HeaderProps {
  userProfile: UserProfile;
  assignments: Assignment[];
  videos: VideoLecture[];
  readings: ReadingMaterial[];
  onSelectResource: (type: 'assignment' | 'video' | 'reading', item: any) => void;
}

export default function Header({ 
  userProfile, 
  assignments, 
  videos, 
  readings,
  onSelectResource 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search filter
  const filteredAssignments = searchQuery.trim()
    ? assignments.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredVideos = searchQuery.trim()
    ? videos.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredReadings = searchQuery.trim()
    ? readings.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const hasResults = filteredAssignments.length > 0 || filteredVideos.length > 0 || filteredReadings.length > 0;

  return (
    <header 
      id="portal-header"
      className="w-full h-16 sticky top-0 bg-surface border-b border-outline-variant flex justify-between items-center px-6 z-40"
    >
      {/* Search Bar Container */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <div className="relative w-64 md:w-80">
          <span className="absolute inset-y-0 left-3 flex items-center text-outline">
            <Search size={16} />
          </span>
          <input
            id="global-search-input"
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded-full text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>

        {/* Global Search Autocomplete Dropdown */}
        {showDropdown && searchQuery.trim() && (
          <div className="absolute top-12 left-0 w-80 md:w-96 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg p-3 z-50 max-h-96 overflow-y-auto">
            <h4 className="text-label-sm font-semibold text-outline px-2 py-1 uppercase tracking-wider mb-2">Search Results</h4>
            
            {!hasResults ? (
              <p className="text-body-md text-on-surface-variant px-2 py-3 text-center">No resources found for "{searchQuery}"</p>
            ) : (
              <div className="space-y-3">
                {/* Assignments */}
                {filteredAssignments.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-primary/70 px-2 uppercase tracking-wide mb-1">Assignments</h5>
                    {filteredAssignments.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectResource('assignment', item);
                          setSearchQuery('');
                          setShowDropdown(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-2 py-1.5 hover:bg-surface-container-low rounded-lg transition-colors text-body-md"
                      >
                        <FileText size={14} className="text-primary" />
                        <div>
                          <span className="font-medium text-on-surface block truncate">{item.title}</span>
                          <span className="text-[10px] text-outline">{item.course} • {item.type}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Videos */}
                {filteredVideos.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-tertiary px-2 uppercase tracking-wide mb-1">Video Lectures</h5>
                    {filteredVideos.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectResource('video', item);
                          setSearchQuery('');
                          setShowDropdown(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-2 py-1.5 hover:bg-surface-container-low rounded-lg transition-colors text-body-md"
                      >
                        <Video size={14} className="text-tertiary" />
                        <div>
                          <span className="font-medium text-on-surface block truncate">{item.title}</span>
                          <span className="text-[10px] text-outline">{item.category} • {item.duration}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Readings */}
                {filteredReadings.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-green-600 px-2 uppercase tracking-wide mb-1">Readings</h5>
                    {filteredReadings.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectResource('reading', item);
                          setSearchQuery('');
                          setShowDropdown(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-2 py-1.5 hover:bg-surface-container-low rounded-lg transition-colors text-body-md"
                      >
                        <BookOpen size={14} className="text-green-600" />
                        <div>
                          <span className="font-medium text-on-surface block truncate">{item.title}</span>
                          <span className="text-[10px] text-outline">{item.category} • {item.readTime}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Student Controls */}
      <div id="header-student-controls" className="flex items-center gap-4">
        {/* Profile Card */}
        <div className="flex flex-col items-end">
          <span className="font-label-md text-on-surface font-semibold">{userProfile.name}</span>
          <span className="text-[10px] text-outline font-medium">{userProfile.email}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5">
          <button 
            id="btn-header-notif"
            className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative"
            onClick={() => alert('No new notifications')}
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            id="btn-header-help"
            className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
            onClick={() => alert('Need help? Student support is available at support@studentportal.edu')}
          >
            <HelpCircle size={18} />
          </button>
        </div>

        {/* Avatar image */}
        <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
          <img 
            src={userProfile.avatarUrl} 
            alt={userProfile.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
