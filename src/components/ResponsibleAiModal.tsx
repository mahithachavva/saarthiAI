import React from 'react';
import { 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  FileCheck2, 
  HelpCircle, 
  UserCheck, 
  Scale 
} from 'lucide-react';
import { LanguageCode } from '../types';

interface ResponsibleAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
}

export const ResponsibleAiModal: React.FC<ResponsibleAiModalProps> = ({
  isOpen,
  onClose,
  currentLang
}) => {
  if (!isOpen) return null;

  const principles = [
    {
      title: '1. Explainable & Auditable Recommendations',
      icon: <HelpCircle className="w-5 h-5 text-amber-600" />,
      desc: 'Every occupational pathway recommended by SAARTHI AI features dynamic, evidence-backed rationales tied directly to the beneficiary’s stated education, skills, interests, and family background. No arbitrary percentages or opaque black-box neural networks are used.'
    },
    {
      title: '2. User Agency & Full Profile Editability',
      icon: <UserCheck className="w-5 h-5 text-blue-600" />,
      desc: 'Beneficiaries and field mobilizers retain 100% control over their profile. Any extracted field (education, skills, preferences, mobility) can be reviewed, edited, or corrected in one click, immediately recalculating all recommendations.'
    },
    {
      title: '3. Official NSQF Qualification Verification',
      icon: <FileCheck2 className="w-5 h-5 text-emerald-600" />,
      desc: 'All NSQF qualification levels displayed in SAARTHI AI are benchmarked against official National Occupational Standards (NOS). When deployed at the district level, all qualification packs are actively cross-validated against the National Qualifications Register (NQR).'
    },
    {
      title: '4. Contextual Livelihood Clusters vs. Live Vacancies',
      icon: <AlertCircle className="w-5 h-5 text-purple-600" />,
      desc: 'Local mapping data reflects regional economic ecosystems, PM-AJAY GIA skill clusters, and MSME clusters. It explicitly clarifies that recommendations represent structural livelihood viability rather than live, real-time employer job vacancies.'
    },
    {
      title: '5. Human-in-the-Loop Decision Support',
      icon: <Scale className="w-5 h-5 text-rose-600" />,
      desc: 'SAARTHI AI is built as a decision-support instrument for District Skill Development Officers (DSDOs), PM-AJAY district coordinators, and ITI counselors. It empowers human judgment rather than replacing counselors with automated decisions.'
    },
    {
      title: '6. Sustainable Skilling Over Commercial Guarantees',
      icon: <CheckCircle2 className="w-5 h-5 text-teal-600" />,
      desc: 'PM-AJAY GIA provides 100% course fee grants, stipends, and enterprise toolkits. SAARTHI AI does not make false or commercial claims of guaranteed employment, focusing instead on accredited competencies, apprenticeship linkage, and micro-enterprise resilience.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Responsible AI & Ethical Governance
              </h2>
              <p className="text-xs text-slate-500">
                MoSJ&E • PM-AJAY Grant-in-Aid Skilling Standards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6 Core Principles */}
        <div className="grid grid-cols-1 gap-4">
          {principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-3.5"
            >
              <div className="p-2 bg-white rounded-xl border border-slate-200 shrink-0 mt-0.5">
                {pr.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {pr.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pr.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            Compliant with NITI Aayog Responsible AI for All Guidelines
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
