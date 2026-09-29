import { UserProfile, NSQFPathway, RoadmapStep } from '../types';

export function generateRoadmap(profile: UserProfile, pathway: NSQFPathway, skillGaps: string[] = []): RoadmapStep[] {
  const livelihoodModes = Array.isArray(pathway.livelihoodModes) ? pathway.livelihoodModes : [];
  const isSelfEmployment = profile.employmentPreference === 'Self-employment' || (profile.employmentPreference === 'Either' && livelihoodModes.includes('Self-employment'));
  const locationText = profile.district || profile.location || 'local district';

  const userSkills = Array.isArray(profile.skills) ? profile.skills : [];
  const safeGaps = Array.isArray(skillGaps) ? skillGaps : [];
  const gapsString = safeGaps.slice(0, 3).join(', ');

  const theoryTopics = Array.isArray(pathway.trainingAreas?.theory) ? pathway.trainingAreas.theory : [];
  const practicalTopics = Array.isArray(pathway.trainingAreas?.practical) ? pathway.trainingAreas.practical : [];

  return [
    {
      stepNumber: 1,
      phase: 'GAP IDENTIFICATION & ENROLLMENT',
      title: 'Skill Gap Profiling & Counseling',
      timeline: 'Month 1 (Week 1–2)',
      description: `Baseline diagnostic of your existing competencies in "${userSkills.slice(0, 2).join(', ') || 'basic work experience'}". Formal mapping of priority competency gaps: ${gapsString || 'standard technical competencies'}.`,
      deliverables: [
        'Personalized Skill Card generated under PM-AJAY GIA',
        'Enrollment in verified NSQF District Training Center / ITI',
        'Orientation on PM-AJAY beneficiary entitlements & stipend'
      ],
      supportUnderPmAjay: 'Free counseling, document verification, and 100% course fee grant under PM-AJAY GIA.'
    },
    {
      stepNumber: 2,
      phase: 'FOUNDATIONAL TRAINING',
      title: 'Core Technical & Theory Modules',
      timeline: 'Months 1–2 (120 Hours)',
      description: `Intensive classroom and lab immersion covering: ${theoryTopics.slice(0, 3).join(', ') || 'essential vocational fundamentals'}. Includes safety protocols, technical arithmetic, and regional vernacular work manuals.`,
      deliverables: [
        'Laboratory safety and equipment operation clearance',
        'Theoretical milestone test completion',
        'Digital literacy & UPI transaction coaching'
      ],
      supportUnderPmAjay: 'Daily travel/training allowance and bilingual learning material distribution.'
    },
    {
      stepNumber: 3,
      phase: 'PRACTICAL SKILLING & CERTIFICATION',
      title: 'NSQF Qualification & Practical Masterclass',
      timeline: 'Months 2–3 (180 Hours)',
      description: `Hands-on workshop drills focusing on: ${practicalTopics.slice(0, 3).join(', ') || 'equipment operations and maintenance'}. Assessment and independent certification by official Sector Skill Council assessors.`,
      deliverables: [
        `Official NSQF Aligned Qualification Certificate (${pathway.indicativeNsqfLevel ? `Indicative Level ${pathway.indicativeNsqfLevel}` : 'Standard Verified'})`,
        'Digital Skill Passport on Skill India Digital Hub (SIDH)',
        'Benchmarked grade in practical equipment diagnostics'
      ],
      supportUnderPmAjay: 'Complete certification examination fee waiver and assessment logistics grant.'
    },
    {
      stepNumber: 4,
      phase: 'APPRENTICESHIP & PRACTICAL EXPOSURE',
      title: 'On-the-Job Apprenticeship (OJT)',
      timeline: 'Months 4–5 (8–12 Weeks)',
      description: `Live field deployment with accredited regional industry partners, contracting guilds, or local service clusters in ${locationText}. Real-world troubleshooting under senior technician mentorship.`,
      deliverables: [
        'National Apprenticeship Promotion Scheme (NAPS) contract',
        'Field work logbook endorsed by licensed mentor',
        'Commercial customer handling & site safety compliance'
      ],
      supportUnderPmAjay: 'Monthly apprenticeship stipend co-funded by government & PM-AJAY industry linkage.'
    },
    {
      stepNumber: 5,
      phase: 'LIVELIHOOD TRANSITION',
      title: isSelfEmployment ? 'Micro-Enterprise Launch & Toolkit Grant' : 'Industry Placement & Contractual Linkage',
      timeline: 'Month 6 onwards',
      description: isSelfEmployment
        ? `Setup of independent repair/service workshop, mobile unit, or collective micro-enterprise in ${locationText}. Distribution of professional tool-kit and credit linkage.`
        : `Formal job interview facilitation and placement with verified employers, government project contractors, or regional facilities in ${locationText}.`,
      deliverables: isSelfEmployment
        ? [
            `Standard PM-AJAY GIA Tool-Kit delivery for ${pathway.occupation}`,
            'Udyam Registration & Micro-Enterprise bank account',
            'Empanelment with district government procurement / local marketplace'
          ]
        : [
            `Formal appointment letter as ${pathway.occupation}`,
            'Social security enrollment (ESIC / EPFO)',
            'Post-placement tracking support for 6 months'
          ],
      supportUnderPmAjay: isSelfEmployment
        ? `${pathway.pmAjayGiaFocus} + Mudra loan credit assistance.`
        : 'Dedicated SC youth placement cell support and post-skilling tracking under PM-AJAY.'
    }
  ];
}
