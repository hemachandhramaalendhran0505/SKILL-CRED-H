import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Cpu, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export const JobMatchingView: React.FC = () => {
  const { trainee, setActiveTab } = useApp();
  const [selectedCandidate, setSelectedCandidate] = useState<'arun' | 'unverified'>('arun');

  const comparisonRows = [
    {
      skill: 'Milk Quality Testing (pH & Acidity)',
      arunHas: 'Demonstrated on Hub SCH-001 (pH 6.72, 28.4°C)',
      arunProof: 'Hardware Telemetry + Camera Frame',
      arunMatch: '100% Match',
      otherHas: 'Self-reported on paper resume ("3 years dairy exp")',
      otherProof: 'None (Unverified claim)',
      otherMatch: 'Unverified'
    },
    {
      skill: 'Digital Record Management & ERP',
      arunHas: 'Completed Module 4 LMS + 88% assessment',
      arunProof: 'NCCT LMS Audit Trail',
      arunMatch: '95% Match',
      otherHas: 'Basic computer diploma certificate (2021)',
      otherProof: 'Paper Xerox Copy',
      otherMatch: 'Partial'
    },
    {
      skill: 'Cold Chain & Preservative Protocols',
      arunHas: 'Practical task evaluated by Master Trainer (92%)',
      arunProof: 'Dr. S. Ranganathan Signature',
      arunMatch: '92% Match',
      otherHas: 'Attended 2-day workshop',
      otherProof: 'Attendance Certificate Only',
      otherMatch: 'Low Confidence'
    },
    {
      skill: 'Cooperative Society Governance',
      arunHas: 'RICM 30-day comprehensive curriculum',
      arunProof: 'Official NCCT Batch Register',
      arunMatch: '90% Match',
      otherHas: 'Member of village cooperative',
      otherProof: 'Verbal Reference',
      otherMatch: 'Unverified'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Competency-Based Matching
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-xs text-slate-500">Beyond Resume Keywords</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
          Verified Skill vs. Job Requirement Matrix
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Replacing unverifiable claims with cryptographic proof of practical capability.
        </p>
      </div>

      {/* Philosophy Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
            Hiring Paradigm Shift
          </div>
          <div className="text-base font-bold text-white">
            "Matching is based on verified competencies, not only resume keywords."
          </div>
          <div className="text-xs text-slate-300">
            A traditional LMS produces attendance certificates. SkillCred produces verifiable skill portfolios.
          </div>
        </div>

        <button
          onClick={() => setActiveTab('smart_hub')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs shrink-0 transition-colors"
        >
          Inspect Hub Verification →
        </button>
      </div>

      {/* Candidate Switcher */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="text-xs text-slate-700">
          Comparing Candidate: <strong className="text-slate-900">Arun Kumar (SkillCred Verified)</strong> vs Traditional Unverified Applicant
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCandidate('arun')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedCandidate === 'arun'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Arun Kumar (Verified)
          </button>
          <button
            onClick={() => setSelectedCandidate('unverified')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedCandidate === 'unverified'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Generic Applicant
          </button>
        </div>
      </div>

      {/* The Core Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Target Job: Dairy Field Quality Technician (Amul Federation)
          </div>
          <span className="text-xs font-mono font-semibold text-indigo-700">
            Weighted Match: {selectedCandidate === 'arun' ? '94.2% Confidence' : '38.4% Confidence'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Job Requirement</th>
                <th className="py-3 px-4 font-semibold">Candidate Competency</th>
                <th className="py-3 px-4 font-semibold">Underlying Evidence Type</th>
                <th className="py-3 px-4 font-semibold text-right">Verification Match</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => {
                const isArun = selectedCandidate === 'arun';
                return (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.skill}</td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {isArun ? row.arunHas : row.otherHas}
                    </td>
                    <td className="py-3.5 px-4">
                      {isArun ? (
                        <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium text-[11px]">
                          <Cpu className="w-3 h-3 text-emerald-600" />
                          <span>{row.arunProof}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium text-[11px]">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>{row.otherProof}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold">
                      {isArun ? (
                        <span className="text-emerald-700">{row.arunMatch}</span>
                      ) : (
                        <span className="text-slate-400">{row.otherMatch}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-slate-600">
            Smart Hub evidence guarantees zero fraudulent claims and reduces employer onboarding probation risk.
          </div>
          <button
            onClick={() => setActiveTab('credentials')}
            className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 shrink-0"
          >
            <span>View Verified Certificate →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
