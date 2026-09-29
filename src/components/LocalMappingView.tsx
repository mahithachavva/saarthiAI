import React from 'react';
import { 
  MapPin, 
  Sparkles, 
  Building, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Compass, 
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { UserProfile, LocalContextOpportunity, NSQFPathway, LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface LocalMappingViewProps {
  profile: UserProfile;
  opportunities: LocalContextOpportunity[];
  topPathway?: NSQFPathway;
  currentLang: LanguageCode;
  onProceedToRoadmap: () => void;
}

export const LocalMappingView: React.FC<LocalMappingViewProps> = ({
  profile,
  opportunities,
  topPathway,
  currentLang,
  onProceedToRoadmap
}) => {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[currentLang] || UI_TRANSLATIONS[key]?.['en'] || key;
  const isRtl = currentLang === 'ur';

  const locationTitle = profile.location || 'Local District';
  const district = profile.district || 'District';
  const state = profile.state || 'State';

  return (
    <div className={`max-w-5xl mx-auto space-y-8 py-4 px-4 sm:px-6 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header & Location Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Contextual Geolocation Layer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('localContextTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              District and block-level livelihood clusters customized for <strong className="text-slate-900">{profile.name}</strong>.
            </p>
          </div>

          {/* User's Verified Location Badge */}
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl flex items-center gap-3 shrink-0 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Active Location Scope
              </div>
              <div className="text-sm font-bold text-white">
                {district}, {state}
              </div>
            </div>
          </div>
        </div>

        {/* Official Prototype Disclaimer (Mandatory) */}
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-950 leading-relaxed font-medium">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-0.5">Government Livelihood Architecture Notice:</strong>
            {t('localMappingDisclaimer')}
          </div>
        </div>
      </div>

      {/* User's Local Context Snapshot */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs uppercase font-extrabold tracking-wider text-amber-200">
              Ground Realities Reported by You
            </div>
            <p className="text-base font-semibold text-white leading-snug">
              "{profile.localContext || 'Active rural agriculture, technical demand, and PM-AJAY beneficiary clusters.'}"
            </p>
          </div>
          <div className="flex items-center gap-2 bg-amber-800/60 border border-amber-500/40 px-3 py-2 rounded-xl text-xs whitespace-nowrap">
            <ShieldCheck className="w-4 h-4 text-amber-200 shrink-0" />
            <span>Mobility: <strong>{profile.mobilityConstraints}</strong></span>
          </div>
        </div>
      </div>

      {/* Dynamic Local Opportunity Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-700" />
            <span>Mapped Livelihood Nodes in {district}</span>
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            {opportunities.length} Relevant Clusters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-amber-300 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                    {opp.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {opp.hubType}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900">
                  {opp.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {opp.relevanceReason}
                </p>

                <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Coverage: {opp.locationScope}</span>
                </div>
              </div>

              {/* Applicable Schemes */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Convergence Schemes
                </span>
                <div className="flex flex-wrap gap-1">
                  {opp.schemesApplicable.map((sch, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-medium"
                    >
                      {sch}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-3xl shadow-xs">
        <div className="text-xs text-slate-600">
          Ready to review your step-by-step skilling and enterprise transition roadmap?
        </div>
        <button
          onClick={onProceedToRoadmap}
          className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>View 5-Step Personalized Roadmap</span>
        </button>
      </div>
    </div>
  );
};
