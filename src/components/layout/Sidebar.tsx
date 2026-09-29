import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Cpu,
  FlaskConical,
  ShieldCheck,
  Award,
  Briefcase,
  UserCheck,
  BarChart3,
  Wifi,
  WifiOff,
  RefreshCw,
  HardDrive
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    hubs, 
    activeHubId,
    restoreConnectivity,
    isOfflineSimulated
  } = useApp();

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'training_erp', label: 'Training ERP', icon: Building2 },
    { id: 'lms', label: 'Multilingual LMS', icon: BookOpen },
    { id: 'smart_hub', label: 'Smart Hub (Hardware)', icon: Cpu, badge: 'IoT Core', highlight: true },
    { id: 'practical_tasks', label: 'Practical Tasks', icon: FlaskConical },
    { id: 'skill_verification', label: 'Skill Verification', icon: ShieldCheck, badge: 'AI + Trainer' },
    { id: 'credentials', label: 'Credentials', icon: Award },
    { id: 'recruiters', label: 'Recruiters', icon: Briefcase },
    { id: 'job_matching', label: 'Job Matching', icon: UserCheck },
    { id: 'analytics', label: 'NCCT Analytics', icon: BarChart3 }
  ];

  const activeHub = hubs.find(h => h.id === activeHubId) || hubs[0];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 h-[calc(100vh-4rem)] border-r border-slate-800">
      {/* Platform Sub-banner */}
      <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          NCCT Ecosystem
        </div>
        <div className="text-xs text-slate-200 font-medium truncate mt-0.5">
          RICM Chennai Center
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium tracking-tight shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.highlight
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Hardware Status Terminal Widget */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60">
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOfflineSimulated ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-[11px] font-semibold text-slate-200">
                {activeHub.id}
              </span>
            </div>
            <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
              isOfflineSimulated 
                ? 'bg-amber-950/60 text-amber-300 border border-amber-800/50' 
                : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50'
            }`}>
              {isOfflineSimulated ? 'Offline' : 'Online'}
            </span>
          </div>

          <div className="text-[11px] text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Sensor Kit:</span>
              <span className="text-slate-200 font-medium">Dairy Quality</span>
            </div>
            <div className="flex justify-between">
              <span>Storage Used:</span>
              <span className="text-slate-200 font-mono">{activeHub.storageUsagePct}%</span>
            </div>
            {activeHub.queuedRecordsCount > 0 && (
              <div className="flex justify-between text-amber-300 font-medium">
                <span>Queued Records:</span>
                <span className="font-mono">{activeHub.queuedRecordsCount} pending</span>
              </div>
            )}
          </div>

          {activeHub.queuedRecordsCount > 0 && (
            <button
              onClick={restoreConnectivity}
              className="w-full mt-1 flex items-center justify-center gap-1 text-[11px] font-medium py-1.5 px-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Sync {activeHub.queuedRecordsCount} Records</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('smart_hub')}
            className="w-full text-center text-[10px] text-indigo-400 hover:text-indigo-300 pt-1 block"
          >
            Open Hardware Simulator →
          </button>
        </div>
      </div>
    </aside>
  );
};
