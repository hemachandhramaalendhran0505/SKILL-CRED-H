import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Users, 
  Calendar, 
  Bed, 
  Clock, 
  Plus, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Cpu,
  Search,
  Check
} from 'lucide-react';

export const TrainingErpView: React.FC = () => {
  const { programmes, selectedProgrammeId, setSelectedProgrammeId, setActiveTab, trainee } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'batches' | 'trainees' | 'schedule' | 'hostel'>('trainees');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const selectedProgramme = programmes.find(p => p.id === selectedProgrammeId) || programmes[0];

  const traineesList = [
    {
      id: 'TRN-2026-084',
      name: 'Arun Kumar',
      roll: 'RICM-CHE-DCM-042',
      society: 'Coimbatore District Milk Cooperative Society',
      attendance: '96%',
      lms: '88%',
      practical: 'Captured & Verified (pH: 6.72, Temp: 28.4°C)',
      status: 'Ready for Certification',
      isHero: true
    },
    {
      id: 'TRN-2026-085',
      name: 'Priya Meenakshi',
      roll: 'RICM-CHE-DCM-043',
      society: 'Madurai Dairy Producer Federation',
      attendance: '94%',
      lms: '84%',
      practical: 'In Progress (LMS Complete)',
      status: 'Pending Lab Session',
      isHero: false
    },
    {
      id: 'TRN-2026-086',
      name: 'Karthik Raja',
      roll: 'RICM-CHE-DCM-044',
      society: 'Salem PACS Milk Chilling Union',
      attendance: '92%',
      lms: '78%',
      practical: 'Scheduled Tomorrow',
      status: 'Learning Phase',
      isHero: false
    },
    {
      id: 'TRN-2026-087',
      name: 'Suresh Babu',
      roll: 'RICM-CHE-DCM-045',
      society: 'Erode Dairy Cooperative Bank',
      attendance: '90%',
      lms: '82%',
      practical: 'Captured (Awaiting Trainer Approval)',
      status: 'Under Review',
      isHero: false
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              NCCT Institutional ERP
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500">RICM Chennai Management Console</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            Capacity Building & Training ERP
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Programmes → Batches → Trainees → Schedules → Practical Tasks Integration
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Programme</span>
          </button>
        </div>
      </div>

      {/* Programme Selection Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {programmes.map((p) => {
          const isSelected = p.id === selectedProgrammeId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProgrammeId(p.id)}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono text-slate-500">{p.code}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {p.durationDays} Days
                </span>
              </div>
              <div className="font-bold text-sm text-slate-900 leading-snug">{p.title}</div>
              <div className="text-xs text-slate-500 mt-1 line-clamp-1">{p.institution}</div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>{p.activeTrainees} Active Trainees</span>
                <span className="font-semibold text-emerald-600 font-mono">{p.completionRate}% Comp.</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Programme Workspace */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Programme Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
              Active Curriculum
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {selectedProgramme.title} ({selectedProgramme.code})
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              {selectedProgramme.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('lms')}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Open LMS Course</span>
            </button>
            <button
              onClick={() => setActiveTab('smart_hub')}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Launch Hub Lab Task</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-4 px-5 border-b border-slate-200 text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('trainees')}
            className={`py-3 border-b-2 transition-colors ${
              activeSubTab === 'trainees'
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Trainee Roster & Skill Tracking (48)
          </button>
          <button
            onClick={() => setActiveSubTab('batches')}
            className={`py-3 border-b-2 transition-colors ${
              activeSubTab === 'batches'
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Batches & Instructors
          </button>
          <button
            onClick={() => setActiveSubTab('schedule')}
            className={`py-3 border-b-2 transition-colors ${
              activeSubTab === 'schedule'
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Laboratory Timetable
          </button>
          <button
            onClick={() => setActiveSubTab('hostel')}
            className={`py-3 border-b-2 transition-colors ${
              activeSubTab === 'hostel'
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Hostel & Logistics
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {activeSubTab === 'trainees' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  Showing enrolled trainees in <span className="font-semibold text-slate-900">Batch 2026-B3</span>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search trainee name or society..."
                    className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-md w-64 focus:outline-indigo-600"
                    readOnly
                    value="Arun Kumar"
                  />
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Trainee & Roll No.</th>
                      <th className="py-2.5 px-3 font-semibold">Cooperative Society</th>
                      <th className="py-2.5 px-3 font-semibold text-center">Attendance</th>
                      <th className="py-2.5 px-3 font-semibold text-center">LMS Progress</th>
                      <th className="py-2.5 px-3 font-semibold">Practical Skill Evidence</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {traineesList.map((t) => (
                      <tr 
                        key={t.id} 
                        className={`hover:bg-slate-50 transition-colors ${t.isHero ? 'bg-indigo-50/40' : ''}`}
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            {t.isHero && (
                              <img
                                src={trainee.avatar}
                                alt={t.name}
                                className="w-7 h-7 rounded-full object-cover border border-indigo-300"
                              />
                            )}
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                {t.name}
                                {t.isHero && (
                                  <span className="text-[10px] bg-indigo-600 text-white font-normal px-1.5 py-0.2 rounded">
                                    Current User
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">{t.roll}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-700">{t.society}</td>
                        <td className="py-3 px-3 text-center font-mono font-medium text-slate-800">{t.attendance}</td>
                        <td className="py-3 px-3 text-center font-mono font-medium text-indigo-700">{t.lms}</td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                            t.isHero 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {t.isHero && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            {t.practical}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => setActiveTab('skill_verification')}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                          >
                            Verify →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubTab === 'batches' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Batch 2026-B3 (Current)</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">In Progress</span>
                </div>
                <div className="text-xs text-slate-600">Assigned Master Trainer: <span className="font-semibold text-slate-900">Dr. S. Ranganathan</span></div>
                <div className="text-xs text-slate-600">Hardware Allocation: <span className="font-mono font-medium text-indigo-700">Hub SCH-001 (Dairy Kit)</span></div>
                <div className="text-xs text-slate-500">Dates: 01 Sept 2026 – 30 Sept 2026 (Day 28 of 30)</div>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 space-y-2 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Batch 2026-B4 (Upcoming)</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">Scheduled</span>
                </div>
                <div className="text-xs text-slate-600">Assigned Master Trainer: <span className="font-semibold text-slate-900">Prof. M. Selvam</span></div>
                <div className="text-xs text-slate-600">Hardware Allocation: <span className="font-mono font-medium text-indigo-700">Hub SCH-001</span></div>
                <div className="text-xs text-slate-500">Dates: 05 Oct 2026 – 04 Nov 2026 (Enrolling)</div>
              </div>
            </div>
          )}

          {activeSubTab === 'schedule' && (
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between">
                <span>Today's Lab Session: <strong className="font-semibold">Practical Task #04 (Milk Quality Assessment)</strong></span>
                <span className="font-mono font-semibold">10:00 AM - 01:00 PM</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                <span>Afternoon Session: Cold-Chain Logistics & Microbial Preservative Theory</span>
                <span className="font-mono text-slate-500">02:30 PM - 05:00 PM</span>
              </div>
            </div>
          )}

          {activeSubTab === 'hostel' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="text-slate-500 font-medium">RICM Hostel Block A</div>
                <div className="text-sm font-bold text-slate-900 mt-1">48 / 50 Beds Occupied</div>
                <div className="text-emerald-600 text-[11px] mt-0.5">Meal Pass Active</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="text-slate-500 font-medium">Daily Stipend Disbursed</div>
                <div className="text-sm font-bold text-slate-900 mt-1">₹350 / Day via DBT</div>
                <div className="text-slate-500 text-[11px] mt-0.5">100% Aadhaar Seeded</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="text-slate-500 font-medium">Field Transport</div>
                <div className="text-sm font-bold text-slate-900 mt-1">Aavin Dairy Plant Bus</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Scheduled Thursday 09:00 AM</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Mock */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Create New NCCT Programme</h3>
            <p className="text-xs text-slate-600">
              Register a capacity building programme with modular skill verification standards.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Programme Title</label>
                <input
                  type="text"
                  defaultValue="Organic Honey & Bee-keeping Cooperative Processing"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    defaultValue="14"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Modular Skill Kit</label>
                  <select className="w-full border border-slate-300 rounded px-3 py-2 text-xs">
                    <option>Dairy Kit (pH & Temp)</option>
                    <option>Agriculture Kit (Moisture & NPK)</option>
                    <option>Digital PACS Kit</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-1.5 text-xs bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500"
              >
                Create Programme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
