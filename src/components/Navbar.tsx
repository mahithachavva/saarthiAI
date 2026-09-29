import React from 'react';
import { 
  Sparkles, 
  Languages, 
  FlaskConical, 
  ShieldCheck, 
  Layers, 
  UserCheck, 
  Compass, 
  GitFork, 
  MapPin, 
  HelpCircle 
} from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  hasProfile: boolean;
  onOpenPanelDemo: () => void;
  onOpenResponsibleAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  currentTab,
  onSelectTab,
  hasProfile,
  onOpenPanelDemo,
  onOpenResponsibleAi
}) => {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[currentLang] || UI_TRANSLATIONS[key]?.['en'] || key;
  const isRtl = currentLang === 'ur';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur shadow-xs">
      {/* Top Product Announcement Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-amber-400">AI-powered voice-first livelihood and skilling assistance</span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-200 truncate hidden md:inline">PM-AJAY (Grant-in-Aid Component)</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
              NSQF Aligned
            </span>
            <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded">
              Voice-First Assistant
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Product Name */}
          <div 
            id="brand-logo-container"
            onClick={() => onSelectTab('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-bold shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                  {t('brand')}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                  v2.6
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Center Navigation Links (visible when profile exists or user moved forward) */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              id="nav-home-btn"
              onClick={() => onSelectTab('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentTab === 'landing'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              id="nav-assessment-btn"
              onClick={() => onSelectTab('assessment')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentTab === 'assessment'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Assessment
            </button>

            {hasProfile && (
              <>
                <button
                  id="nav-profile-btn"
                  onClick={() => onSelectTab('profile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    currentTab === 'profile'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Profile
                </button>

                <button
                  id="nav-skillgap-btn"
                  onClick={() => onSelectTab('skillgap')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    currentTab === 'skillgap'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <GitFork className="w-3.5 h-3.5" />
                  Skill Gap
                </button>

                <button
                  id="nav-recommendations-btn"
                  onClick={() => onSelectTab('recommendations')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    currentTab === 'recommendations'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  Pathways
                </button>

                <button
                  id="nav-localmap-btn"
                  onClick={() => onSelectTab('localmap')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    currentTab === 'localmap'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Local Context
                </button>

                <button
                  id="nav-roadmap-btn"
                  onClick={() => onSelectTab('roadmap')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    currentTab === 'roadmap'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Roadmap
                </button>
              </>
            )}

            <button
              id="nav-architecture-btn"
              onClick={() => onSelectTab('architecture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentTab === 'architecture'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Architecture
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Language Selector Dropdown */}
            <div className="relative flex items-center">
              <label htmlFor="nav-lang-select" className="sr-only">Language</label>
              <div className="flex items-center bg-slate-100 hover:bg-slate-200/80 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 transition-colors">
                <Languages className="w-3.5 h-3.5 text-amber-700 mr-1.5 shrink-0" />
                <select
                  id="nav-lang-select"
                  value={currentLang}
                  onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                  className="bg-transparent border-none focus:outline-none font-semibold text-slate-800 cursor-pointer pr-1 text-xs"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="text-slate-900 bg-white">
                      {lang.nativeLabel} ({lang.label})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Demo Profiles Button */}
            <button
              id="nav-panel-demo-trigger"
              onClick={onOpenPanelDemo}
              className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
              title="Quick test profiles and scenario simulator"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('panelDemoBtn')}</span>
              <span className="sm:hidden">Demo</span>
            </button>

            {/* Responsible AI Button */}
            <button
              id="nav-responsible-ai-trigger"
              onClick={onOpenResponsibleAi}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Responsible AI & Validation"
              aria-label="Responsible AI and validation info"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Mobile sub-navigation bar if profile is loaded */}
        {hasProfile && (
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 text-xs no-scrollbar">
            <button
              onClick={() => onSelectTab('profile')}
              className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'profile' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600'}`}
            >
              Profile
            </button>
            <button
              onClick={() => onSelectTab('skillgap')}
              className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'skillgap' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600'}`}
            >
              Skill Gap
            </button>
            <button
              onClick={() => onSelectTab('recommendations')}
              className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'recommendations' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600'}`}
            >
              Top Pathways
            </button>
            <button
              onClick={() => onSelectTab('localmap')}
              className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'localmap' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600'}`}
            >
              Local Context
            </button>
            <button
              onClick={() => onSelectTab('roadmap')}
              className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'roadmap' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600'}`}
            >
              Roadmap
            </button>
            <button
              onClick={() => onSelectTab('architecture')}
              className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'architecture' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600'}`}
            >
              Architecture
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
