import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Cpu, 
  Camera, 
  QrCode, 
  Wifi, 
  WifiOff, 
  Battery, 
  HardDrive, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  Layers, 
  Server, 
  ArrowRight,
  RefreshCw,
  Info,
  Radio,
  Sliders
} from 'lucide-react';

export const SmartHubView: React.FC = () => {
  const { 
    hubs, 
    activeHubId, 
    isOfflineSimulated, 
    toggleOfflineMode, 
    restoreConnectivity,
    simState,
    runHardwareSimulation,
    resetHardwareSimulation,
    trainee,
    setActiveTab,
    changeActiveKit
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'terminal' | 'chassis' | 'data_flow'>('terminal');

  const activeHub = hubs.find(h => h.id === activeHubId) || hubs[0];

  const flowNodes = [
    { id: 'sensor', label: 'Modular Sensor', sub: 'pH & Temp Probe', active: simState.activeNode === 'sensor' },
    { id: 'esp32', label: 'ESP32-S3', sub: 'Microcontroller Bus', active: simState.activeNode === 'esp32' },
    { id: 'rpi', label: 'Raspberry Pi 5', sub: 'Edge Single Board Computer', active: simState.activeNode === 'rpi' },
    { id: 'edge', label: 'Edge Processing', sub: 'HMAC & SHA-256 Signature', active: simState.activeNode === 'edge' },
    { id: 'storage', label: 'Local SQLite Queue', sub: 'Offline-First Storage', active: simState.activeNode === 'storage' },
    { id: 'cloud', label: 'SkillCred Cloud API', sub: 'HTTPS / MQTT Gateway', active: simState.activeNode === 'cloud' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Hardware Identification */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              IoT Edge Verification Station
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-mono">SCH-001 / RICM Chennai Lab</span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-medium">
              Firmware v1.4.2-edge
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            SkillCred Smart Skill Verification Hub
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Hardware-assisted evidence capture transforming training attendance into authentic proof of skill.
          </p>
        </div>

        {/* Global Hardware Mode Controls */}
        <div className="flex items-center gap-2.5">
          {/* Offline Toggle */}
          <button
            onClick={toggleOfflineMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
              isOfflineSimulated
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isOfflineSimulated ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>Simulate Offline: Active</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulate Offline Mode</span>
              </>
            )}
          </button>

          {/* Sync button if records queued */}
          {activeHub.queuedRecordsCount > 0 && (
            <button
              onClick={restoreConnectivity}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restore & Sync ({activeHub.queuedRecordsCount})</span>
            </button>
          )}

          {/* Run Hardware Simulator */}
          <button
            onClick={runHardwareSimulation}
            disabled={simState.step !== 'idle' && simState.step !== 'completed'}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-xs transition-all hover:scale-[1.02]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>
              {simState.step === 'idle' 
                ? 'Run Verification Simulation' 
                : simState.step === 'completed' 
                ? 'Re-Run Simulation' 
                : 'Processing Hardware...'}
            </span>
          </button>

          {simState.step !== 'idle' && (
            <button
              onClick={resetHardwareSimulation}
              className="p-2 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600"
              title="Reset Hardware State"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Hardware Telemetry Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-sm grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
        <div>
          <div className="text-slate-400 text-[11px]">HUB ID</div>
          <div className="font-bold text-white font-mono mt-0.5">{activeHub.id}</div>
        </div>

        <div>
          <div className="text-slate-400 text-[11px]">HARDWARE STATUS</div>
          <div className="font-semibold flex items-center gap-1.5 mt-0.5">
            <span className={`w-2 h-2 rounded-full ${isOfflineSimulated ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            <span className={isOfflineSimulated ? 'text-amber-300' : 'text-emerald-300'}>
              {isOfflineSimulated ? 'OFFLINE (QUEUED)' : 'ONLINE'}
            </span>
          </div>
        </div>

        <div>
          <div className="text-slate-400 text-[11px]">CONNECTED SENSOR</div>
          <div className="font-semibold text-indigo-300 mt-0.5 truncate">
            Milk Quality Kit (pH & Temp)
          </div>
        </div>

        <div>
          <div className="text-slate-400 text-[11px]">LIVE pH READING</div>
          <div className="font-bold text-white font-mono mt-0.5 text-sm tabular-nums">
            {simState.livePh} <span className="text-[10px] text-emerald-400 font-normal">Normal</span>
          </div>
        </div>

        <div>
          <div className="text-slate-400 text-[11px]">LIVE TEMPERATURE</div>
          <div className="font-bold text-white font-mono mt-0.5 text-sm tabular-nums">
            {simState.liveTemp}°C
          </div>
        </div>

        <div>
          <div className="text-slate-400 text-[11px]">LOCAL STORAGE</div>
          <div className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1">
            <HardDrive className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono">{activeHub.storageUsagePct}% ({activeHub.queuedRecordsCount} queued)</span>
          </div>
        </div>

        <div>
          <div className="text-slate-400 text-[11px]">EDGE BATTERY</div>
          <div className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1">
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono">{activeHub.batteryLevel}% (LiFePO4)</span>
          </div>
        </div>
      </div>

      {/* Sub navigation for Hardware view */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTabSub('terminal')}
          className={`py-2 px-3 border-b-2 transition-colors ${
            activeTabSub === 'terminal' 
              ? 'border-indigo-600 text-indigo-700' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Interactive Hub Simulator & Camera Frame
        </button>
        <button
          onClick={() => setActiveTabSub('chassis')}
          className={`py-2 px-3 border-b-2 transition-colors ${
            activeTabSub === 'chassis' 
              ? 'border-indigo-600 text-indigo-700' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Physical Chassis Architecture & Labeled Diagram
        </button>
        <button
          onClick={() => setActiveTabSub('data_flow')}
          className={`py-2 px-3 border-b-2 transition-colors ${
            activeTabSub === 'data_flow' 
              ? 'border-indigo-600 text-indigo-700' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Edge-to-Cloud Technical Data Flow
        </button>
      </div>

      {/* Content for Active SubTab */}
      {activeTabSub === 'terminal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Simulated Hardware Touchscreen Terminal (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* The Physical Device Screen Container */}
            <div className="bg-slate-950 rounded-2xl p-5 border-4 border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
              {/* Device Status Bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono font-bold text-slate-200">SKILLCRED VERIFICATION TERMINAL</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span>MODE: PRACTICAL TASK</span>
                  <span>{isOfflineSimulated ? 'OFFLINE' : 'ONLINE'}</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-4 min-h-[300px] flex flex-col justify-between">
                {/* Active Step Indicator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-indigo-400 uppercase tracking-wider">
                      Current Pipeline Phase:
                    </span>
                    <span className="text-white font-mono font-bold">
                      {simState.step.toUpperCase().replace('_', ' ')}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${simState.progress}%` }}
                    />
                  </div>
                </div>

                {/* Main Interactive Screen Content */}
                <div className="space-y-3 py-2">
                  {simState.step === 'idle' && (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-indigo-400">
                        <QrCode className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          Ready for Practical Task Evaluation
                        </div>
                        <div className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                          Present trainee QR identification card to the optical scanner or tap NFC badge.
                        </div>
                      </div>
                      <button
                        onClick={runHardwareSimulation}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Simulate Trainee QR Scan (Arun Kumar)</span>
                      </button>
                    </div>
                  )}

                  {simState.step === 'scanning_qr' && (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-indigo-900/60 border border-indigo-500/50 flex items-center justify-center mx-auto text-indigo-300 animate-spin">
                        <Camera className="w-8 h-8" />
                      </div>
                      <div className="text-sm font-bold text-indigo-200 font-mono">
                        SCANNING OPTICAL CODE...
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        Hardware Reader reading QR string: RICM-CHE-DCM-042
                      </div>
                    </div>
                  )}

                  {(simState.step === 'trainee_identified' || 
                    simState.step === 'measuring_sensors' || 
                    simState.step === 'capturing_evidence' || 
                    simState.step === 'completed') && (
                    <div className="space-y-3">
                      {/* Trainee Badge on Screen */}
                      <div className="bg-slate-800/90 rounded-lg p-3 border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={trainee.avatar}
                            alt={trainee.name}
                            className="w-10 h-10 rounded-full object-cover border border-indigo-400"
                          />
                          <div>
                            <div className="text-xs font-bold text-white">{trainee.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{trainee.rollNumber}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-semibold border border-emerald-500/30">
                            IDENTITY VERIFIED
                          </span>
                          <div className="text-[10px] text-slate-400 mt-1">Dairy Mgmt Batch B3</div>
                        </div>
                      </div>

                      {/* Active Task Card */}
                      <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-200">
                            PRACTICAL TASK #04: Milk Quality & Acidity Assessment
                          </span>
                          <span className="text-[11px] font-mono text-indigo-400">
                            Time: 10:42:15
                          </span>
                        </div>

                        {/* Live Sensor Meters */}
                        <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                          <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-center">
                            <div className="text-[10px] text-slate-400">pH Probe</div>
                            <div className="text-base font-bold text-white mt-0.5 tabular-nums">
                              {simState.livePh}
                            </div>
                            <div className="text-[9px] text-emerald-400">Fresh (6.6-6.8)</div>
                          </div>

                          <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-center">
                            <div className="text-[10px] text-slate-400">Temp Probe</div>
                            <div className="text-base font-bold text-white mt-0.5 tabular-nums">
                              {simState.liveTemp}°C
                            </div>
                            <div className="text-[9px] text-slate-400">Ambient Milk</div>
                          </div>

                          <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-center">
                            <div className="text-[10px] text-slate-400">Conductivity</div>
                            <div className="text-base font-bold text-white mt-0.5 tabular-nums">
                              {simState.liveConductivity}
                            </div>
                            <div className="text-[9px] text-slate-400">mS/cm</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hardware Console Log Ticker */}
                <div className="bg-black/50 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 shrink-0 text-emerald-500 animate-pulse" />
                  <span className="truncate">{simState.logMessage}</span>
                </div>
              </div>

              {/* Hardware Device Badge Footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Core: Broadcom BCM2712 (RPi 5) + Espressif ESP32-S3</span>
                <span>Storage: 64GB Industrial eMMC</span>
              </div>
            </div>

            {/* Practical Task Instructions Checklist */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Hardware Practical Testing Rubric
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1. Trainee identified via QR/NFC</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2. Milk sensor probe connected</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3. Measure raw milk sample pH</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>4. Calibrate temperature sensor</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>5. High-res camera proof captured</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>6. Edge SHA-256 package signed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real-World Evidence Frame & Telemetry Proof (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live Camera Evidence Viewport */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold">Smart Hub Camera Evidence Frame</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400">1080p Optical Feed</span>
              </div>

              <div className="relative aspect-4/3 bg-slate-950 overflow-hidden">
                <img
                  src="/src/assets/images/milk_testing_evidence_1790652651587.jpg"
                  alt="Practical Milk Testing Evidence"
                  className="w-full h-full object-cover"
                />

                {/* Overlay Evidence HUD */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 p-3 flex flex-col justify-between text-white font-mono text-[11px]">
                  <div className="flex justify-between items-start">
                    <span className="bg-black/60 px-2 py-0.5 rounded border border-white/20">
                      FRAME #9812-EVD
                    </span>
                    <span className="bg-emerald-600/90 px-2 py-0.5 rounded font-bold text-[10px]">
                      PROBE IN SAMPLE
                    </span>
                  </div>

                  <div className="space-y-1 bg-black/70 p-2.5 rounded border border-white/20 backdrop-blur-xs text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">TRAINEE:</span>
                      <span className="text-white font-bold">{trainee.name} ({trainee.rollNumber})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">READINGS:</span>
                      <span className="text-emerald-300 font-bold">pH {simState.livePh} · Temp {simState.liveTemp}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">DEVICE:</span>
                      <span className="text-indigo-300">SCH-001 (RICM Chennai)</span>
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400 truncate pt-0.5 border-t border-slate-700">
                      <span>EDGE HASH:</span>
                      <span className="text-slate-300 truncate">sha256:8f4c...71a3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidence Status Footer */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    Evidence Verification Status:
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Captured & Signed</span>
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex justify-between">
                    <span>Identity Verified:</span>
                    <strong className="text-slate-900">QR Code (Arun Kumar)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Sensor Telemetry:</span>
                    <strong className="text-slate-900">Valid (pH 6.72, 28.4°C)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Edge Processing:</span>
                    <strong className="text-slate-900">Raspberry Pi 5 SHA-256</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cloud Sync:</span>
                    <strong className="text-indigo-700">
                      {isOfflineSimulated ? 'Queued in Local SQLite (#13)' : 'Synced to SkillCred Backend'}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('skill_verification')}
                  className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Proceed to AI & Trainer Verification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Offline Simulation Demo Card */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Rural Offline-First Capability (SIH Key Req)</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                Rural training labs often experience internet dropouts. SkillCred Smart Hub stores encrypted evidence packages in local SQLite storage. When network restores, the sync engine batches records automatically.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={toggleOfflineMode}
                  className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded font-semibold text-[11px] transition-colors"
                >
                  {isOfflineSimulated ? 'Reconnect Online' : 'Simulate Offline Mode'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content for Chassis SubTab */}
      {activeTabSub === 'chassis' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                SkillCred Smart Hub Hardware Architecture
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Custom industrial edge verification terminal designed for National Council for Cooperative Training (NCCT) institutes.
              </p>
            </div>

            {/* Hardware Product Photo with Labeled Overlays */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src="/src/assets/images/smart_hub_device_1790652639000.jpg"
                alt="SkillCred Smart Skill Verification Hub Hardware"
                className="w-full h-96 object-cover opacity-90"
              />

              {/* Labeled callouts */}
              <div className="absolute top-6 left-8 bg-slate-900/90 text-white p-2.5 rounded-lg border border-indigo-500/50 shadow-lg text-xs backdrop-blur-xs max-w-xs">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>1080p Optical Camera</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Captures timestamped, tamper-evident visual proof of practical task execution.
                </div>
              </div>

              <div className="absolute top-6 right-8 bg-slate-900/90 text-white p-2.5 rounded-lg border border-indigo-500/50 shadow-lg text-xs backdrop-blur-xs max-w-xs text-right">
                <div className="font-bold text-indigo-300 flex items-center justify-end gap-1.5">
                  <span>7" Capacitive Touch Display</span>
                  <Sliders className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Displays multilingual task steps, live probe readings, and immediate feedback.
                </div>
              </div>

              <div className="absolute bottom-6 left-8 bg-slate-900/90 text-white p-2.5 rounded-lg border border-indigo-500/50 shadow-lg text-xs backdrop-blur-xs max-w-xs">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QR / NFC Trainee Scanner</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Instant trainee identity verification before unlocking practical tasks.
                </div>
              </div>

              <div className="absolute bottom-6 right-8 bg-slate-900/90 text-white p-2.5 rounded-lg border border-indigo-500/50 shadow-lg text-xs backdrop-blur-xs max-w-xs text-right">
                <div className="font-bold text-indigo-300 flex items-center justify-end gap-1.5">
                  <span>Modular Sensor Interface Port</span>
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Interchangeable DB-9 / I2C connector supporting Dairy, Agri, and PACS skill kits.
                </div>
              </div>
            </div>

            {/* Component Specification Table */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Raspberry Pi 5 (8GB)</div>
                <div className="text-slate-600">Edge compute, local SQLite storage, camera streaming, cryptographic HMAC-SHA256 package generation.</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">ESP32-S3 Controller</div>
                <div className="text-slate-600">Dedicated real-time analog/digital sensor polling (pH, temperature, moisture), zero-jitter ADC sampling.</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Dual Connectivity</div>
                <div className="text-slate-600">Wi-Fi 6 + 4G LTE fallback module ensuring sync in both metropolitan RICMs and remote rural PACS.</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">LiFePO4 UPS Battery</div>
                <div className="text-slate-600">Internal 6000mAh battery providing up to 6 hours continuous field operation during village power cuts.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content for Data Flow SubTab */}
      {activeTabSub === 'data_flow' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Technical Data Flow & Cryptographic Pipeline
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Observe each architectural node light up as physical hardware communicates with the SkillCred cloud.
            </p>
          </div>

          {/* Node Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-2">
            {flowNodes.map((node, i) => (
              <div
                key={node.id}
                className={`p-4 rounded-xl border transition-all text-center space-y-2 relative ${
                  node.active
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-105 ring-4 ring-indigo-200'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className={`text-[10px] font-mono uppercase font-bold ${node.active ? 'text-indigo-200' : 'text-slate-400'}`}>
                  Node 0{i + 1}
                </div>
                <div className="font-bold text-xs">{node.label}</div>
                <div className={`text-[11px] leading-tight ${node.active ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {node.sub}
                </div>
                {i < flowNodes.length - 1 && (
                  <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Explanation Box */}
          <div className="p-4 bg-slate-900 text-slate-300 rounded-xl text-xs space-y-2 font-mono">
            <div className="text-indigo-300 font-bold uppercase text-[11px]">
              Pipeline Security Architecture:
            </div>
            <p className="leading-relaxed">
              1. Modular Probe → ESP32-S3 reads analog signal at 100Hz with Kalman noise filtering.<br />
              2. ESP32-S3 passes calibrated telemetry over SPI bus to Raspberry Pi 5.<br />
              3. Pi 5 captures synced 1080p camera frame and packages identity + sensor data.<br />
              4. Edge hardware generates immutable SHA-256 hash using device-specific private key.<br />
              5. If offline, stored in encrypted SQLite DB. If online, streamed over MQTT/HTTPS to SkillCred API.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
