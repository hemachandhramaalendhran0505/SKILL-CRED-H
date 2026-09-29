import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Award, 
  User, 
  Clock, 
  FileText, 
  Cpu, 
  Camera, 
  Check, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export const SkillVerificationView: React.FC = () => {
  const { 
    trainee, 
    evidence, 
    approveTrainerSkill, 
    requestReassessment, 
    setActiveTab, 
    generateCredential 
  } = useApp();

  const [trainerNotes, setTrainerNotes] = useState(
    'Trainee demonstrated proper calibration of the digital pH probe, recorded standard raw milk pH within 6.6–6.8 limits, and maintained hygienic sample isolation.'
  );
  const [actionDone, setActionDone] = useState<string | null>(null);

  const handleApprove = () => {
    approveTrainerSkill(trainerNotes);
    setActionDone('approved');
  };

  const handleReassess = () => {
    requestReassessment();
    setActionDone('reassessment_requested');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Verification Engine
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500">AI-Assisted + Human Master Trainer Approval</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            Practical Skill Verification & Competency Audit
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Evaluating multi-modal evidence from LMS, physical Smart Hub sensors, camera frames, and trainer assessment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {trainee.practicalStatus === 'verified' && (
            <button
              onClick={() => {
                generateCredential();
                setActiveTab('credentials');
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>Generate Digital Credential →</span>
            </button>
          )}
        </div>
      </div>

      {/* Trainee Card & Competency Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img
            src={trainee.avatar}
            alt={trainee.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600 shadow-xs"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">{trainee.name}</h2>
              <span className="text-xs font-mono text-slate-500">({trainee.rollNumber})</span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                trainee.practicalStatus === 'verified' 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {trainee.practicalStatus === 'verified' ? 'SKILL VERIFIED' : 'AWAITING TRAINER APPROVAL'}
              </span>
            </div>
            <div className="text-xs text-slate-600">
              Programme: <strong className="text-slate-800">{trainee.programmeName}</strong>
            </div>
            <div className="text-[11px] text-slate-500">
              Institution: {trainee.institution}
            </div>
          </div>
        </div>

        {/* Big Overall Competency Score */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center md:text-right shrink-0">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Overall Competency Score
          </div>
          <div className="text-3xl font-extrabold text-indigo-700 font-mono mt-0.5 tabular-nums">
            {trainee.overallCompetency}%
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">
            Exceeds NCCT Certified Benchmark (75%)
          </div>
        </div>
      </div>

      {/* 4-Pillar Score Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          Standardized Competency Weightage Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-lg border border-indigo-200 bg-indigo-50/40 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-900">Practical Performance</span>
              <span className="font-bold font-mono text-indigo-700">40% Weight</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900">37 / 40</div>
            <div className="text-[11px] text-slate-600">
              Hardware Smart Hub live sensor test + probe accuracy
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Formal Assessment</span>
              <span className="font-bold font-mono text-slate-700">30% Weight</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900">25 / 30</div>
            <div className="text-[11px] text-slate-600">
              Standardized objective quiz on dairy microbiology & pH
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Trainer Evaluation</span>
              <span className="font-bold font-mono text-slate-700">20% Weight</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900">18 / 20</div>
            <div className="text-[11px] text-slate-600">
              Master trainer lab observation & procedural hygiene
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">LMS Completion</span>
              <span className="font-bold font-mono text-slate-700">10% Weight</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900">8.8 / 10</div>
            <div className="text-[11px] text-slate-600">
              Multilingual curriculum module progression (88%)
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: AI-Assisted Panel vs Trainer Decision Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: AI-Assisted Competency Analysis Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                AI-Assisted Competency Analysis
              </h3>
            </div>
            <span className="text-[11px] bg-indigo-100 text-indigo-800 font-semibold px-2 py-0.5 rounded font-mono">
              Model: NCCT-Dairy-Eval-v2
            </span>
          </div>

          {/* AI Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-500">Evidence Quality</div>
              <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">92%</div>
              <div className="text-[10px] text-emerald-600">1080p optical clarity confirmed</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-500">Task Completion</div>
              <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">94%</div>
              <div className="text-[10px] text-emerald-600">All 6 rubric steps observed</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-500">Sensor Consistency</div>
              <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">89%</div>
              <div className="text-[10px] text-emerald-600">Stable pH curve (6.72 ± 0.04)</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-500">Assessment Score</div>
              <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">84%</div>
              <div className="text-[10px] text-emerald-600">Theory qualified</div>
            </div>
          </div>

          {/* AI Recommendation Box */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2 text-xs">
            <div className="font-bold text-indigo-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-700" />
              <span>AI Recommendation: RECOMMEND APPROVAL</span>
            </div>
            <p className="text-indigo-900 leading-relaxed">
              "Practical evidence and live sensor telemetry confirm that the trainee has demonstrated required competency for 
              <strong> Milk Quality Testing & Acidity Bench Diagnostics</strong>. Sensor readings match biological raw milk standards."
            </p>
            <div className="text-[11px] font-semibold text-slate-600 pt-1 border-t border-indigo-200/60">
              Note: SkillCred protocol strictly enforces human master trainer confirmation. AI cannot independently issue credentials.
            </div>
          </div>

          {/* Raw Cryptographic Evidence Package Summary */}
          <div className="p-3 rounded-lg bg-slate-900 text-white font-mono text-[11px] space-y-1">
            <div className="text-indigo-300 font-bold uppercase text-[10px]">
              Edge Hardware Evidence Signature:
            </div>
            <div className="truncate text-slate-300">
              PAYLOAD: [pH: 6.72, Temp: 28.4°C, Cond: 4.82, Cam: 9812-EVD]
            </div>
            <div className="text-slate-400 truncate">
              HASH: {evidence.edgeHash}
            </div>
          </div>
        </div>

        {/* Right Column: Master Trainer Validation & Sign-Off Console */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Master Trainer Sign-Off Console
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-700">
                Dr. S. Ranganathan (RICM)
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-semibold text-slate-800 block">
                Trainer Evaluation Remarks & Notes:
              </label>
              <textarea
                rows={4}
                value={trainerNotes}
                onChange={(e) => setTrainerNotes(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3 text-xs focus:outline-indigo-600 text-slate-800 bg-white"
                placeholder="Enter procedural evaluation notes..."
              />
            </div>

            {/* Checklist of Mandatory Human Confirmations */}
            <div className="space-y-2 text-xs">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Procedural Compliance Checklist:
              </div>
              <div className="space-y-1.5 text-slate-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                  <span>Physical probe sanitization protocol followed prior to immersion</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                  <span>Trainee was independently identified by Smart Hub QR camera</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                  <span>Readings were not simulated or falsified by unauthorized devices</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            {actionDone === 'approved' && (
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Competency Approved! You can now generate the digital credential.</span>
              </div>
            )}

            {actionDone === 'reassessment_requested' && (
              <div className="p-3 bg-amber-50 text-amber-900 rounded-lg text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Re-assessment requested. Trainee notified to recalibrate probe.</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={handleReassess}
                className="flex-1 py-2.5 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Request Reassessment
              </button>

              <button
                onClick={handleApprove}
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Approve Skill & Certify</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
