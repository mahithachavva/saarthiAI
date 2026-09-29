import { EmploymentPreference, MobilityConstraint, WorkType } from '../types';

export interface ExtractedInsights {
  education?: string;
  currentOccupation?: string;
  familyOccupation?: string;
  skills?: string[];
  experience?: string;
  interests?: string[];
  employmentPreference?: EmploymentPreference;
  mobilityConstraints?: MobilityConstraint;
  preferredWorkType?: WorkType;
  district?: string;
  state?: string;
}

/**
 * Natural language intent and entity extractor for multilingual Indian user responses
 * Handles Telugu, Hindi, Marathi, Urdu, Tamil, and English natural speech.
 */
export function extractProfileInsights(text: string): ExtractedInsights {
  if (!text || text.trim().length === 0) return {};

  const lower = text.toLowerCase();
  const insights: ExtractedInsights = {};

  // 1. Education Extraction
  if (
    lower.includes('intermediate') ||
    lower.includes('inter ') ||
    lower.includes('12th') ||
    lower.includes('twelfth') ||
    lower.includes('12వ') ||
    lower.includes('12वीं') ||
    lower.includes('12 वी') ||
    lower.includes('بارہویں') ||
    lower.includes('மேல்நிலை') ||
    lower.includes('12-ம்')
  ) {
    insights.education = 'Intermediate (12th)';
  } else if (
    lower.includes('10th') ||
    lower.includes('tenth') ||
    lower.includes('ssc') ||
    lower.includes('10వ') ||
    lower.includes('10वीं') ||
    lower.includes('10 वी') ||
    lower.includes('दहावी') ||
    lower.includes('دسویں') ||
    lower.includes('பத்தாம்') ||
    lower.includes('10-ம்')
  ) {
    insights.education = '10th Standard';
  } else if (
    lower.includes('iti') ||
    lower.includes('ఐటిఐ') ||
    lower.includes('आईटीआई') ||
    lower.includes('آئی ٹی آئی')
  ) {
    insights.education = 'ITI Certified';
  } else if (
    lower.includes('diploma') ||
    lower.includes('polytechnic') ||
    lower.includes('డిప్లొమా') ||
    lower.includes('डिप्लोमा')
  ) {
    insights.education = 'Polytechnic Diploma';
  } else if (
    lower.includes('degree') ||
    lower.includes('graduate') ||
    lower.includes('b.tech') ||
    lower.includes('b.sc') ||
    lower.includes('b.com') ||
    lower.includes('b.a') ||
    lower.includes('గ్రాడ్యుయేట్') ||
    lower.includes('पदवी') ||
    lower.includes('स्नातक') ||
    lower.includes('பட்டதாரி')
  ) {
    insights.education = 'Graduate / Degree';
  } else if (
    lower.includes('below 10th') ||
    lower.includes('8th') ||
    lower.includes('5th') ||
    lower.includes('10వ తరగతి లోపు') ||
    lower.includes('10वीं से कम')
  ) {
    insights.education = 'Below 10th Standard';
  }

  // 2. Current Occupation & Livelihood
  if (
    lower.includes('farming') ||
    lower.includes('agriculture') ||
    lower.includes('kheti') ||
    lower.includes('vyavasayam') ||
    lower.includes('rythu') ||
    lower.includes('farmer') ||
    lower.includes('sheti') ||
    lower.includes('shetkari') ||
    lower.includes('விவசாயம்') ||
    lower.includes('کاشتکاری')
  ) {
    insights.currentOccupation = 'Farming / Agriculture';
  } else if (
    lower.includes('tailor') ||
    lower.includes('stitching') ||
    lower.includes('sewing') ||
    lower.includes('kuttupani') ||
    lower.includes('silai') ||
    lower.includes('தையல்') ||
    lower.includes('سلائی')
  ) {
    insights.currentOccupation = 'Tailoring';
  } else if (
    lower.includes('electric') ||
    lower.includes('wiring') ||
    lower.includes('bijli') ||
    lower.includes('వయరింగ్') ||
    lower.includes('மின்சாரம்')
  ) {
    insights.currentOccupation = 'Electrical helper';
  } else if (
    lower.includes('coolie') ||
    lower.includes('daily wage') ||
    lower.includes('majoori') ||
    lower.includes('shramik') ||
    lower.includes('కూలీ') ||
    lower.includes('मजदूर') ||
    lower.includes('தினக்கூலி')
  ) {
    insights.currentOccupation = 'Daily wage labour';
  } else if (
    lower.includes('unemployed') ||
    lower.includes('no job') ||
    lower.includes('seeking') ||
    lower.includes('ఖాళీగా') ||
    lower.includes('बेरोजगार') ||
    lower.includes('வேலை இல்லை')
  ) {
    insights.currentOccupation = 'Seeking first job';
  }

  // 3. Family Occupation
  if (
    lower.includes('family agriculture') ||
    lower.includes('maa family agriculture') ||
    lower.includes('khandani kheti') ||
    lower.includes('ghar me kheti') ||
    lower.includes('ancestral') ||
    lower.includes('కుటుంబం వ్యవసాయం')
  ) {
    insights.familyOccupation = 'Agriculture';
  } else if (
    lower.includes('weaving') ||
    lower.includes('handloom') ||
    lower.includes('chenetha') ||
    lower.includes('bunkar') ||
    lower.includes('విణకల') ||
    lower.includes('நெசவு')
  ) {
    insights.familyOccupation = 'Handloom / Weaving';
  } else if (
    lower.includes('mason') ||
    lower.includes('construction') ||
    lower.includes('mistri') ||
    lower.includes('మేస్త్రీ') ||
    lower.includes('राजमिस्त्री') ||
    lower.includes('கட்டுமானம்')
  ) {
    insights.familyOccupation = 'Masonry / Construction';
  } else if (
    lower.includes('cattle') ||
    lower.includes('dairy') ||
    lower.includes('cows') ||
    lower.includes('buffalo') ||
    lower.includes('పశువు') ||
    lower.includes('पशुपालन') ||
    lower.includes('பால் பண்ணை')
  ) {
    insights.familyOccupation = 'Animal Husbandry';
  }

  // 4. Skills extraction
  const detectedSkills: string[] = [];
  if (
    lower.includes('agriculture') ||
    lower.includes('farming') ||
    lower.includes('kheti') ||
    lower.includes('vyavasayam')
  ) {
    detectedSkills.push('Agriculture');
  }
  if (
    lower.includes('machinery') ||
    lower.includes('machine') ||
    lower.includes('tractor') ||
    lower.includes('pump') ||
    lower.includes('యంత్ర') ||
    lower.includes('मशीन')
  ) {
    detectedSkills.push('Basic machinery handling');
  }
  if (
    lower.includes('phone') ||
    lower.includes('smartphone') ||
    lower.includes('mobile') ||
    lower.includes('స్మార్ట్‌ఫోన్') ||
    lower.includes('ఫోన్')
  ) {
    detectedSkills.push('Smartphone usage');
  }
  if (
    lower.includes('stitching') ||
    lower.includes('tailoring') ||
    lower.includes('embroidery') ||
    lower.includes('silai') ||
    lower.includes('కుట్టు')
  ) {
    detectedSkills.push('Stitching, basic embroidery');
  }
  if (
    lower.includes('wiring') ||
    lower.includes('electric') ||
    lower.includes('electrical') ||
    lower.includes('bijli') ||
    lower.includes('వైరింగ్')
  ) {
    detectedSkills.push('Wiring, basic electrical repair');
  }
  if (
    lower.includes('typing') ||
    lower.includes('computer') ||
    lower.includes('laptop') ||
    lower.includes('కంప్యూటర్')
  ) {
    detectedSkills.push('Computer typing');
  }
  if (
    lower.includes('driving') ||
    lower.includes('driver') ||
    lower.includes('డ్రైవింగ్')
  ) {
    detectedSkills.push('Motor driving');
  }
  if (detectedSkills.length > 0) {
    insights.skills = detectedSkills;
  }

  // 5. Interests extraction
  const detectedInterests: string[] = [];
  if (
    lower.includes('solar') ||
    lower.includes('solar technology') ||
    lower.includes('solar pump') ||
    lower.includes('సోలార్') ||
    lower.includes('सोलर') ||
    lower.includes('சூர்ய') ||
    lower.includes('سولر')
  ) {
    detectedInterests.push('Solar technology');
  }
  if (
    lower.includes('electrical') ||
    lower.includes('electronics') ||
    lower.includes('electric work') ||
    lower.includes('ఎలక్ట్రికల్')
  ) {
    detectedInterests.push('Electrical work');
  }
  if (
    lower.includes('fashion') ||
    lower.includes('boutique') ||
    lower.includes('online selling') ||
    lower.includes('garments') ||
    lower.includes('ఫ్యాషన్')
  ) {
    detectedInterests.push('Fashion and online selling');
  }
  if (
    lower.includes('digital') ||
    lower.includes('csc') ||
    lower.includes('online services') ||
    lower.includes('డిజిటల్')
  ) {
    detectedInterests.push('Digital services & CSC');
  }
  if (
    lower.includes('repair') ||
    lower.includes('mobile repair') ||
    lower.includes('రిపేర్')
  ) {
    detectedInterests.push('Mobile phone repair');
  }
  if (
    lower.includes('organic') ||
    lower.includes('natural farming') ||
    lower.includes('సేంద్రీయ')
  ) {
    detectedInterests.push('Organic farming');
  }
  if (detectedInterests.length > 0) {
    insights.interests = detectedInterests;
  }

  // 6. Employment Preference Extraction
  if (
    lower.includes('own business') ||
    lower.includes('start business') ||
    lower.includes('start something') ||
    lower.includes('self employment') ||
    lower.includes('self-employment') ||
    lower.includes('swayam upadhi') ||
    lower.includes('own shop') ||
    lower.includes('swantaha') ||
    lower.includes('apna business') ||
    lower.includes('apni dukan') ||
    lower.includes('khud ka') ||
    lower.includes('స్వంత వ్యాపారం') ||
    lower.includes('స్వయం ఉపాధి') ||
    lower.includes('स्वरोजगार') ||
    lower.includes('சொந்த தொழில்') ||
    lower.includes('خود روزگار')
  ) {
    insights.employmentPreference = 'Self-employment';
  } else if (
    lower.includes('job') ||
    lower.includes('salaried') ||
    lower.includes('naukri') ||
    lower.includes('udyogam') ||
    lower.includes('ఉద్యోగం') ||
    lower.includes('नोकरी') ||
    lower.includes('வேலை') ||
    lower.includes('ملازمت')
  ) {
    insights.employmentPreference = 'Employment';
  } else if (
    lower.includes('either') ||
    lower.includes('both') ||
    lower.includes('dono') ||
    lower.includes('rendu') ||
    lower.includes('ఏదైనా') ||
    lower.includes('काहीही')
  ) {
    insights.employmentPreference = 'Either';
  }

  // 7. Preferred Work Type
  if (
    lower.includes('solar') ||
    lower.includes('technical') ||
    lower.includes('electric') ||
    lower.includes('machine') ||
    lower.includes('టెక్నికల్') ||
    lower.includes('तकनीकी')
  ) {
    insights.preferredWorkType = 'Technical';
  } else if (
    lower.includes('farming') ||
    lower.includes('agriculture') ||
    lower.includes('dairy') ||
    lower.includes('organic') ||
    lower.includes('వ్యవసాయం') ||
    lower.includes('कृषि')
  ) {
    insights.preferredWorkType = 'Agriculture/allied';
  } else if (
    lower.includes('digital') ||
    lower.includes('computer') ||
    lower.includes('csc') ||
    lower.includes('data entry') ||
    lower.includes('డిజిటల్')
  ) {
    insights.preferredWorkType = 'Digital';
  } else if (
    lower.includes('fashion') ||
    lower.includes('tailoring') ||
    lower.includes('garments') ||
    lower.includes('fabrication')
  ) {
    insights.preferredWorkType = 'Manufacturing';
  }

  // 8. Experience extraction
  const expMatch = lower.match(/(\d+)\s*(years?|yrs?|saal|samvatsar|varsham|ஆண்டுகள்|سال)/i);
  if (expMatch && expMatch[1]) {
    insights.experience = `${expMatch[1]} years`;
  } else if (
    lower.includes('fresher') ||
    lower.includes('no experience') ||
    lower.includes('kotha') ||
    lower.includes('కొత్త') ||
    lower.includes('अनुभव नाही') ||
    lower.includes('کوئی تجربہ نہیں')
  ) {
    insights.experience = 'Fresher (0 years)';
  }

  return insights;
}
