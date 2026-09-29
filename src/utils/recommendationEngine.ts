import { UserProfile, NSQFPathway, RecommendationMatch, LocalContextOpportunity, LanguageCode } from '../types';
import { NSQF_PATHWAYS } from '../data/nsqfPathways';

// Helper to normalize strings for robust keyword overlap
function normalizeTokens(text: string): string[] {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);
}

function hasOverlap(listA: string[], listB: string[]): { matchCount: number; matchedWords: string[] } {
  const wordsA = new Set(listA.flatMap(item => normalizeTokens(item)));
  const wordsB = new Set(listB.flatMap(item => normalizeTokens(item)));
  const matchedWords: string[] = [];
  wordsA.forEach(w => {
    if (wordsB.has(w)) matchedWords.push(w);
  });
  return { matchCount: matchedWords.length, matchedWords };
}

export function evaluatePathways(profile: UserProfile, _lang: LanguageCode = 'en'): RecommendationMatch[] {
  const skills = Array.isArray(profile?.skills) ? profile.skills : [];
  const interests = Array.isArray(profile?.interests) ? profile.interests : [];
  const currentOcc = profile?.currentOccupation || '';
  const familyOcc = profile?.familyOccupation || '';
  const localContext = profile?.localContext || '';
  const location = profile?.location || '';
  const district = profile?.district || '';

  const userSkillTokens = skills.flatMap(s => normalizeTokens(s));
  const userInterestTokens = interests.flatMap(i => normalizeTokens(i));
  const userOccTokens = normalizeTokens(currentOcc + ' ' + familyOcc);
  const userContextTokens = normalizeTokens(localContext + ' ' + location + ' ' + district);

  // Education tier scoring
  const getEduTier = (edu: string): number => {
    const e = (edu || '').toLowerCase();
    if (e.includes('diploma') || e.includes('polytechnic') || e.includes('degree') || e.includes('graduate') || e.includes('bachelor') || e.includes('b.')) return 4;
    if (e.includes('inter') || e.includes('12') || e.includes('iti') || e.includes('senior')) return 3;
    if (e.includes('10') || e.includes('matric') || e.includes('ssc')) return 2;
    return 1;
  };
  const userEduTier = getEduTier(profile?.education || '');

  const evaluations: RecommendationMatch[] = NSQF_PATHWAYS.map(pathway => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Education compatibility (Max 15 pts)
    const eduDiff = userEduTier - pathway.educationWeight;
    if (eduDiff >= 0) {
      score += 15;
      reasons.push(`Your education (${profile.education || 'Completed'}) satisfies the baseline entry requirement for ${pathway.occupation}.`);
    } else {
      score += 8;
      reasons.push(`Accessible with foundational bridge modules under PM-AJAY GIA special coaching.`);
    }

    // 2. Existing skill overlap (Max 25 pts)
    const pathwaySkillWords = pathway.coreSkills.flatMap(s => normalizeTokens(s));
    const skillOverlap = hasOverlap(userSkillTokens, pathwaySkillWords);
    if (skillOverlap.matchCount > 0) {
      const pts = Math.min(25, 12 + skillOverlap.matchCount * 5);
      score += pts;
      const sample = skills.slice(0, 2).join(', ');
      reasons.push(`Your existing hands-on skills in "${sample}" directly transfer into foundational competencies of this pathway.`);
    } else {
      score += 5;
    }

    // 3. Interest overlap (Max 25 pts)
    const pathwayInterestWords = pathway.associatedInterests.flatMap(i => normalizeTokens(i));
    const interestOverlap = hasOverlap(userInterestTokens, pathwayInterestWords);
    if (interestOverlap.matchCount > 0) {
      const pts = Math.min(25, 14 + interestOverlap.matchCount * 6);
      score += pts;
      const sample = interests.slice(0, 2).join(', ');
      reasons.push(`Directly mirrors your expressed passion for "${sample}".`);
    } else {
      // Check if user interests mention any sector keywords
      const sectorTokens = normalizeTokens(pathway.sector);
      const sectorOverlap = hasOverlap(userInterestTokens, sectorTokens);
      if (sectorOverlap.matchCount > 0) {
        score += 12;
        reasons.push(`Aligns with your broader interest in the ${pathway.sector} ecosystem.`);
      }
    }

    // 4. Current & Family Occupation Relevance (Max 15 pts)
    const occOverlap = hasOverlap(userOccTokens, [...pathwaySkillWords, ...pathwayInterestWords, ...normalizeTokens(pathway.occupation)]);
    if (occOverlap.matchCount > 0) {
      score += 15;
      reasons.push(`Builds on familiarity from your background in "${profile.currentOccupation || profile.familyOccupation}".`);
    } else {
      score += 4;
    }

    // 5. Work Type & Employment Preference (Max 12 pts)
    if (pathway.associatedWorkTypes.includes(profile.preferredWorkType)) {
      score += 7;
      reasons.push(`Matches your preference for ${profile.preferredWorkType} work environments.`);
    }

    if (profile.employmentPreference === 'Either' || pathway.livelihoodModes.includes(profile.employmentPreference)) {
      score += 5;
      if (profile.employmentPreference === 'Self-employment') {
        reasons.push(`High viability for micro-enterprise or independent service workshop via PM-AJAY capital toolkit grant.`);
      } else if (profile.employmentPreference === 'Employment') {
        reasons.push(`Strong placement linkages with regional industrial and contractor networks.`);
      } else {
        reasons.push(`Offers flexible livelihood options in both regular wage employment and self-started enterprise.`);
      }
    }

    // 6. Location / Local Context Relevance (Max 8 pts)
    const contextOverlap = hasOverlap(userContextTokens, pathway.localRelevanceTags.flatMap(t => normalizeTokens(t)));
    if (contextOverlap.matchCount > 0 || profile.localContext) {
      score += 8;
      const locationName = profile.district || profile.location || 'your area';
      reasons.push(`Locally viable given the economic activity and demand noted in ${locationName}.`);
    }

    // Clamp score
    const finalScore = Math.min(98, Math.max(38, Math.round(score)));

    // Categorize alignment
    let alignmentLabel: 'Strong profile alignment' | 'Relevant pathway' | 'Potential pathway' = 'Potential pathway';
    if (finalScore >= 78) {
      alignmentLabel = 'Strong profile alignment';
    } else if (finalScore >= 62) {
      alignmentLabel = 'Relevant pathway';
    }

    // User strengths: User skills that overlap or provide a solid base
    const userStrengths = skills.length > 0
      ? skills
      : ['Practical work ethic', 'Basic smartphone familiarity'];

    // Dynamically calculate missing skills (Skill Gaps)
    // Identify pathway core skills that are not already covered in user's skills
    const userSkillWordSet = new Set(userSkillTokens);
    const coreSkills = Array.isArray(pathway.coreSkills) ? pathway.coreSkills : [];
    const skillGaps = coreSkills.filter(coreSkill => {
      const coreTokens = normalizeTokens(coreSkill);
      // If none of coreTokens are in userSkillWordSet, this is an unmet skill gap!
      return !coreTokens.some(ct => userSkillWordSet.has(ct));
    });

    // Ensure at least 3-4 distinct skill gaps are shown
    const finalGaps = skillGaps.length >= 3 ? skillGaps.slice(0, 4) : coreSkills.slice(0, 4);

    // Filter reasons to ensure 3-5 high-quality concrete reasons
    const uniqueReasons = Array.from(new Set(reasons)).slice(0, 4);
    if (uniqueReasons.length < 3) {
      uniqueReasons.push(`Structured NSQF certification standard provides government-recognized credentialing.`);
    }

    return {
      pathway,
      score: finalScore,
      alignmentLabel,
      matchReasons: uniqueReasons,
      userStrengths,
      skillGaps: finalGaps,
      immediateAction: pathway.trainingAreas?.certification || 'NSQF Qualification Assessment'
    };
  });

  // Sort descending by score
  evaluations.sort((a, b) => b.score - a.score);

  return evaluations;
}

export function generateLocalOpportunities(profile: UserProfile, topPathway?: NSQFPathway): LocalContextOpportunity[] {
  const district = profile?.district || (profile?.location ? profile.location.split(',')[0].trim() : 'District');
  const state = profile?.state || (profile?.location && profile.location.includes(',') ? profile.location.split(',')[1].trim() : 'State');
  const locationLabel = `${district}, ${state}`;

  const opportunities: LocalContextOpportunity[] = [];
  const skills = Array.isArray(profile?.skills) ? profile.skills : [];
  const interests = Array.isArray(profile?.interests) ? profile.interests : [];
  const curOcc = (profile?.currentOccupation || '').toLowerCase();

  if (topPathway && typeof topPathway === 'object' && 'occupation' in topPathway) {
    const tags = Array.isArray(topPathway.localRelevanceTags) ? topPathway.localRelevanceTags : [];
    const tagsText = tags.slice(0, 2).join(', ');
    opportunities.push({
      id: 'opp-1',
      category: topPathway.sector || 'Vocational Skilling',
      title: `${topPathway.occupation} Cluster & Service Demand`,
      relevanceReason: `Identified local clusters in ${district} for ${tagsText || topPathway.occupation}.`,
      hubType: 'Skill Hub (PM-AJAY GIA)',
      locationScope: `${district} & surrounding blocks`,
      schemesApplicable: ['PM-AJAY Grant-in-Aid Component', 'District Skill Development Plan', 'NSQF Skill Certification']
    });
  }

  // Work type specific opportunity
  if (profile?.preferredWorkType === 'Technical' || interests.some(i => /solar|electric|tech|machine/i.test(i))) {
    opportunities.push({
      id: 'opp-2',
      category: 'Solar & Renewable Energy',
      title: 'PM-KUSUM & Solar Rooftop Installation Nodes',
      relevanceReason: `High demand for decentralized solar pump maintenance and domestic rooftop grid technicians across ${district}.`,
      hubType: 'District Livelihood Center',
      locationScope: `${district} Rural & Peri-urban Blocks`,
      schemesApplicable: ['PM-KUSUM Component B/C', 'PM-Surya Ghar Muft Bijli Yojana', 'PM-AJAY Toolkit Grant']
    });
  }

  if (profile?.preferredWorkType === 'Agriculture/allied' || curOcc.includes('farm') || skills.some(s => /agri|farm|crop/i.test(s))) {
    opportunities.push({
      id: 'opp-3',
      category: 'Farm Mechanization & Allied Services',
      title: 'Custom Hiring Center & Agri-Service Node',
      relevanceReason: `Agrarian support centers in ${district} seeking operators for farm machinery overhaul and silage/dairy units.`,
      hubType: 'Rural Enterprise',
      locationScope: `${district} Agrarian Panchayats`,
      schemesApplicable: ['Sub-Mission on Agricultural Mechanization (SMAM)', 'PM-AJAY GIA Self-Help Groups']
    });
  }

  if (profile?.preferredWorkType === 'Manufacturing' || skills.some(s => /stitch|tailor|sew|fabric/i.test(s)) || interests.some(i => /fashion|cloth/i.test(i))) {
    opportunities.push({
      id: 'opp-4',
      category: 'Apparel & Decentralized Production',
      title: 'Garment & Tailoring Common Facility Center',
      relevanceReason: `School uniform procurement, self-help group stitching orders, and local retail boutiques in ${district}.`,
      hubType: 'MSME Cluster',
      locationScope: `${district} Town & Cluster Hubs`,
      schemesApplicable: ['PM-AJAY GIA Women Collective Fund', 'PMEGP Subsidy', 'Apparel Sector Skill Council']
    });
  }

  if (profile?.preferredWorkType === 'Digital' || skills.some(s => /computer|phone|digital/i.test(s))) {
    opportunities.push({
      id: 'opp-5',
      category: 'Digital Services & Citizen Facilitation',
      title: 'Common Service Center (CSC) & Gram Panchayat Sahayak',
      relevanceReason: `Doorstep delivery of e-KYC, Aadhaar-enabled payments, and farmer portal enrollments across ${district}.`,
      hubType: 'Skill Hub (PM-AJAY GIA)',
      locationScope: `${district} Block Headquarters`,
      schemesApplicable: ['Digital India VLE Scheme', 'PM-AJAY Micro-Enterprise Financing']
    });
  }

  // Fallback if needed to ensure at least 3 cards
  if (opportunities.length < 3) {
    opportunities.push({
      id: 'opp-default',
      category: 'Vocational Enterprise Hub',
      title: `District Livelihood & Skilling Center (${locationLabel})`,
      relevanceReason: `Convergence point for NSQF vocational trades, micro-enterprise seed capital, and tooling kits under PM-AJAY.`,
      hubType: 'Skill Hub (PM-AJAY GIA)',
      locationScope: `${district} Central Hub`,
      schemesApplicable: ['PM-AJAY Grant-in-Aid', 'State Skill Development Mission']
    });
  }

  return opportunities.slice(0, 4);
}
