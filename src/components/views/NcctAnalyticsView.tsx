import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Building2, 
  Award, 
  Briefcase, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  PieChart,
  Users
} from 'lucide-react';

export const NcctAnalyticsView: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');

  const stateData = [
    { state: 'Tamil Nadu', trainees: 384, completion: 91, skillsVerified: 890, employment: 215, topInstitute: 'RICM Chennai' },
    { state: 'Maharashtra', trainees: 312, completion: 88, skillsVerified: 740, employment: 180, topInstitute: 'VAMNICOM Pune' },
    { state: 'Karnataka', trainees: 260, completion: 86, skillsVerified: 590, employment: 135, topInstitute: 'ICM Bengaluru' },
    { state: 'Kerala', trainees: 154, completion: 89, skillsVerified: 360, employment: 92, topInstitute: 'ICM Thiruvananthapuram' },
    { state: 'Andhra Pradesh', trainees: 138, completion: 82, skillsVerified: 266, employment: 70, topInstitute: 'ICM Hyderabad' }
  ];

  const skillGaps = [
    { skill: 'Milk Quality Testing & Acidity Lab', demand: 92, supply: 64, gap: '-28% Deficit' },
    { skill: 'PACS Digital Banking & DBT Reconciliation', demand: 88, supply: 55, gap: '-33% Deficit' },
    { skill: 'Precision Soil Health Sensor Diagnostics', demand: 76, supply: 42, gap: '-34% Deficit' },
    { skill: 'Cold Chain Storage Management', demand: 70, supply: 68, gap: 'Balanced' }
  ];

  const feedbackLoopNodes = [
    { step: '01', title: 'TRAINING', desc: 'NCCT creates standardized curriculum' },
    { step: '02', title: 'SKILLS', desc: 'Smart Hub captures tangible evidence' },
    { step: '03', title: 'CERTIFICATION', desc: 'Tamper-evident verifiable credential' },
    { step: '04', title: 'EMPLOYMENT', desc: 'Amul/KMF/PACS verified hiring' },
    { step: '05', title: 'EMPLOYER FEEDBACK', desc: 'Industry rates on-the-job competency' },
    { step: '06', title: 'SKILL DEMAND DATA', desc: 'National telemetry spots regional deficits' },
    { step: '07', title: 'CURRICULUM UPDATE', desc: 'NCCT updates practical hub task kits' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            National Council for Cooperative Training (NCCT)
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-xs text-slate-500">Ministry of Cooperation, Govt of India</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
          National Cooperative Capacity & Outcome Analytics
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Empirical outcome measurement tracking institutional performance, verified skill velocity, and post-training employment.
        </p>
      </div>

      {/* SECTION 20: THE CONTINUOUS FEEDBACK LOOP DIAGRAM */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 border-2 border-indigo-900/60 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[11px] font-mono font-semibold text-indigo-400 uppercase tracking-wider">
              Continuous Institutional Improvement Loop
            </span>
            <h2 className="text-base font-bold text-white">
              The Training → Verified Skills → Employment Feedback Engine
            </h2>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-semibold">
            ● Adaptive Curriculum Active
          </span>
        </div>

        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          Unlike traditional static schemes where training ends with attendance, SkillCred loops verified employment feedback directly back into NCCT curriculum updates.
        </p>

        {/* Circular / Step Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 pt-2">
          {feedbackLoopNodes.map((node, i) => (
            <div
              key={node.step}
              className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 p-3 rounded-xl space-y-1.5 transition-all text-left relative group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-indigo-400">
                <span>{node.step}</span>
                {i < feedbackLoopNodes.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden md:block group-hover:text-indigo-300 group-hover:translate-x-0.5 transition-all" />
                )}
              </div>
              <div className="text-xs font-bold text-white tracking-wide">
                {node.title}
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">
                {node.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Level National Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Participating Institutes</div>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">14 RICMs / ICMs</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">100% Hub Deployment</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Total Certified Trainees</div>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">1,976</div>
          <div className="text-[11px] text-indigo-600 font-medium mt-0.5">With verifiable credentials</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Hardware Evidence Density</div>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">2.4 / Trainee</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Average physical tasks verified</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Post-Training Placement Rate</div>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">51.4%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">↑ 22% vs legacy attendance-only</div>
        </div>
      </div>

      {/* Two Column Layout: State Performance Table + Skill Demand Gap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: State Performance Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                State & Regional Institute Performance
              </h3>
              <p className="text-xs text-slate-500">
                Comparative analysis of cooperative training completion and verified hiring
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">FY 2026-27</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">State & Institute</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Trainees</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Completion</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Verified Skills</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Placements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stateData.map((st) => (
                  <tr
                    key={st.state}
                    onClick={() => setSelectedState(st.state)}
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                      selectedState === st.state ? 'bg-indigo-50/50' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{st.state}</div>
                      <div className="text-[11px] text-slate-500">{st.topInstitute}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-medium">{st.trainees}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-emerald-700">
                      {st.completion}%
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-indigo-700 font-medium">
                      {st.skillsVerified}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                      {st.employment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Skill Demand vs Available Supply (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Skill Demand vs. Available Talent Supply
            </h3>
            <p className="text-xs text-slate-500">
              Future capacity planning informed by employer vacancy telemetrics
            </p>
          </div>

          <div className="space-y-3">
            {skillGaps.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{item.skill}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    item.gap === 'Balanced' 
                      ? 'bg-slate-100 text-slate-700' 
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {item.gap}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-500">
                  <div className="flex justify-between">
                    <span>Industry Demand Index:</span>
                    <span className="font-mono font-semibold text-slate-800">{item.demand}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certified Supply Index:</span>
                    <span className="font-mono font-semibold text-indigo-700">{item.supply}/100</span>
                  </div>
                </div>

                {/* Relative progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full"
                    style={{ width: `${item.supply}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-950">
            <strong>Policy Action:</strong> NCCT allocates 12 additional <em>Milk Quality Testing & Acidity Lab</em> Smart Hub kits to Tamil Nadu & Gujarat for next fiscal cycle.
          </div>
        </div>
      </div>
    </div>
  );
};
