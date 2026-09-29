import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  CheckCircle, 
  Award, 
  Briefcase, 
  Cpu, 
  Radio, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { 
    setActiveTab, 
    startGuidedDemo, 
    hubs, 
    hardwareEvidenceCountToday, 
    evidence,
    isOfflineSimulated 
  } = useApp();

  const workflowSteps = [
    { num: '01', title: 'REGISTER', subtitle: 'ERP Batch Roster', tab: 'training_erp' as const },
    { num: '02', title: 'LEARN', subtitle: 'Multilingual LMS', tab: 'lms' as const },
    { num: '03', title: 'PERFORM', subtitle: 'Practical Lab Task', tab: 'practical_tasks' as const },
    { num: '04', title: 'CAPTURE', subtitle: 'Smart Hub Hardware', tab: 'smart_hub' as const, highlight: true },
    { num: '05', title: 'VERIFY', subtitle: 'AI + Master Trainer', tab: 'skill_verification' as const },
    { num: '06', title: 'CERTIFY', subtitle: 'Digital Credential', tab: 'credentials' as const },
    { num: '07', title: 'GET HIRED', subtitle: 'Verified Matching', tab: 'recruiters' as const }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Mission Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-6 text-white shadow-sm border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 tracking-wide uppercase">
                Problem Statement SIH26087
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-slate-300 font-medium">
                Ministry of Cooperation · NCCT
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              NCCT Training Command Center
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl">
              From Attendance to Proof of Skill: An integrated IoT and AI-assisted ecosystem uniting 
              Training ERP, Multilingual LMS, physical Smart Hubs, and employer verification.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={startGuidedDemo}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch 2-Min Jury Demo</span>
            </button>
            <button
              onClick={() => setActiveTab('smart_hub')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Open Smart Hub</span>
            </button>
          </div>
        </div>

        {/* Core Tagline Banner */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Core Principle:</span>
            <span className="italic text-indigo-200">
              "Attendance tells us who was present. SkillCred demonstrates what they can do."
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Hardware Verification Hub</span>
            <span>·</span>
            <span>Modular Skill Kits</span>
            <span>·</span>
            <span>Offline-First Rural Architecture</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Programmes</span>
            <Building2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">24</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Across 14 NCCT RICMs</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Trainees</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">1,248</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Enrolled cooperative staff</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Training Completion</span>
            <GraduationCap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">87%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">↑ 12% vs last quarter</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Verified Skills</span>
            <CheckCircle className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">2,846</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Hardware-tested skills</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Credentials Issued</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">1,976</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Tamper-evident QR minted</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Employment Matches</span>
            <Briefcase className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">642</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Amul, KMF, Aavin PACS</div>
        </div>
      </div>

      {/* Central 7-Stage Workflow Pipeline */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              End-to-End Skill Verification Pipeline
            </h2>
            <p className="text-xs text-slate-500">
              Click any stage below to inspect the live software & hardware components
            </p>
          </div>
          <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
            Hardware Integrated at Step 4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 pt-2">
          {workflowSteps.map((step, idx) => (
            <button
              key={step.num}
              onClick={() => setActiveTab(step.tab)}
              className={`p-3 rounded-lg border text-left transition-all group relative ${
                step.highlight
                  ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-500/20'
                  : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold font-mono ${step.highlight ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {step.num}
                </span>
                {idx < workflowSteps.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden md:block group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                )}
              </div>
              <div className={`text-xs font-bold mt-1.5 ${step.highlight ? 'text-indigo-900' : 'text-slate-800'}`}>
                {step.title}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                {step.subtitle}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Smart Hub Status + 3 Highlight Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Smart Hub Status & Hardware Today */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Smart Hub Fleet Status
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time edge verification stations deployed across NCCT training institutes
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-slate-500 block">Today's Evidence:</span>
              <span className="text-sm font-bold font-mono text-indigo-700">{hardwareEvidenceCountToday} captured</span>
            </div>
          </div>

          <div className="space-y-3">
            {hubs.map((hub) => (
              <div
                key={hub.id}
                onClick={() => setActiveTab('smart_hub')}
                className="p-3.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${hub.status === 'offline' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 font-mono">{hub.id}</span>
                      <span className="text-xs text-slate-600 font-medium">·</span>
                      <span className="text-xs font-semibold text-slate-700">{hub.institution}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Kit: <span className="text-slate-700 font-medium">{hub.activeKit.replace('_', ' ').toUpperCase()}</span> · Location: {hub.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:text-right">
                  <div>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                      hub.status === 'offline' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {hub.status === 'offline' ? 'Offline — Data Queued' : 'Online'}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {hub.status === 'offline' ? `${hub.queuedRecordsCount} pending sync` : `Sync: ${hub.lastSyncTimestamp}`}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>Edge Architecture: Raspberry Pi 5 + ESP32-S3 + Modular Sensors</span>
            <button
              onClick={() => setActiveTab('smart_hub')}
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
            >
              <span>Inspect Hardware Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: 3 Highlight Innovation Pillars */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Smart Hardware
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Captures tangible practical evidence directly during hands-on lab sessions using physical sensor kits (milk pH, soil, digital PACS), eliminating fake certificates.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              AI Skill Intelligence
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Converts raw sensor telemetry, image captures, and LMS scores into a 4-pillar competency analysis for human master trainer sign-off.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Employment Linkage
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empowers recruiters like Amul, KMF, and PACS unions to hire based on verified evidence packages, closing the cooperative talent gap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
