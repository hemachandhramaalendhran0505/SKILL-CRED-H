export type UserRole = 'trainee' | 'trainer' | 'admin' | 'recruiter' | 'ncct_admin';

export type NavigationTab = 
  | 'overview' 
  | 'training_erp' 
  | 'lms' 
  | 'smart_hub' 
  | 'practical_tasks' 
  | 'skill_verification' 
  | 'credentials' 
  | 'recruiters' 
  | 'job_matching' 
  | 'analytics';

export type LanguageCode = 'en' | 'hi' | 'ta' | 'mr';

export type SkillKitType = 'dairy_kit' | 'agri_kit' | 'pacs_kit';

export interface Trainee {
  id: string;
  name: string;
  rollNumber: string;
  avatar: string;
  institution: string;
  programmeId: string;
  programmeName: string;
  batchId: string;
  lmsProgress: number; // 0 - 100
  assessmentScore: number; // 0 - 100
  practicalStatus: 'pending' | 'in_progress' | 'captured' | 'verified';
  practicalScore: number; // 0 - 100
  overallCompetency: number; // 0 - 100
  credentialIssued: boolean;
  credentialId?: string;
  district: string;
  state: string;
}

export interface TrainingProgramme {
  id: string;
  title: string;
  code: string;
  institution: string;
  durationDays: number;
  totalBatches: number;
  activeTrainees: number;
  category: string;
  skillKit: SkillKitType;
  description: string;
  completionRate: number;
}

export interface LmsCourse {
  id: string;
  programmeId: string;
  title: string;
  progress: number;
  modules: {
    id: string;
    title: { [key in LanguageCode]: string };
    duration: string;
    completed: boolean;
    hasQuiz: boolean;
    quizScore?: number;
  }[];
}

export interface SmartHubDevice {
  id: string; // SCH-001
  name: string;
  institution: string;
  location: string;
  firmwareVersion: string;
  status: 'online' | 'offline' | 'busy' | 'syncing';
  activeKit: SkillKitType;
  batteryLevel: number;
  storageUsagePct: number;
  queuedRecordsCount: number;
  lastSyncTimestamp: string;
  ipAddress: string;
  esp32Status: 'connected' | 'error';
  cameraStatus: 'ready' | 'streaming' | 'offline';
  qrScannerStatus: 'ready' | 'scanned';
}

export interface SensorReading {
  ph: number;
  temperature: number;
  conductivity?: number;
  soilMoisture?: number;
  ambientHumidity?: number;
  timestamp: string;
}

export interface PracticalEvidence {
  id: string;
  taskId: string;
  taskTitle: string;
  traineeId: string;
  traineeName: string;
  deviceId: string;
  timestamp: string;
  sensorReadings: SensorReading;
  cameraImageUrl: string;
  qrVerified: boolean;
  edgeHash: string;
  syncStatus: 'queued_local' | 'synced_cloud';
  aiQualityScore: number;
  aiConsistencyScore: number;
  aiRecommendation: 'recommend_approval' | 'needs_retest';
  trainerApproved: boolean;
  trainerRemarks?: string;
}

export interface DigitalCredential {
  id: string;
  credentialId: string; // e.g. SC-NCCT-2026-001284
  traineeId: string;
  traineeName: string;
  traineeAvatar: string;
  skillName: string;
  programmeName: string;
  institution: string;
  issueDate: string;
  competencyScore: number;
  scoreBreakdown: {
    practical: number;
    assessment: number;
    trainer: number;
    learning: number;
  };
  evidenceHash: string;
  verifiedBy: string;
  qrCodeValue: string;
  status: 'valid' | 'revoked';
}

export interface JobOpening {
  id: string;
  title: string;
  organization: string;
  type: string;
  location: string;
  vacancies: number;
  requiredSkills: string[];
  salaryRange: string;
  matchedCandidates: {
    traineeId: string;
    traineeName: string;
    matchScore: number;
    skillsVerified: string[];
    hasHardwareEvidence: boolean;
  }[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  device: string;
  details: string;
  hash: string;
}
