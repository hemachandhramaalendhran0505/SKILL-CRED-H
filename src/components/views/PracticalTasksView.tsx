import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkillKitType } from '../../types';
import { 
  FlaskConical, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Droplet, 
  Wheat, 
  ScanLine, 
  ShieldCheck 
} from 'lucide-react';

export const PracticalTasksView: React.FC = () => {
  const { setActiveTab, changeActiveKit, hubs, activeHubId } = useApp();
  const [selectedKit, setSelectedKit] = useState<SkillKitType>('dairy_kit');

  const activeHub = hubs.find(h => h.id === activeHubId) || hubs[0];

  const modularKits = [
    {
      id: 'dairy_kit' as SkillKitType,
      title: 'Dairy & Cooperative Processing Kit',
      category: 'Livestock & Milk Unions',
      icon: Droplet,
      sensors: ['Digital pH Glass Probe', 'Digital Thermometer', 'Lactometer Interface', 'Sample Conductivity'],
      programmes: 'Dairy Cooperative Management, Milk Chilling Quality Operations',
      status: 'Active on Hub SCH-001'
    },
    {
      id: 'agri_kit' as SkillKitType,
      title: 'PACS Precision Agriculture & Soil Kit',
      category: 'Crop Cooperatives & PACS',
      icon: Wheat,
      sensors: ['Capacitive Soil Moisture Probe', 'Soil NPK & pH Sensor', 'Ambient Temp/Humidity DHT22', 'PAR Light Sensor'],
      programmes: 'PACS Precision Agriculture, Organic Fertilizer Rationing',
      status: 'Available for Hub plug-in'
    },
    {
      id: 'pacs_kit' as SkillKitType,
      title: 'Digital Banking & PACS Operations Kit',
      category: 'Cooperative Banking & Audits',
      icon: ScanLine,
      sensors: ['Omnidirectional Barcode/QR Scanner', 'NFC Dual-Frequency Card Reader', 'Biometric Optical Scanner', 'Thermal Receipt Printer'],
      programmes: 'Digital PACS Operations, Farmer DBT & Loan Disbursement',
      status: 'Active on Hub SCH-003'
    }
  ];

  const tasks = [
    {
      id: 'TSK-01',
      title: 'Perform Basic Milk Quality & Acidity Assessment',
      skill: 'Milk Quality Testing',
      kit: 'dairy_kit' as SkillKitType,
      duration: '30 mins',
      requiredEvidence: ['Sensor reading (pH & Temp)', 'Trainee QR identity', 'Camera photo proof', 'Trainer sign-off'],
      status: 'Evidence Captured (✓)',
      score: '84% (Passed)',
      reviewStatus: 'Trainer Review Pending'
    },
    {
      id: 'TSK-02',
      title: 'Soil Moisture & Pre-Sowing Condition Analysis',
      skill: 'Soil Diagnostic Testing',
      kit: 'agri_kit' as SkillKitType,
      duration: '45 mins',
      requiredEvidence: ['Soil moisture reading', 'pH level', 'Geo-tagged field photo', 'Master trainer check'],
      status: 'Ready to Run',
      score: '—',
      reviewStatus: 'Scheduled'
    },
    {
      id: 'TSK-03',
      title: 'PACS Digital Inventory & Barcode Reconciliation',
      skill: 'Digital Inventory Management',
      kit: 'pacs_kit' as SkillKitType,
      duration: '40 mins',
      requiredEvidence: ['Barcode scan telemetry', 'Ledger tally checksum', 'Operator timestamp'],
      status: 'Ready to Run',
      score: '—',
      reviewStatus: 'Scheduled'
    },
    {
      id: 'TSK-04',
      title: 'Aadhaar Biometric PACS Loan DBT Disbursement Entry',
      skill: 'Cooperative Data Entry & Security',
      kit: 'pacs_kit' as SkillKitType,
      duration: '35 mins',
      requiredEvidence: ['NFC card tap', 'Biometric auth log', 'Audit hash'],
      status: 'Ready to Run',
      score: '—',
      reviewStatus: 'Scheduled'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Hands-On Curriculum
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-xs text-slate-500">Modular Verification Framework</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
          Practical Tasks & Modular Skill Kits
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          One standardized Smart Hub connects with interchangeable hardware modules across distinct cooperative sectors.
        </p>
      </div>

      {/* The Core Formula Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-xl p-5 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider">
            Modularity Principle
          </div>
          <div className="text-base font-bold text-white">
            SMART HUB + MODULAR SKILL KIT = PROGRAMME-SPECIFIC PRACTICAL VERIFICATION
          </div>
          <div className="text-xs text-slate-300">
            "One Smart Hub. Multiple training programmes." Institutions do not buy separate machines.
          </div>
        </div>

        <button
          onClick={() => setActiveTab('smart_hub')}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-xs font-semibold shadow-xs shrink-0 transition-colors"
        >
          Open Hub Console →
        </button>
      </div>

      {/* Modular Skill Kits Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Interchangeable Skill Kits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modularKits.map((kit) => {
            const Icon = kit.icon;
            const isAttached = activeHub.activeKit === kit.id;

            return (
              <div
                key={kit.id}
                className={`p-5 rounded-xl border transition-all ${
                  isAttached
                    ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    isAttached 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isAttached ? 'CONNECTED TO SCH-001' : 'MODULAR COMPATIBLE'}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900 mt-3">{kit.title}</div>
                <div className="text-[11px] text-indigo-600 font-medium mt-0.5">{kit.category}</div>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Included Sensor Hardware:
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    {kit.sensors.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[11px]">
                        <span className="w-1 h-1 rounded-full bg-indigo-600"></span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      changeActiveKit(kit.id);
                      setSelectedKit(kit.id);
                    }}
                    className={`text-xs font-semibold px-3 py-1.5 rounded transition-colors ${
                      isAttached
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700'
                    }`}
                  >
                    {isAttached ? 'Kit Active' : 'Attach Kit to Hub'}
                  </button>
                  <span className="text-[11px] text-slate-400">NCCT Lab Grade</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Tasks Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              NCCT Standardized Practical Task Library
            </h3>
            <p className="text-xs text-slate-500">
              Tasks require physical Smart Hub evidence capture before a competency credential can be minted.
            </p>
          </div>
          <span className="text-xs text-slate-600 font-medium">4 Practical Tasks Configured</span>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/40 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 font-mono">{task.id}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-slate-900">{task.title}</span>
                </div>
                <div className="text-xs text-slate-600">
                  Target Skill: <strong className="text-slate-800">{task.skill}</strong> · Duration: {task.duration}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {task.requiredEvidence.map((e, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200"
                    >
                      ✓ {e}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right text-xs">
                  <span className="font-semibold text-emerald-700 block">{task.status}</span>
                  <span className="text-[11px] text-slate-500">{task.reviewStatus}</span>
                </div>

                <button
                  onClick={() => setActiveTab('smart_hub')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold shadow-xs transition-colors"
                >
                  Execute on Hub →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
