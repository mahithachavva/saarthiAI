import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  Mic, 
  MessageSquare, 
  Database, 
  Award, 
  Compass, 
  MapPin, 
  Layers, 
  Volume2, 
  Smartphone, 
  PhoneCall, 
  Monitor, 
  CheckCircle2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface ArchitectureViewProps {
  currentLang: LanguageCode;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ currentLang }) => {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[currentLang] || UI_TRANSLATIONS[key]?.['en'] || key;
  const isRtl = currentLang === 'ur';

  const pipelineSteps = [
    {
      num: 1,
      title: 'User Voice / Regional Audio Input',
      desc: 'Speech captures acoustic waveforms in 6 scheduled Indian languages (Telugu, Hindi, Marathi, Urdu, Tamil, English) via browser Web Speech API & IVR telephony.',
      icon: <Mic className="w-5 h-5 text-amber-600" />
    },
    {
      num: 2,
      title: 'Automatic Speech Recognition (ASR)',
      desc: 'Acoustic feature extraction and language detection tuned for rural dialects, accented regional phonetics, and noisy field environments.',
      icon: <Volume2 className="w-5 h-5 text-blue-600" />
    },
    {
      num: 3,
      title: 'Conversational Dialogue Management',
      desc: 'Low-friction, progressive questionnaire that asks one question at a time to minimize cognitive overhead for low-literacy beneficiaries.',
      icon: <MessageSquare className="w-5 h-5 text-emerald-600" />
    },
    {
      num: 4,
      title: 'Livelihood Profile Extraction',
      desc: 'Normalizes unstructured verbal answers into a 13-field deterministic candidate profile (education tier, prior skills, family trade, mobility constraints).',
      icon: <Cpu className="w-5 h-5 text-purple-600" />
    },
    {
      num: 5,
      title: 'Skill & Competency Gap Diagnostic',
      desc: 'Deconstructs user skills and runs keyword vector overlap against Sector Skill Council NOS (National Occupational Standards) competency matrices.',
      icon: <Sparkles className="w-5 h-5 text-rose-600" />
    },
    {
      num: 6,
      title: 'NSQF Knowledge Base Matching',
      desc: 'Cross-references curated qualification packs across agriculture, green energy, automotive, digital services, and apparel sectors.',
      icon: <Award className="w-5 h-5 text-amber-700" />
    },
    {
      num: 7,
      title: 'Transparent Multi-Factor Scoring Engine',
      desc: 'Calculates rule-based alignment score (education compatibility, trade affinity, work type fit, and enterprise viability) without opaque black boxes.',
      icon: <Compass className="w-5 h-5 text-indigo-600" />
    },
    {
      num: 8,
      title: 'Local Livelihood Opportunity Layer',
      desc: 'Injects district-level economic realities (solar farms, textile parks, FPOs, and PM-AJAY GIA project clusters) based on candidate coordinates.',
      icon: <MapPin className="w-5 h-5 text-teal-600" />
    },
    {
      num: 9,
      title: '5-Step Personalized Transition Roadmap',
      desc: 'Produces actionable step-by-step milestones spanning diagnostic counseling, NSQF classroom theory, OJT apprenticeship, and toolkit distribution.',
      icon: <Layers className="w-5 h-5 text-emerald-700" />
    },
    {
      num: 10,
      title: 'Voice Synthesizer (TTS) & Skill Card Output',
      desc: 'Synthesizes recommendations back into clear regional voice audio and issues an exportable candidate roadmap for district officers.',
      icon: <Volume2 className="w-5 h-5 text-amber-600" />
    }
  ];

  const deploymentChannels = [
    {
      title: 'Web Application Assistant',
      status: 'LIVE WEB PLATFORM',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: <Monitor className="w-6 h-6 text-slate-800" />,
      description: 'Fully client-side, zero-latency web application running in browser with real Web Speech API, offline persistence, and instant multilingual rendering.',
      tech: 'React 18, TypeScript, Tailwind CSS, Web Speech API, LocalStorage'
    },
    {
      title: 'Grama Panchayat & CSC Kiosks',
      status: 'Production Edge Channel',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: <Smartphone className="w-6 h-6 text-blue-700" />,
      description: 'Touchscreen kiosks at Common Service Centers (CSCs) with noise-cancelling directional microphones for self-service beneficiary mapping in rural blocks.',
      tech: 'Progressive Web App (PWA), Local SQLite Cache, USB Handset'
    },
    {
      title: 'WhatsApp Voice & Chatbot',
      status: 'Production Messaging Channel',
      statusColor: 'bg-green-100 text-green-800 border-green-300',
      icon: <MessageSquare className="w-6 h-6 text-green-700" />,
      description: 'Beneficiaries send regional audio voice notes on WhatsApp. SAARTHI transcribes, maps skills, and returns an audio summary and PDF roadmap directly on their phone.',
      tech: 'WhatsApp Business Cloud API, Webhooks, Bhashini STT/TTS'
    },
    {
      title: 'Toll-Free Interactive Voice Response (IVR)',
      status: 'Zero-Internet Production Channel',
      statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: <PhoneCall className="w-6 h-6 text-purple-700" />,
      description: 'Toll-free PSTN phone number for basic feature phone users. Candidate talks in their native dialect without needing internet, smartphone, or literacy.',
      tech: 'Telephony Gateway, SIP Trunking, Automated Voice Prompts'
    }
  ];

  return (
    <div className={`max-w-5xl mx-auto space-y-10 py-4 px-4 sm:px-6 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Cpu className="w-4 h-4" />
          <span>System Specifications & AI Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          How SAARTHI AI Works
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Architected for high reliability, vernacular inclusion, and transparency under the Grant-in-Aid (GIA) component of PM-AJAY. The system connects natural beneficiary speech directly to national vocational qualification frameworks.
        </p>
      </div>

      {/* End-to-End Processing Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            End-to-End Data & Decision Pipeline
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            10 Interconnected Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pipelineSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-start gap-4 hover:border-amber-300 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    Step {step.num}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Multi-Channel Deployment Architectures */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Multi-Channel Deployment Strategy
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            Ensuring 100% Saturation Across Digital & Offline Divides
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {deploymentChannels.map((channel, cIdx) => (
            <div
              key={cIdx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {channel.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${channel.statusColor}`}>
                    {channel.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {channel.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {channel.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <strong className="text-slate-700">Technology Stack:</strong> {channel.tech}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
