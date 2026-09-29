import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobOpening } from '../../types';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  CheckCircle2, 
  Cpu, 
  FileText, 
  ExternalLink, 
  UserCheck, 
  Filter, 
  Send,
  Eye,
  X
} from 'lucide-react';

export const RecruitersView: React.FC = () => {
  const { jobs, trainee, setActiveTab, evidence } = useApp();
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0].id);
  const [viewEvidenceModal, setViewEvidenceModal] = useState<boolean>(false);
  const [offerSent, setOfferSent] = useState<boolean>(false);

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Employer Talent Portal
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500">Cooperative Industry Recruitment</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            Verified Cooperative Talent Acquisition
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Hire candidates backed by physical Smart Hub proof of skill rather than unverified paper resumes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Hardware Verification Required by Amul</span>
          </span>
        </div>
      </div>

      {/* Two Column Layout: Open Job Positions + Matched Candidates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Job Openings List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Active Cooperative Openings (3)
          </div>

          {jobs.map((job) => {
            const isSelected = job.id === selectedJobId;
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-900 leading-snug">
                    {job.title}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {job.vacancies} Openings
                  </span>
                </div>

                <div className="text-xs text-indigo-700 font-semibold mt-1">
                  {job.organization}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.location}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-700">{job.salaryRange}</span>
                  <span className="font-semibold text-indigo-600">
                    {job.matchedCandidates.length} Matched
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Candidate Matching Workspace (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Selected Job Header */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-mono text-slate-500">{selectedJob.organization}</span>
                <h2 className="text-lg font-bold text-slate-900">{selectedJob.title}</h2>
                <div className="text-xs text-slate-600 mt-0.5">
                  Location: {selectedJob.location} · Compensation: {selectedJob.salaryRange}
                </div>
              </div>

              <button
                onClick={() => setActiveTab('job_matching')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View Full Skill Matrix →</span>
              </button>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Mandatory Required Skills (Hard Gates):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedJob.requiredSkills.map((req, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-100 text-slate-800 font-medium px-2.5 py-1 rounded-md border border-slate-200"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Matched Candidates Roster */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Verified Candidate Matches
              </h3>
              <span className="text-xs text-slate-500">
                Ranked by physical lab competency + hardware evidence
              </span>
            </div>

            <div className="space-y-3">
              {selectedJob.matchedCandidates.map((cand, idx) => {
                const isHero = cand.traineeId === trainee.id;

                return (
                  <div
                    key={cand.traineeId}
                    className={`p-4 rounded-xl border transition-all ${
                      isHero
                        ? 'bg-indigo-50/40 border-indigo-300 ring-1 ring-indigo-500/20'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Candidate Avatar & Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={isHero ? trainee.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'}
                          alt={cand.traineeName}
                          className="w-12 h-12 rounded-full object-cover border border-slate-300"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">
                              {cand.traineeName}
                            </span>
                            {isHero && (
                              <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.2 rounded font-medium">
                                Top Match
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">
                            NCCT RICM Chennai · Dairy Mgmt (30 Days)
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                              <Cpu className="w-3 h-3 text-emerald-700" />
                              <span>Hardware Evidence Verified (Hub SCH-001)</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Match Score & Actions */}
                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="text-right">
                          <span className="text-[11px] text-slate-500 block uppercase font-medium">Match</span>
                          <span className="text-2xl font-bold font-mono text-indigo-700">
                            {cand.matchScore}%
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => setViewEvidenceModal(true)}
                            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md shadow-2xs flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-indigo-600" />
                            <span>View Evidence</span>
                          </button>

                          <button
                            onClick={() => {
                              setOfferSent(true);
                              setTimeout(() => setOfferSent(false), 3000);
                            }}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1 transition-colors"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{offerSent ? 'Offer Sent!' : 'Schedule Call'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Skill Breakdown Badges */}
                    <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs flex flex-wrap items-center gap-2">
                      <span className="text-slate-500 font-medium">Verified Evidence:</span>
                      {cand.skillsVerified.map((sk, i) => (
                        <span
                          key={i}
                          className="bg-white border border-slate-200 text-slate-800 text-[11px] px-2 py-0.5 rounded font-medium"
                        >
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Evidence Inspector Modal */}
      {viewEvidenceModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Smart Hub Evidence Inspection: {trainee.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Raw IoT telemetry captured at RICM Chennai Laboratory Station #01
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewEvidenceModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Evidence Image and Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                <img
                  src="/src/assets/images/milk_testing_evidence_1790652651587.jpg"
                  alt="Practical Lab Evidence"
                  className="w-full h-48 object-cover"
                />
                <div className="p-2.5 text-[11px] text-slate-300 font-mono flex justify-between bg-slate-950">
                  <span>FRAME #9812-EVD</span>
                  <span className="text-emerald-400">1080p Authenticated</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-slate-500">Target Competency</div>
                  <div className="font-bold text-slate-900">Milk Quality Testing & Acidity Bench Diagnostics</div>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-400">pH Level</div>
                    <div className="text-sm font-bold text-slate-900">6.72</div>
                    <div className="text-[10px] text-emerald-600">Fresh Raw Range</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-400">Temperature</div>
                    <div className="text-sm font-bold text-slate-900">28.4°C</div>
                    <div className="text-[10px] text-slate-500">Standard Calibration</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-mono truncate">
                  SHA-256 Hash: {evidence.edgeHash.slice(0, 24)}...
                </div>
              </div>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-950">
              <strong>Master Trainer Note:</strong> "{evidence.trainerRemarks}"
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setViewEvidenceModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Close Evidence Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
