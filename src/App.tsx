/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { GuidedDemoBanner } from './components/guided-demo/GuidedDemoBanner';
import { OverviewView } from './components/views/OverviewView';
import { TrainingErpView } from './components/views/TrainingErpView';
import { LmsView } from './components/views/LmsView';
import { SmartHubView } from './components/views/SmartHubView';
import { PracticalTasksView } from './components/views/PracticalTasksView';
import { SkillVerificationView } from './components/views/SkillVerificationView';
import { CredentialsView } from './components/views/CredentialsView';
import { RecruitersView } from './components/views/RecruitersView';
import { JobMatchingView } from './components/views/JobMatchingView';
import { NcctAnalyticsView } from './components/views/NcctAnalyticsView';
import { AuditSecurityModal } from './components/modals/AuditSecurityModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenAudit={() => setIsAuditModalOpen(true)} />

      {/* Persistent Jury Demo Walkthrough Banner */}
      <GuidedDemoBanner />

      {/* Main Body with Sidebar + View Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'overview' && <OverviewView />}
          {activeTab === 'training_erp' && <TrainingErpView />}
          {activeTab === 'lms' && <LmsView />}
          {activeTab === 'smart_hub' && <SmartHubView />}
          {activeTab === 'practical_tasks' && <PracticalTasksView />}
          {activeTab === 'skill_verification' && <SkillVerificationView />}
          {activeTab === 'credentials' && <CredentialsView />}
          {activeTab === 'recruiters' && <RecruitersView />}
          {activeTab === 'job_matching' && <JobMatchingView />}
          {activeTab === 'analytics' && <NcctAnalyticsView />}
        </main>
      </div>

      {/* Security & Audit Modal */}
      <AuditSecurityModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
