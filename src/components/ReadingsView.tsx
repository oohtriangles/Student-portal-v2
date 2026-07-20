import React, { useState } from 'react';
import { 
  Verified, 
  ArrowRight, 
  CheckCircle, 
  CheckCircle2,
  Circle, 
  Key, 
  Download, 
  ExternalLink, 
  Terminal, 
  Search, 
  Check, 
  Cpu, 
  Layers, 
  Github, 
  CloudRain, 
  HelpCircle,
  PlayCircle
} from 'lucide-react';

interface SetupStep {
  id: string;
  num: number;
  title: string;
  description: string;
  imageUrl: string;
  isCompleted: boolean;
  actionLabel: string;
  bullets: { label: string; text: string; icon: string }[];
  simulationText?: string;
  simulatedSuccessMessage?: string;
}

export default function ReadingsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [steps, setSteps] = useState<SetupStep[]>([
    {
      id: 'step-1',
      num: 1,
      title: 'Google AI Studio',
      description: 'A web-based prototyping environment for generative AI models. No local installation is required, making it the most accessible tool in your kit.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLH-u1ssX-5bhq_nk1SLR6XAf4F8P3C9yNs1jSusUwlcaTty-4J_Wzk86oGg7kmsjkIaCAlURcNyGGDn-9_BUPB983Ai3l8AzFDLHC-BmMAI-jf7SCDCd_2kCa7gWQli7muTh70s30a249Az8oALJ-su1aMS7STPKQKc1RvQZrVWcDEhZDy485XXvaz7FHd-ao2pXYb4bXag0kj5otfuXZkwAjBjjopC6-emkfRZnrz_u9Ijl_pT9F9OdV6whdshzQhUtidc0xJ-WP',
      isCompleted: false,
      actionLabel: 'Launch Studio',
      bullets: [
        { label: 'Access the Portal', text: 'Navigate to aistudio.google.com and sign in with your Google Workspace account.', icon: 'login' },
        { label: 'Generate API Key', text: 'Click on "Get API key" in the sidebar to create credentials for local development integration.', icon: 'key' }
      ],
      simulationText: 'Click the button below to simulate generating an AI Studio API Key.',
      simulatedSuccessMessage: 'Generated API Key: AI_STUDIO_KEY_47b6x99_SUCCESS'
    },
    {
      id: 'step-2',
      num: 2,
      title: 'Stitch',
      description: 'Our integrated data orchestration layer. Stitch allows you to connect your data sources to your destination with zero maintenance.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRnFW1nAXRE6WMct-h-G6Sz4c2k0h48wR18cT7SgkKYCYl-mEJN3q75188LA51w8hFVuozSg2U2rVfVSS8P-RzDp0S3w6TdfAuJxQpsvWqMrLusUvtvF_ihDjQ2Yz1EFZSVMF102SQvQjvgceIkJ6W-gvP4pyw0DJu-QK9kt75Mzkp16riJ43EHPZmioFKixJdewNbeIBtqhZ2HcOQp4aRHWYDIv2dCo7a9rso5RJX29htIL3z0-dtoGGkVD99pU3ox3hfCLNzuu23',
      isCompleted: false,
      actionLabel: 'Open Stitch',
      bullets: [
        { label: 'Platform Access', text: 'Log in directly via the DevStudio main dashboard navigation.', icon: 'hub' },
        { label: 'Source Selection', text: 'Choose your primary database or SaaS application from the 150+ available connectors.', icon: 'settings_input_component' }
      ],
      simulationText: 'Click below to run a connection health check test on the Stitch connector.',
      simulatedSuccessMessage: 'Stitch Connector: All 150+ data sync endpoints online and fully optimized!'
    },
    {
      id: 'step-3',
      num: 3,
      title: 'GitHub Desktop',
      description: 'A simple and visual way to manage your Git workflow without the complexity of the command line.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW69cpFRu-8UotLXTydwlDfBHCeVpPf_xb-Xok-RMWYzhf8QfBogdgedJseHvA9f2X_iDb2q5akiu9PQBhvwAfL5KK4d5QFGzKIZ0T3KCOpxuDThkLux8FQzmSHFlSOcP_046fBRBySvL_xJhP-6ircq-t6lB6Ik4BZhe01v0tDHyY66tjUwmSLCaUW_vG9a1IkBI7kBHEJFSAHCq_4eUBX7153YfK1glOckxN0iXKjq-WA-m54k6E6Y2RIF8bWAuJePb25Grkt6o7',
      isCompleted: false,
      actionLabel: 'Download for Desktop',
      bullets: [
        { label: 'Download Installer', text: 'Visit desktop.github.com and download the installer for your OS.', icon: 'download' },
        { label: 'Clone Repository', text: 'Once installed, sign in to GitHub and select "Clone a Repository" to bring your code local.', icon: 'sync_alt' }
      ],
      simulationText: 'Click below to simulate cloning a template project repository into GitHub Desktop.',
      simulatedSuccessMessage: 'GitHub Desktop: Successfully cloned template "student-portal-hub-v3"!'
    },
    {
      id: 'step-4',
      num: 4,
      title: 'Cloudflare',
      description: 'Security, performance, and reliability for your web properties and development tunnels.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3CrYYsZXCdSyLsUjWIp8J273k_jGSqRmQXkuDs9bZEzaUsK2M3meSytl1OCDILLnYwTBQr9tEcg_hgJ3Ydq0wvvkn-E_b1ZgUhQf1FBCf3xRX_OlM_v99BNgmb-_G9pTuQKFHGCcN28E8wXajt5MjvOqmdZrACTIbm05ASF6LOAGlqF-_cRxEYLHebpVQySUt0tCUXVL6NXRlIDY3e594lJNcgIKNkKLkOK15G8v2hptuRkcWk1kwxdwRWUPpOxP6cGQQtrOeey_7',
      isCompleted: false,
      actionLabel: 'Setup Account',
      bullets: [
        { label: 'Account Setup', text: 'Create a free account to access DNS, Workers, and Pages.', icon: 'person_add' },
        { label: 'Configure Tunnel', text: 'Use Cloudflare Zero Trust to safely expose your local dev server to the web.', icon: 'security' }
      ],
      simulationText: 'Click below to simulate opening a secure Zero Trust tunnel for testing.',
      simulatedSuccessMessage: 'Cloudflare Tunnel: Secure link online at student-portal-preview.cloudflare.com!'
    }
  ]);

  // Active Interactive Simulator State
  const [simulatedStep, setSimulatedStep] = useState<SetupStep | null>(null);
  const [simulationOutput, setSimulationOutput] = useState('');
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);

  const toggleStepComplete = (id: string) => {
    setSteps(prev => prev.map(step => step.id === id ? { ...step, isCompleted: !step.isCompleted } : step));
  };

  const handleStartSimulation = (step: SetupStep) => {
    setSimulatedStep(step);
    setIsRunningSimulation(true);
    setSimulationOutput('Connecting to virtual daemon server...');

    setTimeout(() => {
      setSimulationOutput(prev => prev + '\nLoading modules and secure protocols...');
      setTimeout(() => {
        setSimulationOutput(step.simulatedSuccessMessage || 'Success!');
        setIsRunningSimulation(false);
        // Automatically check off step
        toggleStepComplete(step.id);
      }, 1000);
    }, 1000);
  };

  // Dynamic values
  const completedCount = steps.filter(s => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  // Search filter
  const filteredSteps = steps.filter(step => 
    step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="software-download-guide" className="space-y-8 animate-fade-in relative max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <section id="guide-header" className="bg-surface-container-low border border-outline-variant rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
          <Verified size={14} className="text-primary" />
          <span>Essentials Guide</span>
        </div>
        
        <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface font-bold tracking-tight mb-3">
          The Four Musketeers UIUX Setup
        </h1>
        
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Welcome to the foundational toolset for modern development. This guide provides a direct, step-by-step path to configuring your core environment with precision, feedback control, and efficiency.
        </p>

        {/* Global Progress Indicator */}
        <div className="mt-6 pt-6 border-t border-outline-variant/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-label-md font-bold text-on-surface">Setup Progress:</span>
            <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">
              {completedCount} of {steps.length} Steps Configured
            </span>
          </div>

          <div className="w-full sm:w-64 space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-outline">
              <span>Overall Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 bg-surface rounded-full overflow-hidden border border-outline-variant/60">
              <div 
                className="h-full bg-primary transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Step Filters & Toolbar */}
      <div id="guide-toolbar" className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-container-lowest border border-outline-variant p-4 rounded-xl">
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-3 flex items-center text-outline">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search setup steps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary"
          />
        </div>

        <div className="text-xs text-outline font-semibold">
          Showing {filteredSteps.length} of {steps.length} tools
        </div>
      </div>

      {/* Grid Layout for Step Cards */}
      <div id="steps-container" className="space-y-6">
        {filteredSteps.map((step, index) => (
          <div 
            key={step.id}
            id={`step-card-${step.id}`}
            className="step-card bg-surface-container-low p-6 md:p-8 rounded-xl border border-transparent hover:border-outline-variant hover:bg-white transition-all duration-300 relative group shadow-sm"
          >
            {/* Step Complete Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
              <button 
                onClick={() => toggleStepComplete(step.id)}
                className={`p-1.5 rounded-full transition-colors ${
                  step.isCompleted 
                    ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                    : 'text-outline hover:text-primary hover:bg-surface-container'
                }`}
                title={step.isCompleted ? 'Mark step as incomplete' : 'Mark step as complete'}
              >
                {step.isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </button>
            </div>

            <div className={`flex flex-col md:flex-row gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Content Block */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-headline-sm transition-all duration-300 ${
                    step.isCompleted 
                      ? 'bg-green-600 border-green-600 text-white shadow-sm' 
                      : 'border-primary text-primary bg-white'
                  }`}>
                    {step.num}
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>

                {/* Sub-Bullets Details */}
                <div className="space-y-4 pt-2">
                  {step.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 shrink-0">
                        <Check size={12} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-on-surface text-sm">{bullet.label}</p>
                        <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{bullet.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Playground Trigger Button */}
                <div className="pt-4 flex flex-wrap gap-3">
                  <button 
                    onClick={() => handleStartSimulation(step)}
                    className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2 rounded-full text-xs font-semibold hover:bg-primary-container transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    <span>{step.actionLabel}</span>
                    <ArrowRight size={14} />
                  </button>

                  <button 
                    onClick={() => {
                      setSimulatedStep(step);
                      setSimulationOutput('Preparing manual checklist view...\nNo cloud connection needed.');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-outline-variant rounded-full text-xs font-semibold text-on-surface hover:bg-surface-container-high transition-all cursor-pointer"
                  >
                    <span>Manual Guide</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>

              {/* Image Illustration Frame */}
              <div className="w-full md:w-72 shrink-0 aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-highest border border-outline-variant relative shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                <img 
                  className="w-full h-full object-cover" 
                  src={step.imageUrl} 
                  alt={`${step.title} Workspace Setup Illustration`}
                />
                {step.isCompleted && (
                  <div className="absolute inset-0 bg-green-900/10 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      Configured
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL: INTERACTIVE SETUP PLAYGROUND SIMULATOR ================= */}
      {simulatedStep && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Terminal size={18} />
                <span className="text-xs uppercase tracking-wider font-mono">DevStudio Sandbox Simulator</span>
              </div>
              <button 
                onClick={() => setSimulatedStep(null)}
                className="p-1 hover:bg-surface-container-low rounded-full transition-colors text-outline hover:text-on-surface font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                {simulatedStep.title} Configuration Playground
              </h3>
              <p className="text-xs text-outline">{simulatedStep.simulationText}</p>
            </div>

            {/* Virtual Console Box */}
            <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs space-y-2 h-44 overflow-y-auto border border-slate-800 shadow-inner">
              <p className="text-slate-500">// Simulating virtual sandbox setup environment...</p>
              <pre className="whitespace-pre-line leading-relaxed">{simulationOutput}</pre>
              {isRunningSimulation && (
                <div className="flex items-center gap-2 text-primary text-[11px] font-bold mt-2">
                  <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                  <span>Executing configuration scripts...</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="text-[11px] text-outline font-medium">
                {simulatedStep.isCompleted ? '✓ Setup validated successfully' : 'Status: Configuration required'}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleStartSimulation(simulatedStep)}
                  disabled={isRunningSimulation}
                  className="px-4 py-2 bg-primary text-on-primary rounded-full font-semibold text-xs hover:bg-primary-container disabled:opacity-50 transition-colors cursor-pointer"
                >
                  Run Setup Test
                </button>
                <button 
                  onClick={() => setSimulatedStep(null)}
                  className="px-4 py-2 bg-surface-container-high rounded-full font-semibold text-xs text-on-surface hover:bg-surface-container-highest transition-colors"
                >
                  Close Playground
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Bottom Support Alert */}
      <footer id="guide-footer" className="p-4 bg-yellow-50/50 border border-yellow-200 rounded-xl flex items-start gap-3">
        <HelpCircle className="text-yellow-800 mt-0.5 shrink-0" size={16} />
        <div>
          <p className="font-bold text-yellow-800 text-xs uppercase tracking-wide">Stuck on local configuration?</p>
          <p className="text-xs text-yellow-900 leading-relaxed mt-1">
            Student portal assistants and teacher moderators are online in Slack or the Support Center to assist you with installation debugging, firewall credentials, or platform questions!
          </p>
        </div>
      </footer>

    </div>
  );
}
