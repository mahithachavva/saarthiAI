import React from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Briefcase, 
  Layers, 
  HelpCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { UserProfile, RecommendationMatch, LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface RecommendationsViewProps {
  profile: UserProfile;
  matches: RecommendationMatch[];
  currentLang: LanguageCode;
  onSelectRoadmap: (match: RecommendationMatch) => void;
  onExploreLocalMapping: () => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  profile,
  matches,
  currentLang,
  onSelectRoadmap,
  onExploreLocalMapping
}) => {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[currentLang] || UI_TRANSLATIONS[key]?.['en'] || key;
  const isRtl = currentLang === 'ur';

  const top3 = (matches || []).slice(0, 3);

  return (
    <div className={`max-w-5xl mx-auto space-y-8 py-4 px-4 sm:px-6 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Dimensional Livelihood Matching Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('recommendationTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Dynamically matched based on education, existing skills, expressed interests, family background, and local livelihood viability for <strong className="text-slate-900">{profile.name}</strong>.
            </p>
          </div>

          <button
            onClick={onExploreLocalMapping}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Map Local Opportunities</span>
          </button>
        </div>

        {/* Prototype Score Transparency Notice */}
        <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-2xl flex items-start gap-2.5 text-xs text-amber-950 font-medium">
          <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Transparency Guarantee:</strong> {t('prototypeScoreNotice')} Rankings reflect rule-based semantic overlap across your individual responses. No arbitrary percentages or opaque black-box scoring are applied.
          </span>
        </div>
      </div>

      {/* Top 3 Recommendation Cards */}
      <div className="grid grid-cols-1 gap-6">
        {top3.map((match, rank) => {
          const { pathway, alignmentLabel, score, matchReasons, skillGaps } = match;
          const isTopRank = rank === 0;

          return (
            <div
              key={pathway.id}
              id={`pathway-card-${pathway.id}`}
              className={`bg-white rounded-3xl border transition-all p-6 sm:p-8 space-y-6 ${
                isTopRank
                  ? 'border-amber-400/90 shadow-md ring-1 ring-amber-400/20'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                      {rank + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {pathway.sector}
                    </span>
                    <span className={`text-xs font-extrabold px-3 py-0.5 rounded-full ${
                      alignmentLabel === 'Strong profile alignment'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : alignmentLabel === 'Relevant pathway'
                        ? 'bg-blue-100 text-blue-900 border border-blue-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}>
                      {alignmentLabel}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {pathway.occupation}
                  </h2>

                  <p className="text-xs text-amber-900 font-medium">
                    {pathway.nsqfAlignmentText}
                  </p>
                </div>

                {/* Score and Livelihood Mode Badge */}
                <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-bold text-slate-700">Matching Index:</span>
                    <span className="text-sm font-black text-slate-900">{score}/100</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Prototype matching index
                  </span>
                </div>
              </div>

              {/* Dynamic Reasons: "Why this pathway matches you" */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('whyMatches')}:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {matchReasons.map((reason, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills to Develop & Livelihood Modes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                {/* Skills to develop */}
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    {t('skillsToDevelop')} (Priority Gaps)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGaps.map((gap, gIdx) => (
                      <span
                        key={gIdx}
                        className="bg-white text-slate-800 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-semibold"
                      >
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Possible Livelihood Mode & Next Step */}
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-2.5 text-xs">
                  <div>
                    <span className="font-bold text-blue-900 block mb-0.5">
                      {t('livelihoodMode')}:
                    </span>
                    <span className="font-semibold text-slate-800">
                      {pathway.potentialLivelihoodModeDisplay}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold text-blue-900 block mb-0.5">
                      {t('nextStepLabel')}:
                    </span>
                    <span className="text-slate-700 leading-relaxed block">
                      {pathway.nextSteps[currentLang] || pathway.nextSteps.en}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Footer for this specific pathway */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-medium">
                  Under PM-AJAY GIA: <strong>{pathway.pmAjayGiaFocus}</strong>
                </div>

                <button
                  id={`select-roadmap-btn-${pathway.id}`}
                  onClick={() => onSelectRoadmap(match)}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs ${
                    isTopRank
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Build Personalized Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
