import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Share2, 
  ExternalLink,
  Check,
  Building,
  User,
  Calendar,
  Layers,
  X
} from 'lucide-react';

export const CredentialsView: React.FC = () => {
  const { credential, trainee, evidence, setActiveTab } = useApp();
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Tamper-Evident Certification
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-mono">{credential.credentialId}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            SkillCred Verified Digital Credential
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Cryptographically anchored to physical Smart Hub evidence, LMS coursework, and NCCT master trainer audit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVerifyModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Credential Authenticity</span>
          </button>
        </div>
      </div>

      {/* Main Official Certificate Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border-4 border-indigo-950/20 shadow-xl overflow-hidden relative">
        {/* Subtle Decorative Guilloche Border Pattern */}
        <div className="h-3 bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-900" />

        <div className="p-8 sm:p-10 space-y-8 bg-gradient-to-b from-slate-50/50 to-white">
          {/* Certificate Header with Official Crest */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-900 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                SC
              </div>
              <div>
                <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Government of India · Ministry of Cooperation
                </div>
                <div className="text-base font-extrabold text-slate-900">
                  National Council for Cooperative Training (NCCT)
                </div>
                <div className="text-xs text-indigo-700 font-semibold">
                  SkillCred Verified Cooperative Skill Credential
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right font-mono text-xs">
              <span className="text-[10px] text-slate-400 block uppercase">CREDENTIAL ID</span>
              <span className="font-bold text-slate-900 text-sm">{credential.credentialId}</span>
              <span className="text-[10px] text-emerald-600 block font-sans font-medium mt-0.5">
                ● Tamper-Evident Edge Signed
              </span>
            </div>
          </div>

          {/* Central Body of Certificate */}
          <div className="space-y-4 text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              This is to certify that
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <img
                src={trainee.avatar}
                alt={trainee.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-700 shadow-md"
              />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {trainee.name}
              </h2>
              <div className="text-xs text-slate-500 font-mono">
                Roll No: {trainee.rollNumber} · RICM Chennai Center
              </div>
            </div>

            <div className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
              has completed rigorous physical laboratory testing on the <em>SkillCred Smart Skill Verification Hub</em> 
              and successfully demonstrated standardized practical competency in:
            </div>

            {/* Verified Skill Highlight Box */}
            <div className="inline-block px-6 py-3 bg-indigo-50 border border-indigo-200 rounded-xl shadow-2xs">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                VERIFIED SKILL SPECIALIZATION
              </span>
              <span className="text-lg font-bold text-indigo-700">
                {credential.skillName}
              </span>
            </div>

            <div className="text-xs text-slate-500">
              Programme: <strong className="text-slate-800">{credential.programmeName}</strong>
            </div>
          </div>

          {/* Competency & Signature Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 items-center">
            {/* Score Breakdown Pill */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-1.5 text-xs">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Competency Score</div>
              <div className="text-2xl font-extrabold text-indigo-700 font-mono">
                {credential.competencyScore}%
              </div>
              <div className="text-[10px] text-slate-500">
                Practical (37/40) · Assessment (25/30) · Trainer (18/20) · LMS (8.8/10)
              </div>
            </div>

            {/* QR Code Anchor */}
            <div className="flex flex-col items-center justify-center text-center space-y-1.5">
              <div 
                onClick={() => setShowVerifyModal(true)}
                className="w-24 h-24 bg-white border-2 border-slate-900 rounded-lg p-2 shadow-xs cursor-pointer hover:border-indigo-600 transition-colors flex items-center justify-center"
              >
                <QrCode className="w-20 h-20 text-slate-900" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">Scan to Verify Proof</span>
            </div>

            {/* Master Trainer Signature */}
            <div className="text-right space-y-1 text-xs">
              <div className="font-serif italic text-base text-slate-800">
                S. Ranganathan
              </div>
              <div className="font-bold text-slate-900">{credential.verifiedBy}</div>
              <div className="text-[11px] text-slate-500">Issued: {credential.issueDate}</div>
              <div className="text-[10px] text-indigo-600 font-mono truncate">
                Hash: {credential.evidenceHash.slice(0, 16)}...
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Bottom Bar with Actions */}
        <div className="bg-slate-900 text-white px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 font-mono text-[11px]">
            Anchored to NCCT Public Skill Ledger · Authenticity Guaranteed
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowVerifyModal(true)}
              className="hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>Instant Verification</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('recruiters')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>View in Recruiter Portal →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verification Modal Simulation */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    NCCT Public Verification Gateway
                  </h3>
                  <p className="text-[11px] text-slate-500">Official Ministry of Cooperation Ledger</p>
                </div>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Verification Status Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                  STATUS: VERIFIED AUTHENTIC
                </span>
                <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
                  VALID
                </span>
              </div>
              <p className="text-xs text-emerald-800">
                This credential was issued by a registered NCCT training institution and is backed by physical Smart Hub evidence.
              </p>
            </div>

            {/* Candidate & Evidence Audit Details */}
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Trainee Name:</span>
                <span className="font-bold text-slate-900">{trainee.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Credential ID:</span>
                <span className="font-mono font-bold text-slate-900">{credential.credentialId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Verified Competency:</span>
                <span className="font-bold text-indigo-700">{credential.skillName} (88%)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Testing Hardware:</span>
                <span className="font-mono text-slate-900">Hub SCH-001 (RICM Chennai)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Raw Sensor Evidence:</span>
                <span className="text-emerald-700 font-semibold">pH 6.72 · Temp 28.4°C · Cond 4.82</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Trainer Endorsement:</span>
                <span className="font-medium text-slate-900">Dr. S. Ranganathan (Approved)</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block">Cryptographic Edge Hash:</span>
                <span className="font-mono text-[10px] text-slate-600 break-all bg-slate-50 p-1.5 rounded block mt-0.5 border border-slate-200">
                  {credential.evidenceHash}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowVerifyModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                Close Verification Gateway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
