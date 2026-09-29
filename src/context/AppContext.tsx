import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  NavigationTab, 
  LanguageCode, 
  Trainee, 
  TrainingProgramme, 
  LmsCourse, 
  SmartHubDevice, 
  PracticalEvidence, 
  DigitalCredential, 
  JobOpening, 
  AuditLog,
  SkillKitType
} from '../types';
import { 
  INITIAL_TRAINEE, 
  INITIAL_PROGRAMMES, 
  INITIAL_LMS_COURSES, 
  INITIAL_HUBS, 
  INITIAL_EVIDENCE, 
  INITIAL_CREDENTIAL, 
  INITIAL_JOBS, 
  INITIAL_AUDIT_LOGS 
} from '../services/mockData';

export type SimStep = 
  | 'idle' 
  | 'scanning_qr' 
  | 'trainee_identified' 
  | 'measuring_sensors' 
  | 'capturing_evidence' 
  | 'processing_edge' 
  | 'uploading' 
  | 'completed';

export interface HardwareSimState {
  step: SimStep;
  livePh: number;
  liveTemp: number;
  liveConductivity: number;
  progress: number;
  activeNode: 'sensor' | 'esp32' | 'rpi' | 'edge' | 'storage' | 'cloud' | null;
  logMessage: string;
}

export interface DemoStep {
  title: string;
  tab: NavigationTab;
  role: UserRole;
  description: string;
  actionHint: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    title: '1. NCCT Training Command Center',
    tab: 'overview',
    role: 'ncct_admin',
    description: 'High-level executive dashboard showing 1,248 active cooperative trainees across institutions, live hardware hubs, and the central 7-stage workflow.',
    actionHint: 'View institutional KPIs and real-time evidence stream.'
  },
  {
    title: '2. Training ERP Management',
    tab: 'training_erp',
    role: 'admin',
    description: 'Administrative control of batches, logistical provisioning, hostel allocation, and the 30-day Dairy Cooperative Management curriculum.',
    actionHint: 'Observe integration between institutional ERP and practical skill requirements.'
  },
  {
    title: '3. Multilingual LMS Learning',
    tab: 'lms',
    role: 'trainee',
    description: 'Trainee Arun Kumar completes Module 3 on Milk Quality Testing in English/Hindi/Tamil/Marathi, scoring 92% in the conceptual assessment.',
    actionHint: 'Notice the vital CTA: "Proceed to Practical Skill Task" linking LMS to the Smart Hub.'
  },
  {
    title: '4. Smart Skill Verification Hub',
    tab: 'smart_hub',
    role: 'trainer',
    description: 'The physical edge device (Raspberry Pi 5 + ESP32-S3 + Sensors + Camera + QR) installed at the training institution.',
    actionHint: 'Explore the hardware architecture, telemetry panel, and offline mode toggle.'
  },
  {
    title: '5. Hardware Simulation & Evidence Capture',
    tab: 'smart_hub',
    role: 'trainee',
    description: 'Simulate Arun Kumar scanning his QR code at the Hub, calibrating the Milk Quality Kit, measuring live pH (6.72) and temperature (28.4°C), and capturing photographic proof.',
    actionHint: 'Click "Run Hardware Verification Simulation" to observe the live edge pipeline.'
  },
  {
    title: '6. AI-Assisted Skill Verification',
    tab: 'skill_verification',
    role: 'trainer',
    description: 'AI analyzes sensor consistency (89%) and evidence quality (92%). Dr. S. Ranganathan performs the mandatory trainer review and approves the skill.',
    actionHint: 'Review weighted scoring: 40% practical, 30% assessment, 20% trainer, 10% learning.'
  },
  {
    title: '7. Tamper-Evident Digital Credential',
    tab: 'credentials',
    role: 'trainee',
    description: 'SkillCred mints verifiable credential SC-NCCT-2026-001284 with cryptographic hash and scannable QR verification proof.',
    actionHint: 'Click "Verify Credential" to test the public NCCT cryptographic validator.'
  },
  {
    title: '8. Recruiter Talent Search & Evidence Inspection',
    tab: 'recruiters',
    role: 'recruiter',
    description: 'Amul Dairy searches for "Dairy Field Quality Technician". Arun Kumar matches at 94% because of hardware-verified proof rather than mere resume claims.',
    actionHint: 'Click "View Verified Evidence" to inspect raw sensor data and camera photo.'
  },
  {
    title: '9. Skill-Based Job Matching Matrix',
    tab: 'job_matching',
    role: 'recruiter',
    description: 'Direct comparison matrix demonstrating competency-based hiring and measurable skill gaps.',
    actionHint: 'Inspect verified competencies vs unverified attendance certificates.'
  },
  {
    title: '10. NCCT National Analytics & Feedback Loop',
    tab: 'analytics',
    role: 'ncct_admin',
    description: 'Ministry of Cooperation closed-loop feedback: Training → Verified Skills → Employment → Employer Feedback → Curriculum Update.',
    actionHint: 'Analyze state-wise placement rates and emerging cooperative skill shortages.'
  }
];

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  selectedLanguage: LanguageCode;
  setSelectedLanguage: (lang: LanguageCode) => void;
  
  trainee: Trainee;
  setTrainee: React.Dispatch<React.SetStateAction<Trainee>>;
  programmes: TrainingProgramme[];
  selectedProgrammeId: string;
  setSelectedProgrammeId: (id: string) => void;
  lmsCourses: LmsCourse[];
  
  hubs: SmartHubDevice[];
  activeHubId: string;
  setActiveHubId: (id: string) => void;
  isOfflineSimulated: boolean;
  toggleOfflineMode: () => void;
  restoreConnectivity: () => void;
  changeActiveKit: (kit: SkillKitType) => void;
  
  evidence: PracticalEvidence;
  credential: DigitalCredential;
  jobs: JobOpening[];
  auditLogs: AuditLog[];
  hardwareEvidenceCountToday: number;
  
  simState: HardwareSimState;
  runHardwareSimulation: () => void;
  resetHardwareSimulation: () => void;
  
  approveTrainerSkill: (remarks: string) => void;
  requestReassessment: () => void;
  generateCredential: () => void;
  
  // Guided Demo Flow
  guidedDemoActive: boolean;
  guidedDemoStep: number;
  startGuidedDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  stopGuidedDemo: () => void;
  
  resetAllToDefault: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [currentRole, setCurrentRole] = useState<UserRole>('ncct_admin');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');

  // Core Data
  const [trainee, setTrainee] = useState<Trainee>(() => {
    const saved = localStorage.getItem('skillcred_trainee');
    return saved ? JSON.parse(saved) : INITIAL_TRAINEE;
  });

  const [programmes] = useState<TrainingProgramme[]>(INITIAL_PROGRAMMES);
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<string>('PRG-DCM-01');
  const [lmsCourses] = useState<LmsCourse[]>(INITIAL_LMS_COURSES);
  
  const [hubs, setHubs] = useState<SmartHubDevice[]>(() => {
    const saved = localStorage.getItem('skillcred_hubs');
    return saved ? JSON.parse(saved) : INITIAL_HUBS;
  });
  const [activeHubId, setActiveHubId] = useState<string>('SCH-001');

  const [evidence, setEvidence] = useState<PracticalEvidence>(() => {
    const saved = localStorage.getItem('skillcred_evidence');
    return saved ? JSON.parse(saved) : INITIAL_EVIDENCE;
  });

  const [credential, setCredential] = useState<DigitalCredential>(() => {
    const saved = localStorage.getItem('skillcred_credential');
    return saved ? JSON.parse(saved) : INITIAL_CREDENTIAL;
  });

  const [jobs] = useState<JobOpening[]>(INITIAL_JOBS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('skillcred_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [hardwareEvidenceCountToday, setHardwareEvidenceCountToday] = useState<number>(186);

  // Guided Demo state
  const [guidedDemoActive, setGuidedDemoActive] = useState<boolean>(false);
  const [guidedDemoStep, setGuidedDemoStep] = useState<number>(0);

  // Hardware Simulation state
  const [simState, setSimState] = useState<HardwareSimState>({
    step: 'idle',
    livePh: 6.72,
    liveTemp: 28.4,
    liveConductivity: 4.82,
    progress: 0,
    activeNode: null,
    logMessage: 'Ready for practical task. Waiting for trainee QR identification...'
  });

  // Persist important items
  useEffect(() => {
    localStorage.setItem('skillcred_trainee', JSON.stringify(trainee));
  }, [trainee]);

  useEffect(() => {
    localStorage.setItem('skillcred_hubs', JSON.stringify(hubs));
  }, [hubs]);

  useEffect(() => {
    localStorage.setItem('skillcred_evidence', JSON.stringify(evidence));
  }, [evidence]);

  useEffect(() => {
    localStorage.setItem('skillcred_credential', JSON.stringify(credential));
  }, [credential]);

  // Live telemetry oscillation when hub is idle or measuring
  useEffect(() => {
    const interval = setInterval(() => {
      setSimState(prev => {
        // Minor natural fluctuations in sensor readings
        const phDelta = (Math.random() - 0.5) * 0.04;
        const tempDelta = (Math.random() - 0.5) * 0.1;
        const condDelta = (Math.random() - 0.5) * 0.02;

        return {
          ...prev,
          livePh: Number(Math.max(6.5, Math.min(6.9, prev.livePh + phDelta)).toFixed(2)),
          liveTemp: Number(Math.max(27.8, Math.min(29.2, prev.liveTemp + tempDelta)).toFixed(1)),
          liveConductivity: Number(Math.max(4.6, Math.min(5.1, prev.liveConductivity + condDelta)).toFixed(2))
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const activeHub = hubs.find(h => h.id === activeHubId) || hubs[0];
  const isOfflineSimulated = activeHub.status === 'offline';

  const toggleOfflineMode = () => {
    setHubs(prev => prev.map(h => {
      if (h.id === activeHubId) {
        const nextStatus = h.status === 'offline' ? 'online' : 'offline';
        return {
          ...h,
          status: nextStatus,
          lastSyncTimestamp: nextStatus === 'offline' ? 'Switched to Local Offline Queue' : 'Just now'
        };
      }
      return h;
    }));

    // Add audit log
    const newLog: AuditLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      actor: 'Station Operator',
      action: isOfflineSimulated ? 'Network Connectivity Restored' : 'Simulated Rural Offline Mode Engaged',
      device: activeHubId,
      details: isOfflineSimulated ? 'Hub reconnected to SkillCred Cloud API.' : 'Offline fallback active. Local SQLite queuing enabled.',
      hash: '9f88...41aa'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const restoreConnectivity = () => {
    setHubs(prev => prev.map(h => {
      if (h.id === activeHubId) {
        return {
          ...h,
          status: 'online',
          queuedRecordsCount: 0,
          lastSyncTimestamp: 'Just now (12 records synchronized)'
        };
      }
      return h;
    }));

    setHardwareEvidenceCountToday(c => c + 12);

    const newLog: AuditLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      actor: 'SkillCred Edge Sync Engine',
      action: 'Batch Offline Evidence Uploaded to Cloud',
      device: activeHubId,
      details: '12 cached practical evidence packages with SHA-256 signatures successfully ingested.',
      hash: '33bb...99cd'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const changeActiveKit = (kit: SkillKitType) => {
    setHubs(prev => prev.map(h => h.id === activeHubId ? { ...h, activeKit: kit } : h));
  };

  // Hardware Simulation Routine
  const runHardwareSimulation = () => {
    setSimState({
      step: 'scanning_qr',
      livePh: 6.70,
      liveTemp: 28.2,
      liveConductivity: 4.80,
      progress: 15,
      activeNode: 'esp32',
      logMessage: 'Trainee Arun Kumar scanning QR code (RICM-CHE-DCM-042) via optical reader...'
    });

    setTimeout(() => {
      setSimState(prev => ({
        ...prev,
        step: 'trainee_identified',
        progress: 35,
        activeNode: 'rpi',
        logMessage: 'Trainee identified: Arun Kumar. Task #04 (Milk Quality Assessment) initiated on Raspberry Pi 5.'
      }));

      setTimeout(() => {
        setSimState(prev => ({
          ...prev,
          step: 'measuring_sensors',
          progress: 60,
          activeNode: 'sensor',
          livePh: 6.72,
          liveTemp: 28.4,
          liveConductivity: 4.82,
          logMessage: 'ESP32-S3 polling Milk Quality Probe. Calibrated values: pH 6.72, Temperature 28.4°C.'
        }));

        setTimeout(() => {
          setSimState(prev => ({
            ...prev,
            step: 'capturing_evidence',
            progress: 80,
            activeNode: 'edge',
            logMessage: 'High-res camera shutter triggered. Freezing telemetry frame and computing SHA-256 edge signature...'
          }));

          setTimeout(() => {
            const isCurrentlyOffline = activeHub.status === 'offline';
            const uploadMsg = isCurrentlyOffline
              ? 'Station is OFFLINE: Evidence package encrypted and stored in local edge queue (Record #13).'
              : 'Station ONLINE: Evidence package verified via edge HMAC and uploaded via HTTPS / MQTT to SkillCred Cloud.';

            setSimState(prev => ({
              ...prev,
              step: 'completed',
              progress: 100,
              activeNode: isCurrentlyOffline ? 'storage' : 'cloud',
              logMessage: `Success! ${uploadMsg}`
            }));

            // Update Hub & Evidence state
            if (isCurrentlyOffline) {
              setHubs(prev => prev.map(h => h.id === activeHubId ? { ...h, queuedRecordsCount: h.queuedRecordsCount + 1 } : h));
            } else {
              setHardwareEvidenceCountToday(c => c + 1);
            }

            // Update Trainee practical status
            setTrainee(prev => ({
              ...prev,
              practicalStatus: 'captured',
              practicalScore: 92
            }));

            // Add Audit Log
            const newLog: AuditLog = {
              id: `AUD-${Date.now().toString().slice(-4)}`,
              timestamp: new Date().toLocaleTimeString(),
              actor: 'Smart Hub Hardware (SCH-001)',
              action: 'Practical Evidence Package Generated',
              device: 'SCH-001',
              details: `Task #04 evidence captured for Arun Kumar. pH 6.72, Temp 28.4°C. Sync: ${isCurrentlyOffline ? 'LOCAL QUEUE' : 'CLOUD API'}.`,
              hash: '8f4c...71a3'
            };
            setAuditLogs(prev => [newLog, ...prev]);

          }, 1400);
        }, 1400);
      }, 1400);
    }, 1200);
  };

  const resetHardwareSimulation = () => {
    setSimState({
      step: 'idle',
      livePh: 6.72,
      liveTemp: 28.4,
      liveConductivity: 4.82,
      progress: 0,
      activeNode: null,
      logMessage: 'Hub in standby mode. Place trainee QR code in front of scanner to begin.'
    });
  };

  const approveTrainerSkill = (remarks: string) => {
    setEvidence(prev => ({
      ...prev,
      trainerApproved: true,
      trainerRemarks: remarks || 'Practical milk testing methodology verified compliant with NCCT standards.'
    }));

    setTrainee(prev => ({
      ...prev,
      practicalStatus: 'verified',
      overallCompetency: 88,
      credentialIssued: true
    }));

    const newLog: AuditLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      actor: 'Chief Master Trainer',
      action: 'Trainer Competency Approval',
      device: 'Trainer Portal',
      details: 'Practical skill verified at 88% overall competency score. Digital credential generated.',
      hash: '77ae...bb43'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const requestReassessment = () => {
    setEvidence(prev => ({
      ...prev,
      trainerApproved: false,
      trainerRemarks: 'Re-assessment requested by trainer: please recalibrate pH buffer solution and re-test sample.'
    }));
    setTrainee(prev => ({
      ...prev,
      practicalStatus: 'in_progress',
      credentialIssued: false
    }));
  };

  const generateCredential = () => {
    setCredential({
      ...INITIAL_CREDENTIAL,
      issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    });
    setTrainee(prev => ({ ...prev, credentialIssued: true }));
  };

  // Guided Demo Navigation
  const startGuidedDemo = () => {
    setGuidedDemoActive(true);
    setGuidedDemoStep(0);
    const firstStep = DEMO_STEPS[0];
    setActiveTab(firstStep.tab);
    setCurrentRole(firstStep.role);
  };

  const nextDemoStep = () => {
    if (guidedDemoStep < DEMO_STEPS.length - 1) {
      const nextIdx = guidedDemoStep + 1;
      setGuidedDemoStep(nextIdx);
      const step = DEMO_STEPS[nextIdx];
      setActiveTab(step.tab);
      setCurrentRole(step.role);

      // Auto trigger hardware simulation if step is 5
      if (nextIdx === 4) { // index 4 is step 5 (Hardware Simulation)
        runHardwareSimulation();
      }
    } else {
      setGuidedDemoActive(false);
    }
  };

  const prevDemoStep = () => {
    if (guidedDemoStep > 0) {
      const prevIdx = guidedDemoStep - 1;
      setGuidedDemoStep(prevIdx);
      const step = DEMO_STEPS[prevIdx];
      setActiveTab(step.tab);
      setCurrentRole(step.role);
    }
  };

  const stopGuidedDemo = () => {
    setGuidedDemoActive(false);
  };

  const resetAllToDefault = () => {
    localStorage.removeItem('skillcred_trainee');
    localStorage.removeItem('skillcred_hubs');
    localStorage.removeItem('skillcred_evidence');
    localStorage.removeItem('skillcred_credential');
    localStorage.removeItem('skillcred_audit');
    setTrainee(INITIAL_TRAINEE);
    setHubs(INITIAL_HUBS);
    setEvidence(INITIAL_EVIDENCE);
    setCredential(INITIAL_CREDENTIAL);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setHardwareEvidenceCountToday(186);
    resetHardwareSimulation();
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentRole,
        setCurrentRole,
        selectedLanguage,
        setSelectedLanguage,
        trainee,
        setTrainee,
        programmes,
        selectedProgrammeId,
        setSelectedProgrammeId,
        lmsCourses,
        hubs,
        activeHubId,
        setActiveHubId,
        isOfflineSimulated,
        toggleOfflineMode,
        restoreConnectivity,
        changeActiveKit,
        evidence,
        credential,
        jobs,
        auditLogs,
        hardwareEvidenceCountToday,
        simState,
        runHardwareSimulation,
        resetHardwareSimulation,
        approveTrainerSkill,
        requestReassessment,
        generateCredential,
        guidedDemoActive,
        guidedDemoStep,
        startGuidedDemo,
        nextDemoStep,
        prevDemoStep,
        stopGuidedDemo,
        resetAllToDefault
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
