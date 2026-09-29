import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, X, Lock, CheckCircle2, Cpu, HardDrive } from 'lucide-react';

export const AuditSecurityModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { auditLogs } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Security Architecture & Immutable Audit Trail
              </h3>
              <p className="text-xs text-slate-500">
                Device authentication, cryptographic HMAC signatures, and trainee consent records
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Principles Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs shrink-0">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Hardware Root of Trust</span>
            </div>
            <div className="text-slate-600 text-[11px]">
              ESP32 & Raspberry Pi cryptographic key-pair signing every raw sensor reading.
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Offline-Proof Hash</span>
            </div>
            <div className="text-slate-600 text-[11px]">
              Local SQLite entries are chained; tampering invalidates downstream sync packages.
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Trainee Consent</span>
            </div>
            <div className="text-slate-600 text-[11px]">
              Opt-in digital consent given during ERP onboarding for photo evidence storage.
            </div>
          </div>
        </div>

        {/* Log Entries Table */}
        <div className="flex-1 overflow-y-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 sticky top-0">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                <th className="py-2.5 px-3 font-semibold">Actor / Entity</th>
                <th className="py-2.5 px-3 font-semibold">Action & Details</th>
                <th className="py-2.5 px-3 font-semibold text-right">Cryptographic Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                    {log.actor}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">
                    <span className="font-semibold text-slate-900">{log.action}:</span>{' '}
                    <span className="text-slate-600">{log.details}</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-indigo-700 font-semibold whitespace-nowrap">
                    {log.hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 shrink-0">
          <span>Compliant with Indian IT Act 2000 & Digital Personal Data Protection (DPDP)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold"
          >
            Close Audit Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
