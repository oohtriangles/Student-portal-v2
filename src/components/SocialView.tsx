import React, { useState } from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { MessageSquare, Users, BookOpen, Sparkles, Flame, HelpCircle } from 'lucide-react';

interface Thread {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<any>;
  url: string;
}

export default function SocialView() {
  const threads: Thread[] = [
    {
      id: 'user-feedback',
      title: 'User feedback',
      category: 'Main Community Hub',
      description: 'Your feedback, ideas, and bug reports help us continuously improve the student experience.',
      icon: MessageSquare,
      url: 'https://oohtriangles-student-portal.disqus.com/user-feedback',
    },
  ];

  const [activeThread, setActiveThread] = useState<Thread>(threads[0]);

  const disqusConfig = {
    url: activeThread.url,
    identifier: activeThread.id,
    title: activeThread.title,
    language: 'en', // Set to English
  };

  return (
    <div id="social-view-screen" className="space-y-8 animate-fade-in relative max-w-5xl mx-auto">
      {/* Header Banner */}
      <section id="social-header" className="bg-surface-container-low border border-outline-variant rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
          <MessageSquare size={14} className="text-primary" />
          <span>Student Forum</span>
        </div>
        
        <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface font-bold tracking-tight mb-3">
          Social Discussion Hub
        </h1>
        
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Welcome to the Student Forum! Ask questions, build study alliances, swap design insights, or simply share what you’re working on.
        </p>
      </section>

      {/* Main Forum Split Grid: Emphasizing the Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Topic list (Secondary channels list) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Discussion Channels</h2>
          </div>
          <div className="space-y-3">
            {threads.map((thread) => {
              const Icon = thread.icon;
              const isActive = thread.id === activeThread.id;
              const isMain = thread.id === 'user-feedback';
              
              return (
                <div
                  key={thread.id}
                  id={`thread-select-${thread.id}`}
                  onClick={() => setActiveThread(thread)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-white border-primary shadow-sm ring-1 ring-primary/25' 
                      : 'bg-surface-container-low border-outline-variant hover:bg-white hover:border-outline'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-primary/10 text-primary' : 'bg-surface-container text-outline'}`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[9px] uppercase font-bold tracking-wider ${isMain ? 'text-primary' : 'text-outline'}`}>
                          {thread.category} {isMain && '• PRIMARY'}
                        </span>
                        
                        {/* Interactive Comment Count */}
                        <span className="text-[10px] font-semibold text-primary font-mono shrink-0">
                          <CommentCount
                            shortname="oohtriangles"
                            config={{
                              url: thread.url,
                              identifier: thread.id,
                              title: thread.title,
                            }}
                          >
                            Comments
                          </CommentCount>
                        </span>
                      </div>
                      <h3 className={`font-semibold text-sm mt-1 truncate ${isActive ? 'text-primary font-bold' : 'text-on-surface'}`}>
                        {thread.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed line-clamp-2">
                        {thread.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick FAQ / Tips Box */}
          <div className="p-4 bg-surface-container-low border border-outline-variant rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <HelpCircle size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Forum Guidelines</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Maintain a supportive attitude, respect other viewpoints, and keep code comments snippets clean. Have fun!
            </p>
          </div>
        </div>

        {/* Right Side: Disqus Embed (The prominent active/main forum area) */}
        <div className="lg:col-span-8 bg-white border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="border-b border-outline-variant pb-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {activeThread.id === 'user-feedback' ? '⭐ MAIN BOARD' : 'SUB-FORUM CHANNEL'}
              </span>
              <span className="text-xs text-outline font-medium flex items-center gap-1">
                <Flame size={12} className="text-amber-500 animate-pulse" />
                Live Hub
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-2">
              {activeThread.title}
            </h2>
            <p className="text-body-md text-on-surface-variant mt-1">
              {activeThread.description}
            </p>
          </div>

          <div className="social-disqus-wrapper min-h-[420px]">
            {/* Discussions Embed widget with language set to english */}
            <DiscussionEmbed
              shortname="oohtriangles"
              config={disqusConfig}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

