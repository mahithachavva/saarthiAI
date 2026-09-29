import React, { useState } from 'react';
import { 
  GitFork, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Award, 
  BookOpen, 
  Check, 
  Compass,
  Layers,
  ChevronDown
} from 'lucide-react';
import { UserProfile, RecommendationMatch, LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface SkillGapViewProps {
  profile: UserProfile;
  matches: RecommendationMatch[];
  currentLang: LanguageCode;
  onExplorePathways: () => void;
  onSelectRoadmap: (match: RecommendationMatch) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  profile,
  matches,
  currentLang,
  onExplorePathways,
  onSelectRoadmap
}) => {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[currentLang] || UI_TRANSLATIONS[key]?.['en'] || key;
  const isRtl = currentLang === 'ur';

  // Target pathway state (defaults to top match)
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeMatch = matches[selectedIdx] || matches[0];

  if (!activeMatch) {
    return null;
  }

  const pathway = activeMatch.pathway;

  return (
    <div className={`max-w-4xl mx-auto space-y-8 py-4 px-4 sm:px-6 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Competency Gap Diagnostic</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('skillGapTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Transparent comparison of current skills vs NSQF occupational competencies.
            </p>
          </div>

          {/* Switch target pathway dropdown if multiple recommendations exist */}
          {matches && matches.length > 1 && (
            <div className="flex flex-col items-start sm:items-end">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Target Pathway
              </label>
              <div className="relative">
                <select
                  value={selectedIdx}
                  onChange={(e) => setSelectedIdx(Number(e.target.value))}
                  className="bg-slate-100 hover:bg-slate-200/70 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 cursor-pointer pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {(matches || []).slice(0, 3).map((m, idx) => (
                    <option key={m.pathway.id} value={idx}>
                      #{idx + 1} {m.pathway.occupation}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Selected Target Pathway Card */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              {t('targetPathway')}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {pathway.occupation}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
              <span className="font-semibold text-slate-700 bg-white/90 px-2.5 py-0.5 rounded border border-amber-200">
                {pathway.sector}
              </span>
              <span className="text-amber-800 text-[11px]">
                {pathway.nsqfAlignmentText}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-block bg-slate-900 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs">
              {activeMatch.alignmentLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Comparison: Current Strengths vs Skill Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Current Strengths */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                {t('currentStrengths')}
              </h3>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Extracted from You
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Skills recognized from your profile for <strong className="text-slate-800">{profile.name}</strong>:
          </p>

          <div className="space-y-2.5">
            {(profile.skills || []).length > 0 ? (
              (profile.skills || []).map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/80 text-xs"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-950">{skill}</span>
                    <span className="text-[11px] text-emerald-800/80 block mt-0.5">
                      Prior work experience & daily capability
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                No specific formal skills specified — entry-level foundational modules will apply.
              </div>
            )}
          </div>
        </div>

        {/* Right: Calculated Skill Gaps */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                {t('skillGapsLabel')}
              </h3>
            </div>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Bridged by PM-AJAY GIA
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Specific competencies required for <strong className="text-slate-800">{pathway.occupation}</strong> to achieve certification:
          </p>

          <div className="space-y-2.5">
            {activeMatch.skillGaps.map((gap, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs"
              >
                <div className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900">{gap}</span>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    Covered in 120-300 hour NSQF modular curriculum
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Curriculum Bridge Modules */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <BookOpen className="w-4 h-4" />
          <span>Curriculum Modules Addressing Your Gaps</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Theory & Safety Modules
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              {pathway.trainingAreas.theory.map((th, i) => (
                <li key={i}>{th}</li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2">
            <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Hands-On Practical Drills
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              {pathway.trainingAreas.practical.map((pr, i) => (
                <li key={i}>{pr}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Target Certification: <strong>{pathway.trainingAreas.certification}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onExplorePathways}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>{t('btnExplorePathways')}</span>
            </button>
            <button
              onClick={() => onSelectRoadmap(activeMatch)}
              className="w-full sm:w-auto px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <Layers className="w-4 h-4 text-amber-700" />
              <span>Generate Roadmap</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
