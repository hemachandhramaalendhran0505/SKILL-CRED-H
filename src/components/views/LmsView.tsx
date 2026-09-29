import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';
import { 
  BookOpen, 
  Play, 
  FileText, 
  CheckCircle, 
  Languages, 
  ArrowRight, 
  Clock, 
  HelpCircle,
  Cpu,
  Sparkles
} from 'lucide-react';

export const LmsView: React.FC = () => {
  const { 
    selectedLanguage, 
    setSelectedLanguage, 
    lmsCourses, 
    setActiveTab, 
    trainee,
    setTrainee 
  } = useApp();

  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(2); // Default to Module 3 (Milk Quality Testing)
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(true);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number>(1);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);

  const course = lmsCourses[0];
  const activeModule = course.modules[activeModuleIndex];

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' }
  ];

  const quizQuestion = {
    question: {
      en: 'What is the standard acceptable pH range for fresh raw bovine milk before cold bulk chilling?',
      hi: 'शीत थोक द्रवण से पूर्व ताजे गाय के दूध का मानक स्वीकार्य पीएच (pH) मान क्या होना चाहिए?',
      ta: 'மொத்தக் குளிரூட்டலுக்கு முன் புத்தம் புதிய பசும்பாலின் தரநிலையான pH அளவு என்ன?',
      mr: 'शीत संकलनापूर्वी ताज्या गाईच्या दुधाची प्रमाण स्वीकार्य पीएच (pH) पातळी काय असावी?'
    },
    options: [
      { text: 'pH 5.2 – 5.8 (High acidity/curdling)', correct: false },
      { text: 'pH 6.6 – 6.8 (Fresh raw milk optimal range)', correct: true },
      { text: 'pH 7.4 – 8.1 (Alkaline adulteration)', correct: false },
      { text: 'pH 8.5 – 9.0 (Caustic soda residue)', correct: false }
    ],
    explanation: 'Fresh raw cow milk naturally exhibits an amphoteric pH reaction typically ranging between 6.6 and 6.8 at 20°C–25°C. Lower values indicate lactic acid bacterial fermentation; higher values suggest mastitis or alkaline neutralizer adulteration.'
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Multilingual Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Multilingual LMS & Theory Portal
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500">Ministry of Cooperation Digital Academy</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            {course.title}
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Enrolled Trainee: <span className="font-semibold text-slate-900">{trainee.name}</span> ({trainee.rollNumber})
          </p>
        </div>

        {/* Language Selector Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start md:self-auto">
          <Languages className="w-4 h-4 text-slate-500 ml-2" />
          <div className="flex items-center gap-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  selectedLanguage === lang.code
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{lang.native}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress & Quick Stats Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div>
          <div className="text-xs text-slate-500 font-medium">LMS Course Progress</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="font-bold text-sm text-slate-900 font-mono tabular-nums">{course.progress}%</span>
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-500 font-medium">Assessment Score</div>
          <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
            84% <span className="text-xs font-normal text-emerald-600 font-sans font-medium">(Qualified)</span>
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-500 font-medium">Language Mode</div>
          <div className="text-xs font-semibold text-indigo-700 mt-1 flex items-center gap-1">
            <span>{languages.find(l => l.code === selectedLanguage)?.label}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600">Audio/Script Synced</span>
          </div>
        </div>

        {/* CRITICAL CTA CONNECTING LMS TO HARDWARE */}
        <div className="flex justify-end">
          <button
            onClick={() => setActiveTab('smart_hub')}
            className="w-full md:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Cpu className="w-4 h-4" />
            <span>Proceed to Practical Skill Task →</span>
          </button>
        </div>
      </div>

      {/* Main LMS View: Video + Lesson Content & Module List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Video Lecture & Interactive Reading */}
        <div className="lg:col-span-2 space-y-4">
          {/* Simulated Video Player */}
          <div className="bg-slate-950 rounded-xl overflow-hidden shadow-md border border-slate-800">
            <div className="relative aspect-video bg-gradient-to-tr from-slate-900 via-indigo-950/60 to-slate-900 flex flex-col justify-between p-6">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="bg-indigo-600/90 text-white px-2 py-0.5 rounded font-mono text-[11px]">
                  LECTURE 3.2
                </span>
                <span className="text-[11px] text-slate-400">NCCT Laboratory Protocols</span>
              </div>

              {/* Center Play Button & Graphic */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/30 cursor-pointer hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
                <div className="text-white font-bold text-sm tracking-wide">
                  {activeModule.title[selectedLanguage]}
                </div>
                <div className="text-xs text-slate-300">
                  Master Trainer demonstration with calibrated digital pH and lactometer sensors
                </div>
              </div>

              {/* Progress bar and time */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-1.5 w-3/4 rounded-full"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>14:32</span>
                  <span>18:45</span>
                </div>
              </div>
            </div>
          </div>

          {/* Theory Material & Lab Rubric */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Practical Guidelines & Testing Procedures</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">{activeModule.duration}</span>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed space-y-2.5">
              <p>
                In cooperative dairy societies, ensuring milk freshness prior to bulk chilling prevents 
                spoilage and ensures fair farmer payment. Under NCCT standards, each batch is tested for:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li><strong className="text-slate-800">pH Level:</strong> Must register between 6.6 and 6.8. Values &lt; 6.6 imply acidity due to lactic souring.</li>
                <li><strong className="text-slate-800">Sample Temperature:</strong> Freshly collected milk should be tested around 25°C–28°C for accurate probe conductivity.</li>
                <li><strong className="text-slate-800">Probe Sanitization:</strong> The digital pH sensor tip must be rinsed with distilled water before immersion.</li>
              </ul>
            </div>

            {/* Quiz Preview Widget */}
            <div className="p-4 rounded-lg bg-indigo-50/60 border border-indigo-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-700" />
                  <span className="text-xs font-bold text-indigo-950">
                    Module 3 Knowledge Check
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Score: 92% (Passed)
                </span>
              </div>

              <div className="text-xs text-slate-800 font-medium">
                {quizQuestion.question[selectedLanguage]}
              </div>

              <div className="space-y-1.5">
                {quizQuestion.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded text-xs flex items-center justify-between border ${
                      opt.correct 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium' 
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {opt.correct && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded border border-indigo-100 leading-normal">
                <strong className="text-indigo-900">Standard Norm:</strong> {quizQuestion.explanation}
              </div>
            </div>

            {/* Hardware Link CTA */}
            <div className="p-4 bg-slate-900 text-white rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Ready For Practical Evaluation
                </div>
                <div className="text-xs text-slate-200 mt-0.5">
                  Theory verified. Now proceed to physical testing on the Smart Hub (SCH-001).
                </div>
              </div>
              <button
                onClick={() => setActiveTab('smart_hub')}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
              >
                Go to Smart Hub →
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Course Modules Syllabus */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Course Syllabus (5 Modules)
              </h3>
              <span className="text-xs text-slate-500 font-mono">4 Completed</span>
            </div>

            <div className="space-y-2">
              {course.modules.map((mod, idx) => {
                const isCurrent = idx === activeModuleIndex;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModuleIndex(idx)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      isCurrent
                        ? 'bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">
                        Module 0{idx + 1}
                      </span>
                      {mod.completed ? (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                          <CheckCircle className="w-3 h-3" />
                          <span>Done</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">In Progress</span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                      {mod.title[selectedLanguage]}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>{mod.duration}</span>
                      {mod.quizScore && (
                        <span className="font-mono text-indigo-700 font-medium">Quiz: {mod.quizScore}%</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Module 3 Hardware Requirement Card */}
          <div className="bg-indigo-900 text-white p-5 rounded-xl space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                Hardware Prerequisite
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Completing the online module qualifies the trainee to unlock <strong className="text-white">Practical Task #04</strong> on the physical <em>SkillCred Smart Hub</em>.
            </p>
            <div className="text-[11px] text-indigo-200 bg-indigo-950/60 p-2.5 rounded border border-indigo-800">
              ✓ Identity verification via QR<br />
              ✓ pH Probe & Temperature Kit calibrated<br />
              ✓ Edge photo evidence requirement active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
