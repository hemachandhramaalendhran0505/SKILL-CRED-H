import { 
  Trainee, 
  TrainingProgramme, 
  LmsCourse, 
  SmartHubDevice, 
  PracticalEvidence, 
  DigitalCredential, 
  JobOpening,
  AuditLog 
} from '../types';

export const INITIAL_TRAINEE: Trainee = {
  id: 'TRN-2026-084',
  name: 'Arun Kumar',
  rollNumber: 'RICM-CHE-DCM-042',
  avatar: '/src/assets/images/trainee_arun_avatar_1790652622787.jpg',
  institution: 'Regional Institute of Cooperative Management (RICM), Chennai',
  programmeId: 'PRG-DCM-01',
  programmeName: 'Dairy Cooperative Management & Milk Quality Processing',
  batchId: 'BATCH-2026-B3',
  lmsProgress: 88,
  assessmentScore: 84,
  practicalStatus: 'verified',
  practicalScore: 92,
  overallCompetency: 88,
  credentialIssued: true,
  credentialId: 'SC-NCCT-2026-001284',
  district: 'Coimbatore',
  state: 'Tamil Nadu'
};

export const INITIAL_PROGRAMMES: TrainingProgramme[] = [
  {
    id: 'PRG-DCM-01',
    title: 'Dairy Cooperative Management',
    code: 'NCCT-DCM-30D',
    institution: 'Regional Institute of Cooperative Management, Chennai',
    durationDays: 30,
    totalBatches: 4,
    activeTrainees: 48,
    category: 'Dairy Operations & Processing',
    skillKit: 'dairy_kit',
    description: 'Comprehensive capacity building program covering milk procurement, laboratory testing standards, cold-chain logistics, and digital cooperative accounting.',
    completionRate: 87
  },
  {
    id: 'PRG-AGR-02',
    title: 'PACS Precision Agriculture & Soil Health',
    code: 'NCCT-AGR-21D',
    institution: 'Vaikunth Mehta National Institute (VAMNICOM), Pune',
    durationDays: 21,
    totalBatches: 6,
    activeTrainees: 72,
    category: 'Agricultural Cooperatives',
    skillKit: 'agri_kit',
    description: 'Practical soil sensor diagnostics, micro-irrigation scheduling, fertilizer rationing, and cooperative crop yield optimization.',
    completionRate: 91
  },
  {
    id: 'PRG-PACS-03',
    title: 'Digital PACS Operations & ERP Management',
    code: 'NCCT-PACS-14D',
    institution: 'Institute of Cooperative Management (ICM), Bengaluru',
    durationDays: 14,
    totalBatches: 8,
    activeTrainees: 96,
    category: 'Cooperative Banking & PACS',
    skillKit: 'pacs_kit',
    description: 'Computerized loan disbursements, Aadhaar-enabled biometric validation, DBT settlement, and digital audit trail reconciliation.',
    completionRate: 94
  }
];

export const INITIAL_LMS_COURSES: LmsCourse[] = [
  {
    id: 'CRS-DCM-101',
    programmeId: 'PRG-DCM-01',
    title: 'Dairy Cooperative Management & Practical Quality Protocols',
    progress: 88,
    modules: [
      {
        id: 'MOD-01',
        title: {
          en: 'Cooperative Fundamentals & Primary Dairy Societies',
          hi: 'सहकारी सिद्धांत एवं प्राथमिक दुग्ध समितियाँ',
          ta: 'கூட்டுறவு அடிப்படைகள் மற்றும் தொடக்க பால் சங்கங்கள்',
          mr: 'सहकारी तत्त्वे आणि प्राथमिक दूध संस्था'
        },
        duration: '45 mins',
        completed: true,
        hasQuiz: true,
        quizScore: 90
      },
      {
        id: 'MOD-02',
        title: {
          en: 'Milk Procurement & Cold-Chain Management',
          hi: 'दुग्ध अधिप्राप्ति एवं कोल्ड-चेन प्रबंधन',
          ta: 'பால் கொள்முதல் மற்றும் குளிர்பதன சங்கிலி மேலாண்மை',
          mr: 'दूध संकलन आणि शीत-साखळी व्यवस्थापन'
        },
        duration: '60 mins',
        completed: true,
        hasQuiz: true,
        quizScore: 85
      },
      {
        id: 'MOD-03',
        title: {
          en: 'Milk Quality Testing & Laboratory Bench Standards',
          hi: 'दूध गुणवत्ता परीक्षण और प्रयोगशाला मानक',
          ta: 'பால் தரப் பரிசோதனை மற்றும் ஆய்வக நெறிமுறைகள்',
          mr: 'दूध गुणवत्ता चाचणी आणि प्रयोगशाळा मानके'
        },
        duration: '75 mins',
        completed: true,
        hasQuiz: true,
        quizScore: 92
      },
      {
        id: 'MOD-04',
        title: {
          en: 'Digital Record Management & ERP for Cooperatives',
          hi: 'सहकारिता हेतु डिजिटल रिकॉर्ड प्रबंधन एवं ईआरपी',
          ta: 'கூட்டுறவுகளுக்கான டிஜிட்டல் பதிவேடு மற்றும் ஈஆர்பி',
          mr: 'सहकारी संस्थांसाठी डिजिटल नोंदी आणि ईआरपी'
        },
        duration: '50 mins',
        completed: true,
        hasQuiz: true,
        quizScore: 88
      },
      {
        id: 'MOD-05',
        title: {
          en: 'Cooperative Entrepreneurship & Producer Governance',
          hi: 'सहकारी उद्यमिता एवं उत्पादक शासन प्रणाली',
          ta: 'கூட்டுறவு தொழில்முனைவு மற்றும் உற்பத்தியாளர் நிர்வாகம்',
          mr: 'सहकारी उद्योजकता आणि उत्पादक प्रशासन'
        },
        duration: '40 mins',
        completed: false,
        hasQuiz: true
      }
    ]
  }
];

export const INITIAL_HUBS: SmartHubDevice[] = [
  {
    id: 'SCH-001',
    name: 'Smart Skill Verification Hub #01',
    institution: 'RICM Chennai — Dairy Quality Lab',
    location: 'Lab Room 204, Dairy Tech Section',
    firmwareVersion: 'v1.4.2-edge',
    status: 'online',
    activeKit: 'dairy_kit',
    batteryLevel: 82,
    storageUsagePct: 68,
    queuedRecordsCount: 0,
    lastSyncTimestamp: '2 mins ago',
    ipAddress: '192.168.1.105',
    esp32Status: 'connected',
    cameraStatus: 'ready',
    qrScannerStatus: 'ready'
  },
  {
    id: 'SCH-002',
    name: 'Smart Skill Verification Hub #02',
    institution: 'VAMNICOM Pune — Agri Tech Workshop',
    location: 'Precision Agri Bay 3',
    firmwareVersion: 'v1.4.2-edge',
    status: 'online',
    activeKit: 'agri_kit',
    batteryLevel: 94,
    storageUsagePct: 42,
    queuedRecordsCount: 0,
    lastSyncTimestamp: 'Just now',
    ipAddress: '192.168.1.118',
    esp32Status: 'connected',
    cameraStatus: 'ready',
    qrScannerStatus: 'ready'
  },
  {
    id: 'SCH-003',
    name: 'Smart Skill Verification Hub #03 (Rural Offline Station)',
    institution: 'RICM Gandhinagar — Field Outreach',
    location: 'Rural PACS Training Center, Anand',
    firmwareVersion: 'v1.4.2-edge',
    status: 'offline',
    activeKit: 'pacs_kit',
    batteryLevel: 76,
    storageUsagePct: 81,
    queuedRecordsCount: 12,
    lastSyncTimestamp: '3 hours ago (Offline Queued)',
    ipAddress: '10.0.4.52',
    esp32Status: 'connected',
    cameraStatus: 'ready',
    qrScannerStatus: 'ready'
  }
];

export const INITIAL_EVIDENCE: PracticalEvidence = {
  id: 'EVD-2026-9812',
  taskId: 'TSK-DCM-04',
  taskTitle: 'Perform Basic Milk Quality & Acidity Assessment',
  traineeId: 'TRN-2026-084',
  traineeName: 'Arun Kumar',
  deviceId: 'SCH-001',
  timestamp: '2026-09-28 10:42:15 IST',
  sensorReadings: {
    ph: 6.72,
    temperature: 28.4,
    conductivity: 4.82,
    timestamp: '2026-09-28 10:42:15'
  },
  cameraImageUrl: '/src/assets/images/milk_testing_evidence_1790652651587.jpg',
  qrVerified: true,
  edgeHash: 'sha256:8f4c71a399b2e04de768bc28dfa503a9f04523bb871a2e9942a784c5021e892b',
  syncStatus: 'synced_cloud',
  aiQualityScore: 92,
  aiConsistencyScore: 89,
  aiRecommendation: 'recommend_approval',
  trainerApproved: true,
  trainerRemarks: 'Candidate showed proper calibration procedure, accurate reading within acceptable raw milk freshness threshold (pH 6.6-6.8), and clean laboratory sanitization protocol.'
};

export const INITIAL_CREDENTIAL: DigitalCredential = {
  id: 'CRD-2026-001284',
  credentialId: 'SC-NCCT-2026-001284',
  traineeId: 'TRN-2026-084',
  traineeName: 'Arun Kumar',
  traineeAvatar: '/src/assets/images/trainee_arun_avatar_1790652622787.jpg',
  skillName: 'Milk Quality Testing & Acidity Bench Diagnostics',
  programmeName: 'Dairy Cooperative Management',
  institution: 'National Council for Cooperative Training (NCCT) / RICM Chennai',
  issueDate: '28 September 2026',
  competencyScore: 88,
  scoreBreakdown: {
    practical: 40,   // out of 40 (got 37)
    assessment: 25,  // out of 30 (got 25)
    trainer: 18,     // out of 20 (got 18)
    learning: 8      // out of 10 (got 8)
  },
  evidenceHash: 'sha256:8f4c71a399b2e04de768bc28dfa503a9f04523bb871a2e9942a784c5021e892b',
  verifiedBy: 'Dr. S. Ranganathan, Chief Master Trainer (RICM)',
  qrCodeValue: 'https://skillcred.ncct.gov.in/verify/SC-NCCT-2026-001284',
  status: 'valid'
};

export const INITIAL_JOBS: JobOpening[] = [
  {
    id: 'JOB-AMUL-01',
    title: 'Dairy Field Quality Technician',
    organization: 'Gujarat Cooperative Milk Marketing Federation (Amul)',
    type: 'Full-time · Cooperative Society Tier',
    location: 'Coimbatore District, TN',
    vacancies: 6,
    salaryRange: '₹28,000 - ₹34,000 / month',
    requiredSkills: [
      'Milk Quality Testing',
      'Digital Record Management',
      'Cold Chain Maintenance',
      'Basic Cooperative Operations'
    ],
    matchedCandidates: [
      {
        traineeId: 'TRN-2026-084',
        traineeName: 'Arun Kumar',
        matchScore: 94,
        skillsVerified: [
          'Milk Quality Testing (Practical Verified)',
          'Digital Record Management (LMS + Assessment)',
          'Basic Cooperative Operations'
        ],
        hasHardwareEvidence: true
      },
      {
        traineeId: 'TRN-2026-092',
        traineeName: 'Priya M.',
        matchScore: 88,
        skillsVerified: [
          'Milk Quality Testing',
          'Cooperative ERP Operations'
        ],
        hasHardwareEvidence: true
      },
      {
        traineeId: 'TRN-2026-105',
        traineeName: 'Rahul S.',
        matchScore: 84,
        skillsVerified: [
          'Dairy Operations',
          'Milk Quality Testing'
        ],
        hasHardwareEvidence: true
      }
    ]
  },
  {
    id: 'JOB-KMF-02',
    title: 'Bulk Milk Chilling (BMC) Center Operator',
    organization: 'Karnataka Milk Federation (KMF Nandini)',
    type: 'Full-time · Processing Plant',
    location: 'Mysuru, Karnataka',
    vacancies: 4,
    salaryRange: '₹26,000 - ₹32,000 / month',
    requiredSkills: [
      'Milk Quality Testing',
      'Lactometer & pH Probe Diagnostics',
      'Sensor Calibration',
      'PACS Supply Logistics'
    ],
    matchedCandidates: [
      {
        traineeId: 'TRN-2026-084',
        traineeName: 'Arun Kumar',
        matchScore: 91,
        skillsVerified: ['Milk Quality Testing', 'Sensor Calibration'],
        hasHardwareEvidence: true
      }
    ]
  },
  {
    id: 'JOB-AAVIN-03',
    title: 'Primary Cooperative Society Auditor & Field Executive',
    organization: 'Tamil Nadu Co-operative Milk Producers (Aavin)',
    type: 'Full-time · District Union',
    location: 'Salem & Erode, Tamil Nadu',
    vacancies: 8,
    salaryRange: '₹30,000 - ₹38,000 / month',
    requiredSkills: [
      'Digital PACS Operations',
      'Milk Quality Standards',
      'Farmer Settlement Auditing'
    ],
    matchedCandidates: [
      {
        traineeId: 'TRN-2026-084',
        traineeName: 'Arun Kumar',
        matchScore: 87,
        skillsVerified: ['Milk Quality Testing', 'Digital Records'],
        hasHardwareEvidence: true
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-09-28 10:41:02',
    actor: 'Smart Hub Hardware (SCH-001)',
    action: 'Trainee QR Scanned & Identity Confirmed',
    device: 'SCH-001',
    details: 'Arun Kumar (RICM-CHE-DCM-042) checked in for Practical Task #04 via optical reader.',
    hash: '8f4c...71a3'
  },
  {
    id: 'AUD-002',
    timestamp: '2026-09-28 10:42:15',
    actor: 'Edge Controller ESP32-S3',
    action: 'Sensor Telemetry Captured',
    device: 'SCH-001',
    details: 'Telemetry logged: pH 6.72, Temp 28.4°C, Conductivity 4.82 mS/cm. Hardware snapshot stored.',
    hash: 'b12c...99de'
  },
  {
    id: 'AUD-003',
    timestamp: '2026-09-28 10:43:08',
    actor: 'Edge Compute Module (Raspberry Pi 5)',
    action: 'Cryptographic Hash Package Generated',
    device: 'SCH-001',
    details: 'Signed telemetry payload with SHA-256 edge key; payload queued for cloud sync.',
    hash: '54ea...01fa'
  },
  {
    id: 'AUD-004',
    timestamp: '2026-09-28 10:45:30',
    actor: 'AI Competency Analyzer',
    action: 'Automated Evidence Consistency Check',
    device: 'SkillCred Cloud Server',
    details: 'Consistency score: 89%, Quality score: 92%. Sensor limits verified within dairy benchmark.',
    hash: '90cd...8412'
  },
  {
    id: 'AUD-005',
    timestamp: '2026-09-28 11:02:18',
    actor: 'Dr. S. Ranganathan (Trainer)',
    action: 'Trainer Competency Approved & Certified',
    device: 'Trainer Portal',
    details: 'Final competency approved at 88%. Digital credential SC-NCCT-2026-001284 minted.',
    hash: '77ae...bb43'
  },
  {
    id: 'AUD-006',
    timestamp: '2026-09-28 11:30:45',
    actor: 'Amul Recruiter Agent',
    action: 'Credential & Hardware Evidence Verified',
    device: 'Recruiter Portal',
    details: 'Verified cryptographic proof and raw sensor readings for candidate Arun Kumar.',
    hash: '22ee...dd91'
  }
];
