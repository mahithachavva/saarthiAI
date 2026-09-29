import React, { useState, useEffect, useMemo } from 'react';
import { 
  LanguageCode, 
  UserProfile, 
  RecommendationMatch 
} from './types';
import { 
  SUPPORTED_LANGUAGES, 
  DEMO_BENEFICIARY_RAVI 
} from './data/translations';
import { NSQF_PATHWAYS } from './data/nsqfPathways';
import { 
  evaluatePathways, 
  generateLocalOpportunities 
} from './utils/recommendationEngine';
import { primeSpeechSynthesis } from './utils/speech';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AssessmentFlow } from './components/AssessmentFlow';
import { ProfileView } from './components/ProfileView';
import { SkillGapView } from './components/SkillGapView';
import { RecommendationsView } from './components/RecommendationsView';
import { LocalMappingView } from './components/LocalMappingView';
import { RoadmapView } from './components/RoadmapView';
import { ArchitectureView } from './components/ArchitectureView';
import { PanelDemoModal } from './components/PanelDemoModal';
import { ResponsibleAiModal } from './components/ResponsibleAiModal';

type AppTab = 
  | 'landing' 
  | 'assessment' 
  | 'profile' 
  | 'skillgap' 
  | 'recommendations' 
  | 'localmap' 
  | 'roadmap' 
  | 'architecture';

export default function App() {
  // 1. Language State with localStorage sync
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saarthi_lang') as LanguageCode;
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
        return saved;
      }
    }
    return 'en';
  });

  const handleSelectLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('saarthi_lang', lang);
    }
  };

  // 2. Active Tab / Screen state
  const [currentTab, setCurrentTab] = useState<AppTab>('landing');

  // 3. User Profile State with localStorage sync
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('saarthi_user_profile');
        if (saved) {
          return JSON.parse(saved) as UserProfile;
        }
      } catch (e) {
        console.warn('Failed to parse saved profile', e);
      }
    }
    return null;
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (profile) {
        localStorage.setItem('saarthi_user_profile', JSON.stringify(profile));
      }
    }
  }, [profile]);

  // 4. Calculate dynamic recommendations & local opportunities
  const matches: RecommendationMatch[] = useMemo(() => {
    if (!profile) return [];
    return evaluatePathways(profile, currentLang);
  }, [profile, currentLang]);

  const localOpportunities = useMemo(() => {
    if (!profile) return [];
    return generateLocalOpportunities(profile, matches[0]?.pathway);
  }, [profile, matches]);

  // 5. Currently active pathway match for Roadmap inspection (defaults to #1 match)
  const [selectedMatch, setSelectedMatch] = useState<RecommendationMatch | null>(null);

  useEffect(() => {
    if (matches.length > 0) {
      // Keep selected match valid or update to first
      setSelectedMatch(prev => {
        if (!prev) return matches[0];
        const stillPresent = matches.find(m => m.pathway.id === prev.pathway.id);
        return stillPresent || matches[0];
      });
    }
  }, [matches]);

  // 6. Modal States
  const [isPanelDemoOpen, setIsPanelDemoOpen] = useState(false);
  const [isResponsibleAiOpen, setIsResponsibleAiOpen] = useState(false);

  // Handlers for user actions
  const handleStartAssessment = () => {
    primeSpeechSynthesis();
    setCurrentTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadDemoProfile = (demoProfile: UserProfile, preferredLang?: LanguageCode) => {
    if (preferredLang) {
      handleSelectLang(preferredLang);
    }
    setProfile(demoProfile);
    setCurrentTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteAssessment = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setCurrentTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
  };

  const handleSelectRoadmap = (match: RecommendationMatch) => {
    setSelectedMatch(match);
    setCurrentTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Top Ministry & SIH Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'assessment') {
            primeSpeechSynthesis();
          }
          setCurrentTab(tab as AppTab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasProfile={Boolean(profile)}
        onOpenPanelDemo={() => setIsPanelDemoOpen(true)}
        onOpenResponsibleAi={() => setIsResponsibleAiOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {currentTab === 'landing' && (
          <LandingPage
            currentLang={currentLang}
            onSelectLang={handleSelectLang}
            onStartAssessment={handleStartAssessment}
            onLoadDemoProfile={handleLoadDemoProfile}
          />
        )}

        {currentTab === 'assessment' && (
          <AssessmentFlow
            currentLang={currentLang}
            onComplete={handleCompleteAssessment}
            onCancel={() => setCurrentTab('landing')}
            initialProfile={profile || undefined}
          />
        )}

        {currentTab === 'profile' && profile && (
          <ProfileView
            profile={profile}
            currentLang={currentLang}
            onUpdateProfile={handleUpdateProfile}
            onProceedToSkillGap={() => {
              setCurrentTab('skillgap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onProceedToRecommendations={() => {
              setCurrentTab('recommendations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'skillgap' && profile && (
          <SkillGapView
            profile={profile}
            matches={matches}
            currentLang={currentLang}
            onExplorePathways={() => {
              setCurrentTab('recommendations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectRoadmap={handleSelectRoadmap}
          />
        )}

        {currentTab === 'recommendations' && profile && (
          <RecommendationsView
            profile={profile}
            matches={matches}
            currentLang={currentLang}
            onSelectRoadmap={handleSelectRoadmap}
            onExploreLocalMapping={() => {
              setCurrentTab('localmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'localmap' && profile && (
          <LocalMappingView
            profile={profile}
            opportunities={localOpportunities}
            topPathway={matches[0]?.pathway}
            currentLang={currentLang}
            onProceedToRoadmap={() => {
              if (matches[0]) {
                handleSelectRoadmap(matches[0]);
              } else {
                setCurrentTab('roadmap');
              }
            }}
          />
        )}

        {currentTab === 'roadmap' && profile && selectedMatch && (
          <RoadmapView
            profile={profile}
            selectedMatch={selectedMatch}
            allMatches={matches}
            currentLang={currentLang}
            onSelectDifferentMatch={(m) => setSelectedMatch(m)}
          />
        )}

        {currentTab === 'architecture' && (
          <ArchitectureView currentLang={currentLang} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">SAARTHI AI</span>
            <span>•</span>
            <span>AI-powered voice-first livelihood and skilling assistance</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <button
              onClick={() => setIsResponsibleAiOpen(true)}
              className="hover:text-slate-900 underline underline-offset-2 cursor-pointer"
            >
              Responsible AI & NSQF Standards
            </button>
            <button
              onClick={() => {
                setCurrentTab('architecture');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-900 underline underline-offset-2 cursor-pointer"
            >
              System Architecture
            </button>
            <span>PM-AJAY GIA Component • MoSJ&E</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PanelDemoModal
        isOpen={isPanelDemoOpen}
        onClose={() => setIsPanelDemoOpen(false)}
        onApplyProfile={handleLoadDemoProfile}
      />

      <ResponsibleAiModal
        isOpen={isResponsibleAiOpen}
        onClose={() => setIsResponsibleAiOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
