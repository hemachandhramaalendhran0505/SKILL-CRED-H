import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Play, 
  RotateCcw, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  User, 
  ChevronDown,
  Bell,
  Cpu
} from 'lucide-react';

export const Navbar: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const { 
    currentRole, 
    setCurrentRole, 
    activeTab, 
    setActiveTab, 
    trainee, 
    isOfflineSimulated,
    toggleOfflineMode,
    startGuidedDemo,
    guidedDemoActive,
    resetAllToDefault,
    hardwareEvidenceCountToday
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'trainee', label: 'Trainee', desc: 'Arun Kumar (Dairy Mgmt)' },
    { role: 'trainer', label: 'Master Trainer', desc: 'Dr. S. Ranganathan (RICM)' },
    { role: 'admin', label: 'Institution Admin', desc: 'RICM Chennai Center' },
    { role: 'recruiter', label: 'Recruiter / Employer', desc: 'Amul Dairy Federation' },
    { role: 'ncct_admin', label: 'NCCT National Admin', desc: 'Ministry of Cooperation' },
  ];

  const currentRoleObj = roles.find(r => r.role === currentRole) || roles[0];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Zone 1: Brand & Ministry Context */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setActiveTab('overview')}
          className="text-left group flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-700 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-indigo-800 transition-colors">
            SC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                SKILLCRED
              </span>
              <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-200">
                SIH26087
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
              NCCT · Ministry of Cooperation
            </div>
          </div>
        </button>
      </div>

      {/* Zone 2: Institution & Demo Quick Controls */}
      <div className="hidden md:flex items-center gap-3">
        {/* Offline / Online Simulated Toggle */}
        <button
          onClick={toggleOfflineMode}
          title="Click to toggle rural offline simulation mode"
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border font-medium transition-colors ${
            isOfflineSimulated 
              ? 'bg-amber-50 text-amber-800 border-amber-300' 
              : 'bg-emerald-50 text-emerald-800 border-emerald-300'
          }`}
        >
          {isOfflineSimulated ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Offline Mode Active (Data Queued)</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cloud Sync Online</span>
            </>
          )}
        </button>

        {/* Evidence Captured Counter */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-600 px-2.5 py-1.5 bg-slate-100 rounded-md">
          <Cpu className="w-3.5 h-3.5 text-indigo-600" />
          <span>Hardware Evidence Today:</span>
          <span className="font-semibold text-slate-900 font-mono">{hardwareEvidenceCountToday}</span>
        </div>

        {/* Start Guided Demo button */}
        <button
          onClick={startGuidedDemo}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md shadow-xs transition-all ${
            guidedDemoActive 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{guidedDemoActive ? 'Demo Active' : 'Start 2-Min Jury Demo'}</span>
        </button>
      </div>

      {/* Zone 3: Role Switcher & User Profile */}
      <div className="flex items-center gap-3">
        {/* Audit trail button */}
        <button
          onClick={onOpenAudit}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative"
          title="Tamper-Evident Security & Audit Trail"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-800 transition-colors"
          >
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider leading-none">
                Role
              </span>
              <span className="font-semibold text-indigo-700">{currentRoleObj.label}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Switch Ecosystem Role
              </div>
              {roles.map(r => (
                <button
                  key={r.role}
                  onClick={() => {
                    setCurrentRole(r.role);
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-50 transition-colors ${
                    currentRole === r.role ? 'bg-indigo-50/70 text-indigo-900 font-semibold' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{r.label}</span>
                    {currentRole === r.role && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-normal">{r.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <img
            src={trainee.avatar}
            alt={trainee.name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover border border-slate-300"
          />
        </div>
      </div>
    </header>
  );
};
