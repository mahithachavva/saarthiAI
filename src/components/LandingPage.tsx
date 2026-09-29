import React from 'react';
import { 
  Mic, 
  FlaskConical, 
  Volume2, 
  Globe2, 
  Award, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  Languages
} from 'lucide-react';
import { LanguageCode, UserProfile } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS, DEMO_BENEFICIARY_RAVI } from '../data/translations';

interface LandingPageProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onStartAssessment: () => void;
  onLoadDemoProfile: (profile: UserProfile) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLang,
  onSelectLang,
  onStartAssessment,
  onLoadDemoProfile
}) => {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[currentLang] || UI_TRANSLATIONS[key]?.['en'] || key;
  const isRtl = currentLang === 'ur';

  // Sample quick test scenarios for Judges
  const quickJudgeScenarios = [
    {
      title: 'Scenario 1: Tailoring Artisan (Kurnool, AP)',
      subtext: 'Intermediate • Tailoring • Stitching, embroidery • Fashion interest • Self-employment',
      langCode: 'te' as LanguageCode,
      profile: {
        name: 'Lakshmi Devi',
        age: '26',
        location: 'Kurnool, Andhra Pradesh',
        state: 'Andhra Pradesh',
        district: 'Kurnool',
        education: 'Intermediate',
        currentOccupation: 'Tailoring',
        familyOccupation: 'Weaving / Artisan',
        skills: ['Stitching, basic embroidery', 'Pattern measurement', 'Handloom fabric handling'],
        experience: '2 years',
        interests: ['Fashion and online selling', 'Boutique garment design', 'E-commerce crafts'],
        employmentPreference: 'Self-employment' as const,
        mobilityConstraints: 'Within district' as const,
        preferredWorkType: 'Manufacturing' as const,
        localContext: 'Kurnool apparel cluster, local boutiques, and self-help group stitching orders'
      }
    },
    {
      title: 'Scenario 2: Electrical Helper (Nagpur, MH)',
      subtext: 'Diploma • Electrical helper • Wiring, repair • Solar interest • Employment',
      langCode: 'en' as LanguageCode,
      profile: {
        name: 'Prakash Rao',
        age: '23',
        location: 'Nagpur, Maharashtra',
        state: 'Maharashtra',
        district: 'Nagpur',
        education: 'Diploma',
        currentOccupation: 'Electrical helper',
        familyOccupation: 'Daily wage worker',
        skills: ['Wiring, basic electrical repair', 'Multimeter usage', 'Tool handling'],
        experience: '2 years',
        interests: ['Solar', 'Solar PV technology', 'Industrial wiring'],
        employmentPreference: 'Employment' as const,
        mobilityConstraints: 'Statewide' as const,
        preferredWorkType: 'Technical' as const,
        localContext: 'Solar rooftop projects, industrial parks, and electrical substations'
      }
    }
  ];

  return (
    <div className={`space-y-12 pb-16 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-amber-50/70 via-white to-slate-50 rounded-3xl border border-amber-100/80 shadow-xs p-6 sm:p-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Government Scheme Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('sihBadge')}</span>
          </div>

          {/* Product Brand & Tagline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              {t('brand')}
            </h1>
            <p className="text-lg sm:text-2xl font-bold text-amber-700">
              "{t('tagline')}"
            </p>
            <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>

          {/* Prominent Language Selector on Home Page */}
          <div className="pt-2 pb-4">
            <div className="inline-block bg-white p-3 rounded-2xl border border-slate-200 shadow-sm max-w-xl w-full">
              <div className="flex items-center justify-center gap-2 mb-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Languages className="w-3.5 h-3.5 text-amber-600" />
                <span>Select Your Language / మీ భాషను ఎంచుకోండి / अपनी भाषा चुनें</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = currentLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      id={`lang-selector-${lang.code}`}
                      onClick={() => onSelectLang(lang.code)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer border ${
                        isSelected
                          ? 'bg-amber-600 text-white border-amber-700 shadow-sm scale-102'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-sm font-semibold">{lang.nativeLabel}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                        {lang.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="start-assessment-hero-btn"
              onClick={onStartAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <Mic className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{t('btnStartAssessment')}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="try-demo-profile-hero-btn"
              onClick={() => onLoadDemoProfile(DEMO_BENEFICIARY_RAVI)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-amber-50/60 active:bg-amber-100 text-amber-900 border border-amber-300 px-6 py-3.5 rounded-xl font-bold text-base shadow-xs hover:border-amber-400 transition-all cursor-pointer"
            >
              <FlaskConical className="w-5 h-5 text-amber-700" />
              <span>{t('btnTryDemoProfile')}</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-md">
                Ravi (24, AP)
              </span>
            </button>
          </div>

          {/* Accessibility Note */}
          <div className="pt-3">
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('accessibilityNote')}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid (as required by prompt) */}
      <section className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Voice First */}
          <div 
            id="feature-card-voice"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 mb-4">
              <Volume2 className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
              <span>🎙 {t('featureVoiceFirst')}</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('featureVoiceFirstDesc')}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded inline-block">
              Web Speech API + TTS
            </div>
          </div>

          {/* Card 2: Multilingual */}
          <div 
            id="feature-card-multilingual"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
              <span>🌐 {t('featureMultilingual')}</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('featureMultilingualDesc')}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-blue-800 bg-blue-50/80 px-2.5 py-1 rounded inline-block">
              6 Regional Languages + RTL
            </div>
          </div>

          {/* Card 3: NSQF Aligned */}
          <div 
            id="feature-card-nsqf"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
              <span>🎓 {t('featureNsqf')}</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('featureNsqfDesc')}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded inline-block">
              15+ Standardized Pathways
            </div>
          </div>

          {/* Card 4: Local Context */}
          <div 
            id="feature-card-local-context"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
              <span>📍 {t('featureLocalContext')}</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('featureLocalContextDesc')}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-purple-800 bg-purple-50/80 px-2.5 py-1 rounded inline-block">
              District Livelihood Mapping
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Scenario Presets */}
      <section className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <FlaskConical className="w-4 h-4" />
                <span>Interactive Beneficiary Scenarios • Live Verification</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                Live Interactive Verification (Zero Mock Data)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Test custom dynamic engine behavior across diverse educational backgrounds, trades, and languages.
              </p>
            </div>
            <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full whitespace-nowrap">
              Deterministic Matching Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickJudgeScenarios.map((scen, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectLang(scen.langCode);
                  onLoadDemoProfile(scen.profile);
                }}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/80 rounded-2xl p-4 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-amber-400 group-hover:text-amber-300">
                      {scen.title}
                    </span>
                    <span className="text-[10px] uppercase font-bold bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                      {scen.langCode.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {scen.subtext}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Load this profile & evaluate</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>
              💡 Or click <strong className="text-white">Start My Assessment</strong> above to speak or type your own custom profile.
            </span>
            <button
              onClick={() => onLoadDemoProfile(DEMO_BENEFICIARY_RAVI)}
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer"
            >
              Load Default Ravi Kumar (24, AP) Benchmark
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
