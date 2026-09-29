import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowDown, 
  Calendar, 
  Award, 
  Briefcase, 
  Printer, 
  ChevronRight, 
  ShieldCheck,
  Building2,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import { UserProfile, NSQFPathway, RecommendationMatch, LanguageCode } from '../types';
import { generateRoadmap } from '../utils/roadmapGenerator';
import { UI_TRANSLATIONS } from '../data/translations';

interface RoadmapViewProps {
  profile: UserProfile;
  selectedMatch: RecommendationMatch;
  allMatches: RecommendationMatch[];
  currentLang: LanguageCode;
  onSelectDifferentMatch: (match: RecommendationMatch) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  profile,
  selectedMatch,
  allMatches,
  currentLang,
  onSelectDifferentMatch
}) => {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[currentLang] || UI_TRANSLATIONS[key]?.['en'] || key;
  const isRtl = currentLang === 'ur';

  const pathway = selectedMatch.pathway;
  const steps = generateRoadmap(profile, pathway, selectedMatch.skillGaps);

  const [copiedNotification, setCopiedNotification] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `SAARTHI AI - Personalized Livelihood Roadmap\nBeneficiary: ${profile.name} (${profile.location})\nTarget: ${pathway.occupation} (${pathway.sector})\nLivelihood Mode: ${profile.employmentPreference}\nSteps: 5 NSQF Phases under PM-AJAY Grant-in-Aid.`;
    navigator.clipboard?.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-8 py-4 px-4 sm:px-6 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PM-AJAY GIA Implementation Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('roadmapTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              5-step actionable timeline to transition from your current state to certified vocational livelihood.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title="Copy text summary"
            >
              {copiedNotification ? 'Copied!' : 'Copy Summary'}
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Print official road map"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print Roadmap</span>
            </button>
          </div>
        </div>

        {/* Pathway Selector Switcher */}
        {allMatches && allMatches.length > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Viewing Pathway Roadmap:
            </span>
            <div className="flex flex-wrap gap-2">
              {(allMatches || []).slice(0, 3).map((m, idx) => {
                const isSelected = m.pathway.id === pathway.id;
                return (
                  <button
                    key={m.pathway.id}
                    onClick={() => onSelectDifferentMatch(m)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    #{idx + 1} {m.pathway.occupation}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Vertical Timeline Structure */}
      <div className="space-y-6 relative">
        {/* START: CURRENT STATE CARD */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider">
                {t('currentState')}
              </span>
              <h2 className="text-xl font-black text-white">
                {profile.currentOccupation || 'Current Livelihood'}
              </h2>
              <p className="text-xs text-slate-300">
                Baseline skills: {(profile.skills || []).join(', ') || 'Informal skills'} • Education: {profile.education}
              </p>
            </div>
            <div className="text-xs font-semibold bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 shrink-0">
              Location: {profile.district || profile.location}
            </div>
          </div>
        </div>

        {/* Down Connector */}
        <div className="flex justify-center -my-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* 5 ROADMAP STEPS */}
        <div className="space-y-5">
          {steps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-amber-300 transition-all space-y-4"
            >
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                    {step.stepNumber}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      STEP {step.stepNumber} • {step.phase}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{step.timeline}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {step.description}
              </p>

              {/* Key Deliverables */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                  Key Deliverables & Milestones:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {step.deliverables.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium flex items-start gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11px]">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support under PM-AJAY GIA */}
              <div className="text-xs text-amber-900 bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>PM-AJAY GIA Enabler:</strong> {step.supportUnderPmAjay}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Down Connector */}
        <div className="flex justify-center -my-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* END: FUTURE LIVELIHOOD CARD */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-7 shadow-sm border border-emerald-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-bold text-emerald-300 tracking-wider">
                {t('futureLivelihood')}
              </span>
              <h2 className="text-2xl font-black text-white">
                {pathway.occupation}
              </h2>
              <p className="text-xs text-emerald-100">
                Mode: <strong>{profile.employmentPreference}</strong> in {profile.district || profile.location} • NSQF Certified
              </p>
            </div>
            <div className="bg-emerald-950/80 border border-emerald-600 px-4 py-2 rounded-2xl text-xs font-bold text-emerald-300 text-center">
              Sustainable Dignified Livelihood
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
