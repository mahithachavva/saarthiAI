import { NSQFPathway } from '../types';

export const NSQF_PATHWAYS: NSQFPathway[] = [
  {
    id: 'solar-pv-tech',
    occupation: 'Solar PV Technician',
    sector: 'Green Energy & Power',
    indicativeNsqfLevel: 4,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Solar Panel Installation & Inverter Maintenance).',
    requiredEducationMin: '10th Standard / ITI',
    educationWeight: 2,
    coreSkills: [
      'PV module mounting',
      'Inverter wiring',
      'Battery storage setup',
      'Electrical safety',
      'System diagnostics',
      'Preventive maintenance'
    ],
    associatedInterests: ['Solar technology', 'Renewable energy', 'Electrical work', 'Technical repairs', 'Green energy', 'Solar'],
    associatedWorkTypes: ['Technical', 'Services'],
    livelihoodModes: ['Employment', 'Self-employment'],
    potentialLivelihoodModeDisplay: 'Employment / Self-employment / Enterprise',
    trainingAreas: {
      theory: ['Photovoltaic principles', 'DC/AC circuit fundamentals', 'Safety standards IEC/IS', 'Grid integration'],
      practical: ['Roof mount installation', 'Crimping & conduit routing', 'Inverter synchronization', 'Solar pumping systems'],
      certification: 'PM-KUSUM & PM-Surya Ghar aligned Solar Technician Certification'
    },
    localRelevanceTags: ['Solar pump installation', 'Rooftop solar', 'Agri-solar farms', 'Microgrid maintenance'],
    description: {
      en: 'Specialized role installing, commissioning, and maintaining rooftop and agricultural solar photovoltaic systems.',
      te: 'సౌర విద్యుత్ ప్యానెల్స్, ఇన్వర్టర్ల అమరిక మరియు నిర్వహణలో నైపుణ్యం కలిగిన కెరీర్ మార్గం.',
      hi: 'सौर पैनलों की स्थापना, इनवर्टर वायरिंग और रख-रखाव के लिए विशेष तकनीकी आजीविका मार्ग।',
      mr: 'सौर पॅनेल बसवणे, इनव्हर्टर वायरिंग आणि देखभाल यावर आधारित तांत्रिक उपजीविका मार्ग.',
      ur: 'سولر پینل کی تنصیب اور انورٹر مینٹیننس سے متعلق تکنیکی روزگار کا راستہ۔',
      ta: 'சூரிய ஒளி தகடுகள் நிறுவுதல் மற்றும் பராமரிப்பு சார்ந்த தொழில்நுட்ப வேலைவாய்ப்பு பாதை.'
    },
    nextSteps: {
      en: 'Enroll in 300-hour NSQF solar module at district ITI / PM-AJAY GIA partner training center followed by on-site apprenticeship.',
      te: 'జిల్లా ITI / PM-AJAY శిక్షణా కేంద్రంలో 300 గంటల సోలార్ మాడ్యూల్ పూర్తి చేసి సర్టిఫికేషన్ పొందండి.',
      hi: 'जिला ITI या PM-AJAY GIA प्रशिक्षण केंद्र में 300 घंटे के सोलर मॉड्यूल में नामांकन व व्यावहारिक प्रशिक्षण।',
      mr: 'जिल्हा ITI / PM-AJAY प्रशिक्षण केंद्रात 300 तासांच्या सोलर मॉड्यूलमध्ये नोंदणी करा.',
      ur: 'ضلعی آئی ٹی آئی یا پی ایم اجے جی آئی اے مرکز میں 300 گھنٹے کے سولر ماڈیول میں داخلہ لیں۔',
      ta: 'மாவட்ட தொழிற்பயிற்சி மையம் அல்லது PM-AJAY மையத்தில் 300 மணிநேர பயிற்சியில் சேருங்கள்.'
    },
    pmAjayGiaFocus: 'Eligible for tool-kit grant and PM-Surya Ghar vendor empanelment under PM-AJAY GIA entrepreneurship.'
  },
  {
    id: 'agri-machinery-tech',
    occupation: 'Agricultural Equipment Technician',
    sector: 'Agriculture & Farm Mechanization',
    indicativeNsqfLevel: 4,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Tractor & Farm Implement Servicing).',
    requiredEducationMin: '8th to 10th Standard',
    educationWeight: 2,
    coreSkills: [
      'Tractor engine overhaul',
      'Hydraulic system maintenance',
      'Harvester & tiller calibration',
      'Pesticide sprayer repair',
      'Mechanical maintenance',
      'Equipment diagnostics'
    ],
    associatedInterests: ['Farming', 'Machinery handling', 'Mechanical work', 'Agriculture', 'Equipment repair', 'Tractor maintenance'],
    associatedWorkTypes: ['Technical', 'Agriculture/allied'],
    livelihoodModes: ['Employment', 'Self-employment'],
    potentialLivelihoodModeDisplay: 'Custom Hiring Center / Mobile Mechanic / Farm Workshop',
    trainingAreas: {
      theory: ['Internal combustion engine mechanics', 'Agricultural hydraulics', 'Lubrication cycles', 'Safety diagnostics'],
      practical: ['Gearbox servicing', 'Nozzle & pump cleaning', 'Field diagnostic drills', 'Implement hitching'],
      certification: 'Agricultural Machinery Operator & Technician Qualification'
    },
    localRelevanceTags: ['Tractor servicing', 'Sprayer repair', 'Custom hiring centers', 'Harvesting machinery'],
    description: {
      en: 'Field technician capable of servicing tractors, pump sets, power tillers, and farm machinery for agrarian hubs.',
      te: 'ట్రాక్టర్లు, పంపుసెట్లు, వ్యవసాయ యంత్రాల రిపేర్ మరియు మెయింటెనెన్స్ నైపుణ్య మార్గం.',
      hi: 'ट्रैक्टर, स्प्रेयर, और कृषि उपकरणों की मरम्मत और कस्टम हायरिंग सेंटर संचालन।',
      mr: 'ट्रॅक्टर आणि शेती उपकरणांची दुरुस्ती व देखभाल तंत्रज्ञ.',
      ur: 'زرعی مشینری، ٹریکٹر اور پمپ سیٹ کی مرمت و دیکھ بھال کی تربیت۔',
      ta: 'டிராக்டர் மற்றும் நவீன விவசாய இயந்திரங்கள் பழுதுபார்க்கும் தொழில்நுட்ப பாதை.'
    },
    nextSteps: {
      en: 'Complete Farm Mechanization Technician Module and apply for Custom Hiring Center tool subsidy under PM-AJAY GIA.',
      te: 'ఫార్మ్ మెకనైజేషన్ టెక్నీషియన్ కోర్సు పూర్తి చేసి PM-AJAY GIA సాధనాల సబ్సిడీ కోసం దరఖాస్తు చేసుకోండి.',
      hi: 'कृषि मशीनीकरण कोर्स पूरा करें और PM-AJAY GIA योजना के तहत कस्टम हायरिंग सेंटर टूलकिट सहायता लें।',
      mr: 'कृषी यांत्रिकीकरण अभ्यासक्रम पूर्ण करून टूलकिट अनुदानासाठी अर्ज करा.',
      ur: 'کاشتکاری مشینری ٹریننگ مکمل کریں اور پی ایم اجے گرانٹ سے ٹول کٹ حاصل کریں۔',
      ta: 'விவசாய இயந்திர தொழில்நுட்ப பயிற்சியை முடித்து PM-AJAY உபகரண மானியத்திற்கு விண்ணப்பிக்கவும்.'
    },
    pmAjayGiaFocus: 'Custom Hiring Center capital grant and mobile repair van support for SC youth collectives.'
  },
  {
    id: 'electrician-domestic-industrial',
    occupation: 'Electrician (Domestic & Rural Services)',
    sector: 'Construction & Power',
    indicativeNsqfLevel: 3,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Domestic Solutions & Electrical Wiring).',
    requiredEducationMin: '10th Standard',
    educationWeight: 2,
    coreSkills: [
      'House wiring & conduit pipe installation',
      'Switchgear & MCB connection',
      'Earth testing & lightning safety',
      'Motor rewinding & pump starter repair',
      'Electrical safety procedures',
      'Multimeter diagnostics'
    ],
    associatedInterests: ['Electrical work', 'Wiring', 'Electronics', 'Domestic repairs', 'Technical work', 'Appliances'],
    associatedWorkTypes: ['Technical', 'Services'],
    livelihoodModes: ['Employment', 'Self-employment'],
    potentialLivelihoodModeDisplay: 'Independent Electrician / Contractor / Facility Service',
    trainingAreas: {
      theory: ['Single & three phase circuits', 'Ohm’s law & power factor', 'Earthing standards', 'Electrical codes'],
      practical: ['Conduit bending', 'Distribution box wiring', 'Motor coil continuity tests', 'Safety drills'],
      certification: 'Certified Wireman / Domestic Electrician (National Apprenticeship Aligned)'
    },
    localRelevanceTags: ['Rural electrification', 'Domestic wiring', 'Agri pump starter servicing', 'Commercial wiring'],
    description: {
      en: 'Certified electrical service provider for household wiring, motor starter repairs, and rural power maintenance.',
      te: 'గృహ వైరింగ్, మోటార్ స్టార్టర్ రిపేర్లు మరియు విద్యుత్ భద్రతా పనులలో స్వయం ఉపాధి మరియు ఉద్యోగ మార్గం.',
      hi: 'घरेलू वायरिंग, मोटर स्टार्टर मरम्मत और सुरक्षित विद्युत उपकरण संचालन आजीविका।',
      mr: 'घरगुती वायरिंग, मोटर दुरुस्ती आणि वीज उपकरणांची सुरक्षित सेवा.',
      ur: 'گھریلو وائرنگ، پمپ اسٹارٹر کی مرمت اور برقی خدمات کا باضابطہ کورس۔',
      ta: 'வீட்டு மின்னிணைப்பு மற்றும் மின்சார மோட்டார் பராமரிப்பு சார்ந்த சுயதொழில் பாதை.'
    },
    nextSteps: {
      en: 'Apply for District Skill Committee certified Wireman course with PM-AJAY starter toolkit allocation.',
      te: 'వైర్మన్ శిక్షణలో చేరి PM-AJAY కిట్ సదుపాయం కోసం దరఖాస్తు చేయండి.',
      hi: 'वायरमैन प्रशिक्षण में शामिल हों और PM-AJAY विद्युत टूलकिट का लाभ लें।',
      mr: 'वायरमन प्रमाणन पूर्ण करून व्यावसायिक विद्युत टूलकिट मिळवा.',
      ur: 'وائر مین کورس کریں اور پی ایم اجے ٹول کٹ کے لیے رجوع کریں۔',
      ta: 'வயரிங் சான்றிதழ் பெற்று PM-AJAY கருவி தொகுப்புக்கு விண்ணப்பிக்கவும்.'
    },
    pmAjayGiaFocus: 'Direct wireman toolkit assistance and local panchayat service contract linkage under PM-AJAY GIA.'
  },
  {
    id: 'tailoring-apparel-fashion',
    occupation: 'Tailoring & Apparel Fabrication',
    sector: 'Apparel, Made-Ups & Home Furnishing',
    indicativeNsqfLevel: 3,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Self-Employed Tailor & Garment Maker).',
    requiredEducationMin: 'Primary / 8th Standard',
    educationWeight: 1,
    coreSkills: [
      'Pattern making & garment cutting',
      'Industrial motorized sewing',
      'Embroidery & finishing',
      'Measurement accuracy',
      'Fabric quality inspection',
      'Costing & pricing'
    ],
    associatedInterests: ['Tailoring', 'Stitching', 'Embroidery', 'Fashion and online selling', 'Fashion', 'Crafts', 'Boutique', 'Textiles'],
    associatedWorkTypes: ['Manufacturing', 'Services', 'Other'],
    livelihoodModes: ['Self-employment', 'Employment'],
    potentialLivelihoodModeDisplay: 'Boutique / Garment Cluster / E-commerce Self-Help Group',
    trainingAreas: {
      theory: ['Garment construction geometry', 'Textile weave properties', 'Basic micro-enterprise ledger', 'Digital cataloging'],
      practical: ['Overlock machine handling', 'Blouse and kurta drafting', 'Hemming & zip attachment', 'Product photography for sales'],
      certification: 'Self-Employed Tailor Certification (Apparel SSC)'
    },
    localRelevanceTags: ['Local boutique', 'School uniform contracts', 'Self-help group cluster', 'E-commerce craft selling'],
    description: {
      en: 'Commercial tailoring, boutique fashion production, and decentralized apparel manufacturing for local and e-commerce markets.',
      te: 'టైలరింగ్, డ్రెస్ డిజైనింగ్, మరియు స్వయం సహాయక బృందాల ద్వారా దుస్తుల తయారీ వ్యాపారం.',
      hi: 'सिलाई, कटाई, बुटीक संचालन और स्थानीय व ऑनलाइन वस्त्र निर्माण व्यवसाय।',
      mr: 'शिलाई, कपडे डिझाईन आणि बुटीक व्यवसाय उभारणीसाठी कौशल्य मार्ग.',
      ur: 'سلائی کڑھائی، فیشن اور آن لائن گارمنٹس کاروبار کا خود روزگار راستہ۔',
      ta: 'தையல் கலை, ஆடை வடிவமைப்பு மற்றும் ஆன்லைன் விற்பனைக்கான தொழில் முறை பயிற்சி.'
    },
    nextSteps: {
      en: 'Enroll in advanced garment fabrication batch; obtain sewing machinery subsidy via PM-AJAY GIA women/youth collective.',
      te: 'అధునాతన గార్మెంట్ బ్యాచ్‌లో చేరండి; PM-AJAY ద్వారా మోటరైజ్డ్ మెషీన్ గ్రాంట్ పొందండి.',
      hi: 'उन्नत सिलाई प्रशिक्षण लें और PM-AJAY GIA के माध्यम से सिलाई मशीन अनुदान का लाभ उठाएं।',
      mr: 'प्रगत शिवणकाम शिका आणि PM-AJAY GIA अंतर्गत मशीन अनुदान मिळवा.',
      ur: 'جدید ٹیلرنگ میں مہارت حاصل کریں اور پی ایم اجے کے تحت سلائی مشین گرانٹ لیں۔',
      ta: 'மேம்பட்ட தையல் பயிற்சியில் சேர்ந்து தையல் இயந்திர மானியத்தைப் பெறுங்கள்.'
    },
    pmAjayGiaFocus: 'Special preference for motorized sewing machines and common facility center access under PM-AJAY GIA.'
  },
  {
    id: 'food-processing-technician',
    occupation: 'Food Processing & Value Addition Technician',
    sector: 'Food Processing',
    indicativeNsqfLevel: 4,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Fruit, Vegetable & Grain Processing).',
    requiredEducationMin: '10th Standard',
    educationWeight: 2,
    coreSkills: [
      'Food safety hygiene (FSSAI norms)',
      'Solar drying & dehydration',
      'Batch processing & pasteurization',
      'Packaging & sealing',
      'Quality testing (Brix, moisture)',
      'Preservative measurement'
    ],
    associatedInterests: ['Food processing', 'Cooking', 'Agri-processing', 'Pickles & spices', 'Dairy', 'Packaging', 'Food business'],
    associatedWorkTypes: ['Agriculture/allied', 'Manufacturing', 'Services'],
    livelihoodModes: ['Self-employment', 'Employment'],
    potentialLivelihoodModeDisplay: 'Micro Food Enterprise / Processing Unit / Producer Group',
    trainingAreas: {
      theory: ['Microbiology and spoilage prevention', 'FSSAI packaging laws', 'Cold-chain management', 'Nutritional labeling'],
      practical: ['Solar dehydrator operation', 'Vacuum sealer calibration', 'Quality titration tests', 'Inventory tracking'],
      certification: 'Food Safety & Processing Supervisor Certificate'
    },
    localRelevanceTags: ['Chilli/Spice grinding units', 'Millet processing', 'Fruit pulp extraction', 'Snack manufacturing'],
    description: {
      en: 'Value addition to local crops, spices, and produce through standardized preservation, packaging, and FSSAI-compliant processing.',
      te: 'స్థానిక వ్యవసాయ ఉత్పత్తుల ప్రాసెసింగ్, ప్యాకేజింగ్ మరియు ఆహార నాణ్యతా ప్రమాణాల వ్యాపార మార్గం.',
      hi: 'कृषि उपज का मूल्य संवर्धन, पैकेजिंग, और FSSAI नियमों के तहत खाद्य प्रसंस्करण उद्यम।',
      mr: 'कृषी उत्पादनांवर प्रक्रिया, पॅकेजिंग आणि अन्न प्रक्रिया उद्योग.',
      ur: 'غذائی اشیاء کی پراسیسنگ، پیکنگ اور معیاری فوڈ بزنس کا پلیٹ فارم۔',
      ta: 'உணவு பதப்படுத்துதல், தரம் பிரித்தல் மற்றும் பேக்கேஜிங் தொழில் வாய்ப்பு.'
    },
    nextSteps: {
      en: 'Join PM-FME / PM-AJAY convergence food processing training and set up an FSSAI-compliant village unit.',
      te: 'PM-FME & PM-AJAY ఆహార ప్రాసెసింగ్ శిక్షణ పొంది FSSAI అనుమతులతో యూనిట్ ప్రారంభించండి.',
      hi: 'खाद्य प्रसंस्करण प्रशिक्षण में भाग लें और सूक्ष्म उद्यम इकाई के लिए सहायता प्राप्त करें।',
      mr: 'अन्न प्रक्रिया प्रशिक्षण घ्या आणि सूक्ष्म खाद्य प्रक्रिया केंद्र सुरू करा.',
      ur: 'فوڈ پراسیسنگ کورس کریں اور فوڈ سیفٹی سرٹیفکیٹ حاصل کریں۔',
      ta: 'உணவு பதப்படுத்தும் பயிற்சியில் இணைந்து எஃப்.எஸ்.எஸ்.ஏ.ஐ சான்றிதழ் பெறவும்.'
    },
    pmAjayGiaFocus: 'Capital subsidy for micro-processing equipment and Common Infrastructure Centers in SC habitations.'
  },
  {
    id: 'data-entry-digital-services',
    occupation: 'Data Entry & Digital Services Specialist',
    sector: 'IT-ITeS & Digital Governance',
    indicativeNsqfLevel: 4,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Domestic Data Entry & CSC Operator).',
    requiredEducationMin: '10th / 12th Standard',
    educationWeight: 2,
    coreSkills: [
      'High-speed typing (30+ wpm)',
      'Spreadsheet & document management',
      'Government portal transactions (DBT, Aadhaar, e-KYC)',
      'Basic cyber hygiene',
      'Customer documentation scanning',
      'Internet banking & UPI facilitation'
    ],
    associatedInterests: ['Computer skills', 'Digital services', 'Internet', 'Data entry', 'Typing', 'Online services', 'CSC center', 'Banking'],
    associatedWorkTypes: ['Digital', 'Services'],
    livelihoodModes: ['Employment', 'Self-employment'],
    potentialLivelihoodModeDisplay: 'Common Service Center (CSC) / Panchayat Sahayak / Back-office Executive',
    trainingAreas: {
      theory: ['Information security protocols', 'Database records organization', 'E-governance portal architecture', 'English/Vernacular data entry'],
      practical: ['Spreadsheet formulas & reporting', 'Biometric scanner integration', 'Speed typing drills', 'Online certificate applications'],
      certification: 'Domestic Data Entry Operator (DDEO) / NIELIT Digital Facilitator'
    },
    localRelevanceTags: ['CSC center operator', 'Gram Panchayat computer assistant', 'Banking correspondent', 'Local business billing'],
    description: {
      en: 'Operate rural digital kiosks, deliver citizen government services, and handle digitized accounting and document management.',
      te: 'గ్రామీణ డిజిటల్ సేవా కేంద్రాలు, డేటా ఎంట్రీ, ప్రభుత్వ పోర్టల్ లావాదేవీలు మరియు కంప్యూటర్ పనులు.',
      hi: 'कॉमन सर्विस सेंटर (CSC), डेटा प्रविष्टि, सरकारी पोर्टल सेवाएं और डिजिटल सहायता कार्य।',
      mr: 'डिजिटल सेवा केंद्र, डेटा एंट्री आणि ई-गव्हर्नन्स सेवा संचालक.',
      ur: 'ڈیجیٹل سروسز، ڈیٹا انٹری اور سی ایس سی سینٹر کے ذریعے خود روزگار۔',
      ta: 'டிஜிட்டல் சேவை மையம், கணினி தகவல் உள்ளீடு மற்றும் இ-சேவை மேலாளர்.'
    },
    nextSteps: {
      en: 'Complete CSC VLE digital credential program and utilize PM-AJAY kiosk computer grant.',
      te: 'CSC డిజిటల్ కోర్సు పూర్తి చేసి PM-AJAY కంప్యూటర్ కియోస్క్ గ్రాంట్ పొందండి.',
      hi: 'डिजिटल सेवा प्रमाणन पूरा करें और PM-AJAY डिजिटल कियोस्क सहायता प्राप्त करें।',
      mr: 'CSC व्हीएलई प्रशिक्षण पूर्ण करून संगणक कियोस्क अनुदानासाठी अर्ज करा.',
      ur: 'ڈیجیٹل سروس سرٹیفکیٹ لیں اور کیوسک مشینری گرانٹ کے لیے اپلائی کریں۔',
      ta: 'சி.எஸ்.சி இ-சேவை பயிற்சியை முடித்து கணினி மானியத்திற்கு விண்ணப்பிக்கவும்.'
    },
    pmAjayGiaFocus: 'Financing for laptop, biometric scanner, and printer for village digital enterprise under PM-AJAY GIA.'
  },
  {
    id: 'mobile-phone-repair',
    occupation: 'Mobile Phone & Smart Device Hardware Repairer',
    sector: 'Electronics & Hardware',
    indicativeNsqfLevel: 4,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Field Technician - Computing and Peripherals).',
    requiredEducationMin: '10th Standard',
    educationWeight: 2,
    coreSkills: [
      'SMD component soldering & de-soldering',
      'Touchscreen & display replacement',
      'Micro-USB / Type-C port repair',
      'Firmware flashing & software recovery',
      'Battery testing & charging circuit checks',
      'Multimeter trace analysis'
    ],
    associatedInterests: ['Mobile phone repair', 'Electronics', 'Smartphones', 'Gadgets', 'Hardware repair', 'Troubleshooting'],
    associatedWorkTypes: ['Technical', 'Services'],
    livelihoodModes: ['Self-employment', 'Employment'],
    potentialLivelihoodModeDisplay: 'Independent Mobile Repair Shop / Multi-Brand Service Franchise',
    trainingAreas: {
      theory: ['Micro-soldering temperature profiles', 'PCB schematic reading', 'Android/iOS diagnostic modes', 'ESD prevention'],
      practical: ['Microscope-aided track jumpering', 'Screen separator operation', 'Hot air gun usage', 'OS restoration'],
      certification: 'Electronics Sector Skills Council Mobile Repair Technician'
    },
    localRelevanceTags: ['Local market repair shop', 'Refurbished phone sales', 'Accessory retailing', 'Tablet servicing'],
    description: {
      en: 'Diagnose and fix smartphone hardware faults, broken displays, charging ICs, and operating system glitches.',
      te: 'స్మార్ట్‌ఫోన్లు మరియు ఎలక్ట్రానిక్ పరికరాల స్క్రీన్, బోర్డు రిపేర్లలో లాభదాయక స్వయం ఉపాధి.',
      hi: 'स्मार्टफोन, टैबलेट और इलेक्ट्रॉनिक उपकरणों की हार्डवेयर व सॉफ्टवेयर मरम्मत व्यवसाय।',
      mr: 'मोबाईल फोन दुरुस्ती, स्क्रीन बदलणे आणि हार्डवेअर देखभाल व्यवसाय.',
      ur: 'موبائل فون ہارڈویئر، اسکرین اور سافٹ ویئر مرمت کا بہترین ہنر۔',
      ta: 'செல்போன் பழுதுநீக்குதல், திரை மாற்றுதல் மற்றும் மென்பொருள் சீரமைப்பு தொழில்.'
    },
    nextSteps: {
      en: 'Complete 4-week intensive micro-soldering bootcamp and apply for specialized tool kit via PM-AJAY GIA.',
      te: '4 వారాల మైక్రో-సోల్డరింగ్ బూట్‌క్యాంప్ పూర్తి చేసి టూల్ కిట్ సహాయం పొందండి.',
      hi: '4-सप्ताह का सोल्डरिंग कोर्स पूरा करें और PM-AJAY टूलकिट के लिए आवेदन करें।',
      mr: 'मोबाईल रिपेअरिंग प्रगत अभ्यासक्रम पूर्ण करून टूलकिट सहाय्य मिळवा.',
      ur: 'موبائل ریپئرنگ کی جدید ٹریننگ لیں اور ضروری اوزار کٹ حاصل کریں۔',
      ta: 'செல்போன் பழுதுபார்க்கும் சிறப்பு பயிற்சியை முடித்து டூல்கிட் மானியம் பெறவும்.'
    },
    pmAjayGiaFocus: 'Supply of precision soldering station, ultrasonic cleaner, and test meters for SC entrepreneurs.'
  },
  {
    id: 'dairy-agri-allied',
    occupation: 'Dairy Farm Management & Livestock Allied Services',
    sector: 'Agriculture & Animal Husbandry',
    indicativeNsqfLevel: 3,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Dairy Worker & Livestock Supervisor).',
    requiredEducationMin: 'Primary / 8th Standard',
    educationWeight: 1,
    coreSkills: [
      'Silage preparation & animal nutrition',
      'Automated milking machine hygiene',
      'First aid & de-worming assistance',
      'Milk fat & SNF testing',
      'Biogas digester maintenance',
      'Chilling center logistics'
    ],
    associatedInterests: ['Dairy', 'Farming', 'Cattle rearing', 'Agriculture', 'Veterinary allied', 'Livestock', 'Organic manure'],
    associatedWorkTypes: ['Agriculture/allied', 'Services'],
    livelihoodModes: ['Self-employment', 'Employment'],
    potentialLivelihoodModeDisplay: 'Mini Dairy Unit / Milk Collection Point / Cooperative Livelihood',
    trainingAreas: {
      theory: ['Bovine feed formulation', 'Disease symptomatology', 'Clean milk protocols', 'Cooperative procurement systems'],
      practical: ['Lactometer & milk analyzer use', 'Green fodder preservation', 'Sanitizing milking pipelines', 'Biomass composting'],
      certification: 'Animal Husbandry & Dairy Management Certificate'
    },
    localRelevanceTags: ['Dairy collection route', 'Silage enterprise', 'Organic compost selling', 'Breed improvement services'],
    description: {
      en: 'Scientific dairy management, hygienic milk collection, silage preservation, and livestock allied entrepreneurship.',
      te: 'శాస్త్రీయ పాల ఉత్పత్తుల నిర్వహణ, పశువుల పోషణ, సైలేజ్ తయారీ మరియు డెయిరీ సహకార వ్యాపారం.',
      hi: 'डेयरी प्रबंधन, स्वच्छ दुग्ध उत्पादन, पशु पोषण और सहकारिता से जुड़ा सतत आजीविका मॉडल।',
      mr: 'दुग्ध व्यवसाय व्यवस्थापन, पशुसंवर्धन आणि चारा प्रक्रिया उद्योग.',
      ur: 'ڈیری فارم مینجمنٹ اور مویشی پالن کی جدید و منافع بخش تربیت۔',
      ta: 'நவீன பால் பண்ணை மேலாண்மை மற்றும் கால்நடை பராமரிப்பு தொழில்.'
    },
    nextSteps: {
      en: 'Connect with District Animal Husbandry department for PM-AJAY GIA livestock shed and milch animal grant.',
      te: 'PM-AJAY పశువుల షెడ్ మరియు డెయిరీ సబ్సిడీ కోసం జిల్లా పశుసంవర్ధక శాఖను సంప్రదించండి.',
      hi: 'पशुपालन विभाग से जुड़कर PM-AJAY योजनांतर्गत शेड व पशुधन अनुदान प्राप्त करें।',
      mr: 'पशुसंवर्धन विभागाशी संपर्क साधून डेअरी अनुदान मिळवा.',
      ur: 'ضلعی لائیو اسٹاک محکمے سے رابطہ کر کے ڈیری گرانٹ حاصل کریں۔',
      ta: 'கால்நடை பராமரிப்பு துறையை அணுகி PM-AJAY பண்ணை மானியத்தைப் பெறுங்கள்.'
    },
    pmAjayGiaFocus: 'Comprehensive milch animal credit-linked capital subsidy for landless SC families.'
  },
  {
    id: 'welding-fabrication',
    occupation: 'Welding & Structural Fabrication Specialist',
    sector: 'Capital Goods & Fabrication',
    indicativeNsqfLevel: 3,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Manual Metal Arc Welder / Fabrication Fitter).',
    requiredEducationMin: '8th to 10th Standard',
    educationWeight: 1,
    coreSkills: [
      'SMAW / MIG welding techniques',
      'Metal cutting & grinding',
      'Blueprint reading & structural measurement',
      'Weld defect inspection',
      'Workshop safety & PPE enforcement',
      'Gate, grille & shed fabrication'
    ],
    associatedInterests: ['Welding', 'Fabrication', 'Metal work', 'Construction', 'Machinery', 'Manufacturing', 'Mechanical'],
    associatedWorkTypes: ['Manufacturing', 'Technical'],
    livelihoodModes: ['Employment', 'Self-employment'],
    potentialLivelihoodModeDisplay: 'Fabrication Workshop / Industrial Welder / Construction Contractor',
    trainingAreas: {
      theory: ['Metallurgy basics', 'Current & voltage settings', 'Joint preparation geometries', 'Gas cylinder safety regulations'],
      practical: ['Fillet and butt weld joints in flat/horizontal positions', 'Plasma cutting', 'Angle grinder handling', 'Structural assembly'],
      certification: 'Certified Welder - Capital Goods SSC'
    },
    localRelevanceTags: ['Agri-shed construction', 'Window grille fabrication', 'Industrial park hiring', 'Trailer body building'],
    description: {
      en: 'Fabrication of steel sheds, grilles, agricultural trolleys, and structural joints using modern welding processes.',
      te: 'వెల్డింగ్, ఐరన్ గేట్లు, అగ్రికల్చర్ షెడ్లు మరియు మెటల్ ఫ్యాబ్రికేషన్ రంగంలో స్వయం ఉపాధి.',
      hi: 'वेल्डिंग, लोहे के गेट, कृषि शेड और संरचनात्मक फैब्रिकेशन कार्यशाला संचालन।',
      mr: 'वेल्डिंग, लोखंडी ग्रिल व शेड फॅब्रिकेशन वर्कशॉप व्यवसाय.',
      ur: 'ویلڈنگ اور لوہے کے شیڈز، گرلز تیار کرنے کا مضبوط تکنیکی ہنر۔',
      ta: 'வெல்டிங் மற்றும் இரும்பு கூரை, கிரில் அமைக்கும் தொழில் நுட்ப பயிற்சி.'
    },
    nextSteps: {
      en: 'Enroll in ITI fabrication trade and register for PM-AJAY GIA inverter welding machine allocation.',
      te: 'ITI వెల్డింగ్ ట్రేడ్ పూర్తి చేసి PM-AJAY వెల్డింగ్ మెషీన్ సదుపాయం పొందండి.',
      hi: 'वेल्डिंग प्रशिक्षण पूरा करें और PM-AJAY वेल्डिंग मशीन सहायता के लिए आवेदन करें।',
      mr: 'वेल्डिंग प्रशिक्षण पूर्ण करून इन्व्हर्टर वेल्डिंग मशीन अनुदान मिळवा.',
      ur: 'ویلڈنگ ٹریڈ مکمل کریں اور انورٹر ویلڈنگ مشین گرانٹ لیں.',
      ta: 'வெல்டிங் பயிற்சி பெற்று PM-AJAY இயந்திர உதவிக்கு விண்ணப்பிக்கவும்.'
    },
    pmAjayGiaFocus: 'Inverter ARC welder, angle grinder, and protective gear provided to SC fabricator groups.'
  },
  {
    id: 'beauty-wellness-stylist',
    occupation: 'Beauty & Wellness Enterprise Specialist',
    sector: 'Beauty & Wellness',
    indicativeNsqfLevel: 4,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Assistant Beauty Therapist / Hair Stylist).',
    requiredEducationMin: '8th to 10th Standard',
    educationWeight: 1,
    coreSkills: [
      'Skin care & facial treatments',
      'Hair styling & chemical treatments',
      'Bridal makeup & draping',
      'Salon hygiene & sterilisation',
      'Client consultation & skin analysis',
      'Inventory & product retailing'
    ],
    associatedInterests: ['Beauty & Wellness', 'Makeup', 'Hairstyling', 'Salon', 'Personal care', 'Boutique', 'Skincare'],
    associatedWorkTypes: ['Services', 'Other'],
    livelihoodModes: ['Self-employment', 'Employment'],
    potentialLivelihoodModeDisplay: 'Home Salon / Bridal Freelancer / Wellness Studio',
    trainingAreas: {
      theory: ['Skin anatomy & dermatology precautions', 'Cosmetic chemical compositions', 'Sanitization protocols', 'Salon bookkeeping'],
      practical: ['Facial massage techniques', 'Hair coloring & blow dry', 'Bridal makeup application', 'Hygiene autoclaving'],
      certification: 'Beauty Therapist Certificate (BWSSC Aligned)'
    },
    localRelevanceTags: ['Bridal season demand', 'Doorstep salon services', 'Town beauty parlour', 'Cosmetics retail'],
    description: {
      en: 'Personal care, bridal grooming, and hygiene-compliant salon services for urban and semi-rural markets.',
      te: 'బ్యూటీ కేర్, బ్రైడల్ మేకప్, మరియు హెయిర్ స్టైలింగ్ రంగంలో లాభదాయక స్వయం ఉపాధి.',
      hi: 'सौंदर्य व वेलनेस सेवा, ब्राइडल मेकअप, और पार्लर उद्यम के लिए कौशल विकास।',
      mr: 'ब्युटी पार्लर, ब्राइडल मेकअप आणि वेलनेस सर्व्हिसेस व्यवसाय.',
      ur: 'بیوٹی اور ویلنیس، برائیڈل میک اپ اور پرسنل کیئر کا باعزت روزگار۔',
      ta: 'அழகு கலை, மணப்பெண் அலங்காரம் மற்றும் அழகு நிலைய மேலாண்மை.'
    },
    nextSteps: {
      en: 'Attend BWSSC certified parlour module; apply for PM-AJAY salon starter kit and chair setup.',
      te: 'సర్టిఫైడ్ బ్యూటీ కోర్సు పూర్తి చేసి PM-AJAY ద్వారా పార్లర్ కిట్ పొందండి.',
      hi: 'ब्यूटी थैरेपिस्ट कोर्स करें और PM-AJAY वेलनेस किट सहायता प्राप्त करें।',
      mr: 'ब्युटी थेरपिस्ट कोर्स पूर्ण करून व्यवसाय किटसाठी अर्ज करा.',
      ur: 'بیوٹی تھراپسٹ ٹریننگ لیں اور پی ایم اجے سیلون کٹ حاصل کریں۔',
      ta: 'பியூட்டி தெரபிஸ்ட் பயிற்சி முடித்து தொழில் தொகுப்பை பெறவும்.'
    },
    pmAjayGiaFocus: 'Comprehensive wellness vanity kit and micro-parlour assistance for SC women groups.'
  },
  {
    id: 'retail-customer-service',
    occupation: 'Retail Sales & Customer Relationship Associate',
    sector: 'Retail & Consumer Commerce',
    indicativeNsqfLevel: 4,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Retail Sales Associate & Cashier).',
    requiredEducationMin: '10th / 12th Standard',
    educationWeight: 2,
    coreSkills: [
      'Point-of-Sale (POS) software billing',
      'Inventory merchandising & stock audits',
      'Customer objection handling',
      'Digital payment reconciliation',
      'Visual product display',
      'Basic conversational communication'
    ],
    associatedInterests: ['Retail/Customer Service', 'Sales', 'Customer service', 'Store management', 'Marketing', 'Billing', 'Commerce'],
    associatedWorkTypes: ['Services', 'Digital'],
    livelihoodModes: ['Employment', 'Self-employment'],
    potentialLivelihoodModeDisplay: 'Retail Chain Associate / Kirana Modernizer / Store Manager',
    trainingAreas: {
      theory: ['Retail supply chain flows', 'Consumer behavior psychology', 'Loss prevention & inventory shrinkage', 'Consumer rights laws'],
      practical: ['Barcode scanner & POS drill', 'Cash ledger closing', 'Customer query roleplay', 'Stock replenishment cycle'],
      certification: 'Certified Retail Sales Associate (RASCI Aligned)'
    },
    localRelevanceTags: ['Supermarket hiring', 'Apparel store sales', 'Electronic showroom associate', 'Kirana digitalization'],
    description: {
      en: 'Front-line customer engagement, POS billing, merchandise management, and omni-channel retail operations.',
      te: 'రిటైల్ షోరూములు, సూపర్ మార్కెట్లలో కస్టమర్ సర్వీస్, బిల్లింగ్ మరియు స్టోర్ మేనేజ్‌మెంట్ ఉద్యోగాలు.',
      hi: 'रिटेल स्टोर्स और मॉल में ग्राहक सेवा, बिलिंग, इन्वेंट्री और आधुनिक किराना प्रबंधन।',
      mr: 'किरकोळ विक्री, बिलिंग आणि ग्राहक संबंध व्यवस्थापन.',
      ur: 'ریٹیل اسٹورز اور گاہکوں سے خوش اسلوبی سے لین دین کا باضابطہ ہنر۔',
      ta: 'சில்லறை விற்பனை, பில்லிங் மற்றும் வாடிக்கையாளர் சேவை மேலாண்மை.'
    },
    nextSteps: {
      en: 'Participate in retail placement linkage drive with local distribution hubs under PM-AJAY GIA partnership.',
      te: 'రిటైల్ ప్లేస్‌మెంట్ డ్రైవ్‌లో పాల్గొని స్థానిక మార్కెట్లలో ఉద్యోగం పొందండి.',
      hi: 'रिटेल रोजगार ड्राइव में शामिल हों और व्यवस्थित स्टोर प्रबंधन सीखें।',
      mr: 'किरकोळ विक्री प्लेसमेंट मोहिमेत सहभाग घेऊन नोकरी मिळवा.',
      ur: 'ریٹیل جاب ڈرائیو میں شامل ہو کر مقامی مارکیٹ میں کام شروع کریں۔',
      ta: 'சில்லறை விற்பனை வேலைவாய்ப்பு முகாமில் கலந்து கொள்ளவும்.'
    },
    pmAjayGiaFocus: 'Soft-skills coaching, language fluency, and guaranteed job fair linkage for educated SC youth.'
  },
  {
    id: 'computer-hardware-support',
    occupation: 'Computer Hardware & Network Support Assistant',
    sector: 'IT-ITeS & Electronics',
    indicativeNsqfLevel: 4,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Hardware & Networking Technician).',
    requiredEducationMin: '12th / Diploma / ITI',
    educationWeight: 3,
    coreSkills: [
      'Desktop/Laptop hardware assembly',
      'LAN cabling & Wi-Fi router setup',
      'OS installation & driver updates',
      'Printer & scanner configuration',
      'Data backup & virus removal',
      'Basic network troubleshooting'
    ],
    associatedInterests: ['Computer Hardware Support', 'Computers', 'Hardware', 'Networking', 'IT support', 'Technical'],
    associatedWorkTypes: ['Technical', 'Digital', 'Services'],
    livelihoodModes: ['Employment', 'Self-employment'],
    potentialLivelihoodModeDisplay: 'IT AMC Contractor / School Computer Lab Assistant / Service Center Executive',
    trainingAreas: {
      theory: ['Computer architecture & chipset topologies', 'TCP/IP networking models', 'Storage & RAM bus speeds', 'Troubleshooting trees'],
      practical: ['Crimping RJ45 ethernet cables', 'Motherboard capacitor testing', 'Cloning drives', 'Router security configuration'],
      certification: 'Hardware & Network Support Engineer (IT-ITeS SSC)'
    },
    localRelevanceTags: ['School computer lab AMC', 'Bank branch hardware support', 'Local office IT maintenance', 'Refurbished PC sales'],
    description: {
      en: 'System assembly, peripheral maintenance, network connectivity, and computer repairs for schools, banks, and offices.',
      te: 'కంప్యూటర్ హార్డ్‌వేర్, ల్యాన్ నెట్‌వర్కింగ్ మరియు విద్యాసంస్థలు, ఆఫీసులకు టెక్నికల్ సపోర్ట్ సేవలు.',
      hi: 'कंप्यूटर असेंबली, नेटवर्क वायरिंग, और स्थानीय स्कूलों व दफ्तरों में IT मेंटेनेंस आजीविका।',
      mr: 'संगणक हार्डवेअर, नेटवर्किंग आणि स्थानिक कार्यालयांसाठी तांत्रिक सहाय्य.',
      ur: 'کمپیوٹر ہارڈویئر، وائی فائی نیٹ ورکنگ اور آئی ٹی سپورٹ کی جامع تربیت۔',
      ta: 'கணினி வன்பொருள், நெட்வொர்க்கிங் மற்றும் மென்பொருள் நிறுவுதல் தொழில்.'
    },
    nextSteps: {
      en: 'Complete Advanced IT hardware diploma and establish an Annual Maintenance Contract (AMC) service unit.',
      te: 'అధునాతన హార్డ్‌వేర్ కోర్సు పూర్తి చేసి స్థానిక కార్యాలయాల AMC సేవలు ప్రారంభించండి.',
      hi: 'हार्डवेयर कोर्स पूरा करें और स्थानीय सरकारी दफ्तरों/स्कूलों में वार्षिक रखरखाव सेवा शुरू करें।',
      mr: 'हार्डवेअर अभ्यासक्रम पूर्ण करून स्थानिक कार्यालयांमध्ये आयटी सेवा सुरू करा.',
      ur: 'ہارڈویئر سرٹیفکیٹ حاصل کریں اور کمپیوٹر سروسز کا کام شروع کریں۔',
      ta: 'கணினி வன்பொருள் சான்றிதழ் பெற்று பள்ளி/அலுவலக சேவை வழங்கவும்.'
    },
    pmAjayGiaFocus: 'IT service toolkit with cable testers, precision screwdrivers, and diagnostic boot drives provided via PM-AJAY.'
  },
  {
    id: 'plumbing-sanitation',
    occupation: 'Plumbing & Rural Water Supply Technician',
    sector: 'Plumbing & Water Management',
    indicativeNsqfLevel: 3,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: General Plumber & Jal Jeevan Mission Maintenance).',
    requiredEducationMin: 'Primary / 8th Standard',
    educationWeight: 1,
    coreSkills: [
      'PVC & GI pipe jointing & threading',
      'Sanitary fixture & cistern installation',
      'Overhead tank float valve calibration',
      'Water meter & pump line connection',
      'Leakage detection & sealant application',
      'Drainage & greywater piping'
    ],
    associatedInterests: ['Plumbing', 'Construction', 'Water supply', 'Pipes', 'Mechanical work', 'Sanitation'],
    associatedWorkTypes: ['Technical', 'Services'],
    livelihoodModes: ['Employment', 'Self-employment'],
    potentialLivelihoodModeDisplay: 'Jal Jeevan Gram Panchayat Plumber / Domestic Contractor / Building Maintenance',
    trainingAreas: {
      theory: ['Hydrostatic pressure fundamentals', 'Pipe dimension standards', 'Sanitation gradient calculation', 'Water conservation'],
      practical: ['Die-threading of galvanized pipes', 'Solvent cement PVC fusion', 'Tap cartridge rebuilding', 'Leak pressure test'],
      certification: 'Plumbing SSC Certified General Plumber'
    },
    localRelevanceTags: ['Jal Jeevan Mission tap connections', 'Domestic bathroom fitting', 'Borewell pump plumbing', 'Drip irrigation line laying'],
    description: {
      en: 'Installation and upkeep of potable water pipes, domestic fixtures, sanitary valves, and Jal Jeevan Mission supply lines.',
      te: 'పైప్‌లైన్లు, శానిటరీ అమరికలు, మరియు జల్ జీవన్ మిషన్ తాగునీటి సరఫరా వ్యవస్థల నిర్వహణ.',
      hi: 'नलसाजी (प्लंबिंग), पाइपलाइन फिटिंग और जल जीवन मिशन के तहत पेयजल पाइप रख-रखाव।',
      mr: 'प्लंबिंग, नळ जोडणी, आणि ग्रामीण पाणीपुरवठा देखभाल तंत्रज्ञ.',
      ur: 'پلمبنگ، پائپ فٹنگ اور واٹر سپلائی سسٹمز کی تکنیکی دیکھ بھال۔',
      ta: 'பிளம்பிங், குடிநீர் குழாய் இணைப்பு மற்றும் சுகாதாரம் சார்ந்த தொழில்.'
    },
    nextSteps: {
      en: 'Enroll in Jal Jeevan Mission village plumber skilling cohort with tool subsidy through PM-AJAY GIA.',
      te: 'జల్ జీవన్ మిషన్ ప్లంబింగ్ బ్యాచ్‌లో చేరి PM-AJAY టూల్ కిట్ పొందండి.',
      hi: 'प्लंबिंग बैच में नामांकन करें और PM-AJAY GIA प्लंबिंग टूलकिट प्राप्त करें।',
      mr: 'प्लंबिंग प्रशिक्षण घेऊन शासकीय पाणीपुरवठा देखभाल टूलकिट मिळवा.',
      ur: 'پلمبنگ ٹریننگ مکمل کریں اور پی ایم اجے ٹول کٹ کے ساتھ کام شروع کریں۔',
      ta: 'பிளம்பிங் பயிற்சி முடித்து PM-AJAY உபகரண மானியம் பெறவும்.'
    },
    pmAjayGiaFocus: 'Standard plumbing pipe cutter, threader, and pressure testing kit delivered to trained beneficiaries.'
  },
  {
    id: 'masonry-construction',
    occupation: 'Masonry & Sustainable Rural Construction Specialist',
    sector: 'Construction',
    indicativeNsqfLevel: 3,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Rural Mason - PMAY Aligned).',
    requiredEducationMin: 'Primary / Below 10th',
    educationWeight: 1,
    coreSkills: [
      'Brick and AAC block laying',
      'Plastering & surface leveling',
      'Concrete mixing ratio compliance',
      'Bar-bending & column reinforcement basics',
      'Plumb line & water level accuracy',
      'Curing schedules & quality inspection'
    ],
    associatedInterests: ['Masonry/Construction', 'Building', 'Construction', 'Civil work', 'Housing', 'Architecture basics'],
    associatedWorkTypes: ['Technical', 'Manufacturing', 'Services'],
    livelihoodModes: ['Employment', 'Self-employment'],
    potentialLivelihoodModeDisplay: 'Lead Rural Mason / PMAY Housing Contractor / Concrete Block Manufacturer',
    trainingAreas: {
      theory: ['Mortar composition chemistry', 'Earthquake-resistant corner bonding', 'PMAY architectural blueprints', 'Safety at height'],
      practical: ['Corner alignment with spirit level', 'Formwork shuttering', 'Smooth plaster finish', 'Interlocking paver laying'],
      certification: 'Certified Rural Mason (Construction SSC / PMAY-G Aligned)'
    },
    localRelevanceTags: ['PMAY rural housing construction', 'Community hall builds', 'Interlocking brick making', 'Road drain works'],
    description: {
      en: 'Quality bricklaying, concrete casting, plastering, and disaster-resilient construction for affordable rural housing.',
      te: 'భవన నిర్మాణం, సిమెంట్ పనులు, మరియు గ్రామీణ గృహ నిర్మాణంలో నైపుణ్యం కలిగిన మేస్త్రీ మార్గం.',
      hi: 'राजमिस्त्री कौशल, प्लास्टर, कंक्रीट निर्माण और प्रधानमंत्री आवास योजना के तहत निर्माण कार्य।',
      mr: 'गवंडी काम, बांधकाम आणि ग्रामीण गृहनिर्माण प्रकल्प कौशल्य.',
      ur: 'تعمیراتی کام، راج مستری اور پائیدار مکانات کی تعمیر کا ہنر۔',
      ta: 'கட்டுமான தொழில், கொத்தனார் பயிற்சி மற்றும் ஊரக வீட்டு வசதி பணிகள்.'
    },
    nextSteps: {
      en: 'Register with State Construction Workers Board and attend PMAY-G verified rural mason upgradation course.',
      te: 'భవన నిర్మాణ కార్మికుల బోర్డులో నమోదు చేసుకుని గ్రామీణ మేస్త్రీ సర్టిఫికేట్ పొందండి.',
      hi: 'भवन निर्माण कल्याण बोर्ड में पंजीकरण कराएं और PMAY ग्रामीण राजमिस्त्री प्रशिक्षण लें।',
      mr: 'ग्रामीण गवंडी प्रशिक्षण पूर्ण करून बांधकाम साहित्य सहाय्य मिळवा.',
      ur: 'تعمیراتی ورکرز بورڈ میں رجسٹریشن کرائیں اور سرٹیفائیڈ مستری بنیں۔',
      ta: 'கட்டுமான வாரியத்தில் பதிவு செய்து கொத்தனார் சான்றிதழ் பெறவும்.'
    },
    pmAjayGiaFocus: 'Modern construction level gauges, vibrating screeds, and safety harnesses for masonry guilds.'
  },
  {
    id: 'agriculture-allied-services',
    occupation: 'Organic Farming & Agri-Input Allied Entrepreneur',
    sector: 'Agriculture & Horticulture',
    indicativeNsqfLevel: 4,
    nsqfAlignmentText: 'NSQF-aligned pathway — qualification level to be validated against the current official registry (Standard: Organic Cultivator & Input Producer).',
    requiredEducationMin: 'Primary / 8th Standard',
    educationWeight: 1,
    coreSkills: [
      'Bio-fertilizer (Jeevamrut / Vermicompost) formulation',
      'Integrated Pest Management (IPM)',
      'Soil health card interpretation',
      'Micro-irrigation & fertigation handling',
      'Seed treatment & nursery raising',
      'Organic certification documentation'
    ],
    associatedInterests: ['Agriculture Allied Services', 'Organic farming', 'Farming', 'Agriculture', 'Bio-fertilizers', 'Horticulture', 'Gardening'],
    associatedWorkTypes: ['Agriculture/allied', 'Services'],
    livelihoodModes: ['Self-employment', 'Employment'],
    potentialLivelihoodModeDisplay: 'Custom Bio-Input Center / Organic Nursery / Farmers Producer Org (FPO) Leader',
    trainingAreas: {
      theory: ['Soil microbiology & carbon cycling', 'Botanical decoction formulations', 'NPOP organic standards', 'FPO collective marketing'],
      practical: ['Vermicompost bed preparation', 'Pheromone trap installation', 'Nursery grafting', 'Soil sample chemical tests'],
      certification: 'Organic Grower & Input Consultant (Agriculture SSC)'
    },
    localRelevanceTags: ['Vermicompost selling', 'Nursery enterprise', 'Bio-pesticide preparation', 'FPO supply chain'],
    description: {
      en: 'Bio-input production, vermicomposting, organic certification, and sustainable horticultural seedling businesses.',
      te: 'సేంద్రీయ వ్యవసాయం, జీవామృతం, వర్మీకంపోస్ట్ తయారీ మరియు రైతు ఉత్పత్తిదారుల సంఘాల ద్వారా వ్యాపారం.',
      hi: 'जैविक खेती, केंचुआ खाद (वर्मीकम्पोस्ट), जैविक कीटनाशक निर्माण और कृषि इनपुट केंद्र।',
      mr: 'सेंद्रिय शेती, गांडूळ खत निर्मिती आणि कृषी निविष्ठा केंद्र व्यवसाय.',
      ur: 'نامیاتی کاشتکاری، بائیو کھاد اور زرعی ان پٹس کا منافع بخش کاروبار۔',
      ta: 'இயற்கை விவசாயம், மண்புழு உரம் தயாரிப்பு மற்றும் நாற்றுப்பண்ணை தொழில்.'
    },
    nextSteps: {
      en: 'Connect with Krishi Vigyan Kendra (KVK) for vermi-bed allocation and PM-AJAY GIA bio-input grant.',
      te: 'కృషి విజ్ఞాన కేంద్రం (KVK) ద్వారా వర్మీ-బెడ్స్ మరియు PM-AJAY గ్రాంట్ కోసం దరఖాస్తు చేయండి.',
      hi: 'कृषि विज्ञान केंद्र (KVK) से वर्मीकंपोस्ट किट व PM-AJAY योजना से सहायता प्राप्त करें।',
      mr: 'कृषी विज्ञान केंद्राशी संपर्क साधून गांडूळ खत युनिट अनुदान मिळवा.',
      ur: 'زرعی سائنس مرکز (کے وی کے) سے بائیو فرٹیلائزر گرانٹ کے لیے رابطہ کریں۔',
      ta: 'வேளாண் அறிவியல் மையத்தை அணுகி மண்புழு உர மானியம் பெறவும்.'
    },
    pmAjayGiaFocus: 'Vermi-bed setup subsidy, soil testing kits, and organic seedling nurseries for SC farming families.'
  }
];
