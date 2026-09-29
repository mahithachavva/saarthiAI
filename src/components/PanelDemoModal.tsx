import React, { useState } from 'react';
import { 
  FlaskConical, 
  X, 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  Check, 
  Layers, 
  UserCheck 
} from 'lucide-react';
import { UserProfile, LanguageCode } from '../types';
import { DEMO_BENEFICIARY_RAVI } from '../data/translations';

interface PanelDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyProfile: (profile: UserProfile, lang?: LanguageCode) => void;
}

export const PanelDemoModal: React.FC<PanelDemoModalProps> = ({
  isOpen,
  onClose,
  onApplyProfile
}) => {
  if (!isOpen) return null;

  // 4 Curated Test Personas for Judges
  const testPersonas = [
    {
      id: 'ravi',
      name: 'Ravi Kumar (24, AP)',
      role: 'Rural Agriculture & Solar Aspiration',
      lang: 'te' as LanguageCode,
      profile: DEMO_BENEFICIARY_RAVI,
      badge: 'Benchmark Persona'
    },
    {
      id: 'lakshmi',
      name: 'Lakshmi Devi (26, AP)',
      role: 'Handloom & Tailoring Artisan',
      lang: 'te' as LanguageCode,
      profile: {
        name: 'Lakshmi Devi',
        age: '26',
        location: 'Kurnool, Andhra Pradesh',
        state: 'Andhra Pradesh',
        district: 'Kurnool',
        education: 'Intermediate',
        currentOccupation: 'Tailoring',
        familyOccupation: 'Weaving / Artisan',
        skills: ['Stitching, basic embroidery', 'Pattern cutting', 'Machine handling'],
        experience: '2 years',
        interests: ['Fashion and online selling', 'Boutique garment design', 'E-commerce crafts'],
        employmentPreference: 'Self-employment' as const,
        mobilityConstraints: 'Within district' as const,
        preferredWorkType: 'Manufacturing' as const,
        localContext: 'Kurnool apparel cluster, local boutiques, and self-help group stitching orders'
      },
      badge: 'Apparel & Enterprise'
    },
    {
      id: 'prakash',
      name: 'Prakash Rao (23, MH)',
      role: 'Technical Electrical & Solar Helper',
      lang: 'mr' as LanguageCode,
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
      },
      badge: 'Green Energy & Solar'
    },
    {
      id: 'fatima',
      name: 'Fatima Begum (22, UP)',
      role: 'Digital Services & Citizen Kiosk',
      lang: 'ur' as LanguageCode,
      profile: {
        name: 'Fatima Begum',
        age: '22',
        location: 'Sitapur, Uttar Pradesh',
        state: 'Uttar Pradesh',
        district: 'Sitapur',
        education: 'Graduate',
        currentOccupation: 'Data entry assistant',
        familyOccupation: 'Agriculture',
        skills: ['Basic computer, typing, internet', 'MS Excel', 'Online portal navigation'],
        experience: '1 year',
        interests: ['Digital services', 'Citizen kiosk entrepreneurship', 'Banking correspondent'],
        employmentPreference: 'Self-employment' as const,
        mobilityConstraints: 'Within village/block' as const,
        preferredWorkType: 'Digital' as const,
        localContext: 'District CSC network, rural bank service centers, and PM-KISAN enrollment drives'
      },
      badge: 'Digital & Financial'
    }
  ];

  // Custom Quick Builder State inside Modal
  const [customEdu, setCustomEdu] = useState('10th Standard');
  const [customOcc, setCustomOcc] = useState('Farming');
  const [customSkills, setCustomSkills] = useState('Agriculture, Basic machinery handling');
  const [customInterests, setCustomInterests] = useState('Solar, Technical skills');
  const [customPref, setCustomPref] = useState<'Self-employment' | 'Employment' | 'Either'>('Self-employment');
  const [customLocation, setCustomLocation] = useState('Kurnool, Andhra Pradesh');

  const handleRunCustom = () => {
    const parts = customLocation.split(',');
    const profile: UserProfile = {
      name: 'Custom Beneficiary Profile',
      age: '25',
      location: customLocation,
      state: parts[1]?.trim() || 'Andhra Pradesh',
      district: parts[0]?.trim() || 'Kurnool',
      education: customEdu,
      currentOccupation: customOcc,
      familyOccupation: 'Agriculture / Traditional',
      skills: customSkills.split(',').map(s => s.trim()).filter(Boolean),
      experience: '2 years',
      interests: customInterests.split(',').map(i => i.trim()).filter(Boolean),
      employmentPreference: customPref,
      mobilityConstraints: 'Within district',
      preferredWorkType: 'Technical',
      localContext: `${parts[0]?.trim() || 'Local'} rural market nodes and skilling centers`
    };

    onApplyProfile(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <FlaskConical className="w-4 h-4" />
              <span>Interactive Livelihood Assessment Sandbox</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Scenario & Profile Demonstration
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Rapidly verify recommendation logic, language adaptation, and skill-gap outputs in seconds.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: One-Click Instant Personas */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Option A: Instant Pre-Populated Benchmark Personas
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {testPersonas.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onApplyProfile(p.profile, p.lang);
                  onClose();
                }}
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-500 bg-slate-50/70 hover:bg-amber-50/40 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                      {p.name}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {p.role}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-amber-700 pt-2 border-t border-slate-200/60">
                  <span>Load Profile & Evaluate</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Interactive Custom Parameter Tweaker */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sliders className="w-4 h-4" />
            <span>Option B: Live Custom Parameter Playground</span>
          </div>

          <p className="text-xs text-slate-300">
            Test custom parameter vectors to see how the engine adapts without typing the full voice assessment:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Education Level</label>
              <select
                value={customEdu}
                onChange={(e) => setCustomEdu(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:ring-1 focus:ring-amber-400"
              >
                <option value="10th Standard">10th Standard</option>
                <option value="12th Standard">12th Standard</option>
                <option value="Diploma">Diploma / ITI</option>
                <option value="Graduate">Graduate</option>
                <option value="8th Standard or Below">8th Standard or Below</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Employment Preference</label>
              <select
                value={customPref}
                onChange={(e) => setCustomPref(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:ring-1 focus:ring-amber-400"
              >
                <option value="Self-employment">Self-employment</option>
                <option value="Employment">Employment</option>
                <option value="Either">Either</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Current Occupation</label>
              <input
                type="text"
                value={customOcc}
                onChange={(e) => setCustomOcc(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Location (District, State)</label>
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-semibold">Existing Skills (comma separated)</label>
              <input
                type="text"
                value={customSkills}
                onChange={(e) => setCustomSkills(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-semibold">Interests / Aspirations (comma separated)</label>
              <input
                type="text"
                value={customInterests}
                onChange={(e) => setCustomInterests(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleRunCustom}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate Engine with Custom Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
