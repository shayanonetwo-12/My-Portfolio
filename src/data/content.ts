export const profile = {
  name: 'Shayan Shahid',
  initials: 'SS',
  title: 'AI Product Developer',
  roles: ['AI Product Developer', 'AI App Builder', 'Vibe Coder'],
  tagline: 'BUILDING DIGITAL PRODUCTS WITH AI.',
  intro:
    'I build AI-powered applications, interactive web experiences, ecommerce products and modern digital interfaces using AI-assisted development workflows.',
  location: 'Karachi, Pakistan',
  email: 'shayanshahid746@gmail.com',
  github: 'https://github.com/shayanonetwo-12',
  githubHandle: 'shayanonetwo-12',
  linkedin: 'https://www.linkedin.com/in/shayan-shahid-59ba64388',
  instagram: 'https://www.instagram.com/shayan_vco?igsh=dm02Y21rMjV3ODA5',
  status: 'Open to Opportunities',
};

export const about = {
  summary:
    'BBA candidate and AI Product Developer / AI App Builder with hands-on experience building AI-powered web applications, interactive ecommerce experiences, modern landing pages, and product prototypes through AI-assisted development workflows.\n\nStrong interest in generative AI, prompt engineering, rapid prototyping, UI/UX, automation, and digital product development.\n\nI combine business education with practical product-building, digital marketing, graphic design, and communication skills.',
  cards: [
    { label: 'Current Role', value: 'AI Product Developer / AI App Builder' },
    { label: 'Specialization', value: 'AI + Digital Products' },
    { label: 'Education', value: 'BBA Candidate' },
    { label: 'Location', value: 'Karachi, Pakistan' },
    { label: 'Status', value: 'Open to Opportunities' },
  ],
};

export const whatIBuild = [
  {
    num: '01',
    title: 'AI Products',
    desc: 'AI-powered web applications, AI assistants and intelligent product concepts.',
    icon: 'BrainCircuit',
  },
  {
    num: '02',
    title: 'Digital Experiences',
    desc: 'Modern interactive websites, landing pages and immersive interfaces.',
    icon: 'Sparkles',
  },
  {
    num: '03',
    title: 'E-Commerce',
    desc: 'AI-powered ecommerce, product experiences and futuristic storefronts.',
    icon: 'ShoppingBag',
  },
  {
    num: '04',
    title: 'Rapid Prototypes',
    desc: 'Turning ideas into working digital products using AI-assisted development workflows.',
    icon: 'Rocket',
  },
];

export const skillCategories = [
  {
    num: '01',
    title: 'AI & Automation',
    skills: [
      'Google AI Studio',
      'Gemini API / Google GenAI SDK',
      'Generative AI',
      'Prompt Engineering',
      'AI Assistants',
      'Chatbots',
      'RAG Concepts',
      'n8n Automation',
    ],
  },
  {
    num: '02',
    title: 'Frontend',
    skills: [
      'React',
      'React 19',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Vite',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Framer Motion',
      'GSAP',
      'Three.js',
      'React Three Fiber',
      'Responsive Design',
    ],
  },
  {
    num: '03',
    title: 'Backend & Data',
    skills: [
      'Node.js',
      'Express.js',
      'FastAPI',
      'REST APIs',
      'Supabase',
      'PostgreSQL',
      'Firebase',
      'Authentication',
      'Database Integration',
    ],
  },
  {
    num: '04',
    title: 'Development & Deployment',
    skills: [
      'Git',
      'GitHub',
      'Vercel',
      'Netlify',
      'npm',
      'Bun',
      'ESLint',
      'Prettier',
      'Lovable',
      'Replit',
    ],
  },
  {
    num: '05',
    title: 'Design & Marketing',
    skills: [
      'Canva',
      'Adobe Photoshop',
      'Graphic Design',
      'Digital Marketing',
      'Social Media Marketing',
      'Promotional Design',
      'Content Design',
    ],
  },
];

export type Project = {
  num: string;
  name: string;
  category: string;
  short: string;
  tech: string[];
  live?: string;
  repo?: string;
  visual: string;
  accent: string;
  image?: string;
  status?: 'live' | 'coming-soon';
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    num: '01',
    name: 'AI Study Buddy',
    category: 'AI / EdTech',
    short:
      'AI-powered learning platform combining AI tutoring, study planning, quiz generation, flashcards, Pomodoro sessions, analytics, authentication, and responsive UX.',
    tech: [
      'React 19',
      'TypeScript',
      'TanStack Start/Router',
      'Tailwind CSS',
      'Supabase',
      'AI / LLM API',
      'Vercel',
    ],
    live: 'https://ai-study-buddy-346.vercel.app/',
    repo: 'https://github.com/shayanonetwo-12/ai-study-buddy-346',
    visual: 'AI learning dashboard',
    accent: '#B6FF00',
    image: '/Screenshot_2026-07-31_155305.png',
    status: 'live',
    overview:
      'AI Study Buddy is an AI-powered learning platform that brings together tutoring, planning, and study tools into a single responsive web application.',
    problem:
      'Students juggle many disconnected tools — one for notes, one for flashcards, one for timers — with no AI guidance tying them together.',
    solution:
      'A unified AI learning dashboard that combines an AI tutor, study planner, quiz generator, flashcards, Pomodoro timer, and analytics with authentication.',
    features: [
      'AI tutoring and study planning',
      'AI quiz generation and flashcards',
      'Pomodoro focus sessions',
      'Study analytics and progress tracking',
      'Authentication and user accounts',
      'Responsive UX across devices',
    ],
    challenges:
      'Integrating an LLM API into a structured study workflow while keeping responses reliable, fast, and useful for real learning.',
    outcome:
      'A complete AI learning product demonstrating end-to-end AI-assisted development from concept to deployed application.',
  },
  {
    num: '02',
    name: 'AutoNova AI',
    category: 'AI / Automotive / Ecommerce',
    short:
      'Futuristic automotive accessories marketplace concept with an AI vehicle garage, intelligent upgrade recommendations, compatibility checking, interactive 3D showroom, shopping flow, and admin dashboard.',
    tech: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'GSAP',
      'Three.js',
      'React Three Fiber',
      'FastAPI',
      'Python',
      'Supabase',
      'Gemini API',
    ],
    live: 'https://auto-nova-ai.vercel.app/',
    visual: 'Futuristic car garage',
    accent: '#B6FF00',
    image: '/Screenshot_2026-07-31_153540.png',
    status: 'live',
    overview:
      'AutoNova AI is a futuristic automotive accessories marketplace concept combining a 3D showroom with AI-powered upgrade recommendations.',
    problem:
      'Buying automotive accessories online gives no sense of fit, compatibility, or how upgrades look on your actual vehicle.',
    solution:
      'An AI vehicle garage with intelligent upgrade recommendations, compatibility checking, and an interactive 3D showroom, backed by a shopping flow and admin dashboard.',
    features: [
      'AI vehicle garage and upgrade recommendations',
      'Compatibility checking for accessories',
      'Interactive 3D showroom',
      'Shopping flow and cart',
      'Admin dashboard',
      'Gemini API integration',
    ],
    challenges:
      'Combining Three.js 3D rendering with a FastAPI + Python backend and AI recommendations while keeping the experience smooth.',
    outcome:
      'A concept showcase for how AI and 3D can redefine automotive ecommerce experiences.',
  },
  {
    num: '03',
    name: 'Ecosystem.Design',
    category: 'AI / Interior Design',
    short:
      'AI-powered interior design platform with AI design assistance, interactive gallery, AI chat assistant, authentication, booking/contact workflows, pricing, testimonials, responsive UI, and motion-driven interfaces.',
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'Supabase',
      'Vercel',
    ],
    live: 'https://ecosystem-interior-design.vercel.app/',
    repo: 'https://github.com/shayanonetwo-12/Ecosystem-InteriorDesign',
    visual: 'Luxury interior design environment',
    accent: '#B6FF00',
    image: '/Screenshot_2026-07-31_153959.png',
    status: 'live',
    overview:
      'Ecosystem.Design is an AI-powered interior design platform with an AI design assistant, gallery, and booking workflows.',
    problem:
      'Interior design clients struggle to visualize ideas and connect with designers before committing.',
    solution:
      'A motion-driven platform with AI design assistance, an interactive gallery, AI chat assistant, booking/contact flows, pricing, and testimonials.',
    features: [
      'AI design assistance and chat assistant',
      'Interactive design gallery',
      'Booking and contact workflows',
      'Pricing and testimonials sections',
      'Authentication',
      'Motion-driven, responsive UI',
    ],
    challenges:
      'Building motion-driven interfaces that stay performant and accessible across devices.',
    outcome:
      'A polished, client-ready interior design product experience powered by AI.',
  },
  {
    num: '04',
    name: 'Nova Galaxy',
    category: 'AI / 3D Ecommerce',
    short:
      'AI-powered 3D shopping experience combining an interactive galaxy environment, AI shopping assistant, smart recommendations, 3D product visualization, seller dashboard, authentication, and responsive ecommerce UX.',
    tech: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Three.js',
      'Motion',
      'Express.js',
      'Node.js',
      'Google GenAI SDK',
      'Firebase',
      'Supabase',
      'Vercel',
    ],
    live: 'https://nova-galaxy.vercel.app/',
    repo: 'https://github.com/shayanonetwo-12/Nova-Galaxy',
    visual: 'Space / galaxy 3D ecommerce',
    accent: '#B6FF00',
    image: '/Screenshot_2026-07-31_154624.png',
    status: 'live',
    overview:
      'Nova Galaxy is an AI-powered 3D shopping experience set inside an interactive galaxy environment.',
    problem:
      'Standard ecommerce feels flat — products sit on white backgrounds with no sense of discovery or immersion.',
    solution:
      'A galaxy-themed 3D shopping experience with an AI shopping assistant, smart recommendations, 3D product visualization, and a seller dashboard.',
    features: [
      'Interactive galaxy 3D environment',
      'AI shopping assistant and smart recommendations',
      '3D product visualization',
      'Seller dashboard',
      'Authentication',
      'Responsive ecommerce UX',
    ],
    challenges:
      'Blending Three.js, a Node/Express backend, Firebase, Supabase, and the Google GenAI SDK into one cohesive shopping experience.',
    outcome:
      'An immersive 3D ecommerce concept that pushes what online shopping can feel like.',
  },
  {
    num: '05',
    name: 'Chrono X Watches',
    category: 'Luxury Ecommerce / 3D Web',
    short:
      'Futuristic luxury watch ecommerce experience featuring animated page transitions, premium product cards, glassmorphism, smart search, wishlist, cart, responsive layouts, and performance-focused frontend design.',
    tech: [
      'React',
      'Vite',
      'JavaScript',
      'Tailwind CSS',
      'CSS Animations',
      'Responsive UI',
      'Vercel',
    ],
    live: 'https://chrono-x-watches.vercel.app/',
    repo: 'https://github.com/shayanonetwo-12/ChronoX-Watches',
    visual: 'Premium luxury watch showroom',
    accent: '#B6FF00',
    image: '/Screenshot_2026-07-31_124654.png',
    status: 'live',
    overview:
      'Chrono X Watches is a futuristic luxury watch ecommerce experience with a focus on premium frontend design and motion.',
    problem:
      'Luxury watch ecommerce often feels generic and fails to convey the premium nature of the product.',
    solution:
      'A performance-focused frontend with animated page transitions, premium product cards, glassmorphism, smart search, wishlist, and cart.',
    features: [
      'Animated page transitions',
      'Premium product cards and glassmorphism',
      'Smart search',
      'Wishlist and cart',
      'Responsive layouts',
      'Performance-focused frontend design',
    ],
    challenges:
      'Delivering rich CSS animations and glassmorphism while keeping the frontend fast and responsive.',
    outcome:
      'A luxury storefront concept that shows how motion and design elevate ecommerce.',
  },
  {
    num: '06',
    name: 'AI Resume Analyzer',
    category: 'AI / Career Technology',
    short:
      'AI-powered resume analysis product designed to provide ATS scoring, resume improvement guidance, and AI-generated suggestions using the Gemini API.',
    tech: [
      'Gemini API',
      'AI-assisted product development',
      'ATS concepts',
      'Web application prototyping',
    ],
    repo: 'https://github.com/shayanonetwo-12',
    visual: 'AI document analysis interface',
    accent: '#B6FF00',
    status: 'coming-soon',
    overview:
      'AI Resume Analyzer is an AI-powered resume analysis product that provides ATS scoring and improvement guidance using the Gemini API.',
    problem:
      'Job seekers rarely know how their resume performs against Applicant Tracking Systems before applying.',
    solution:
      'An AI product that analyzes resumes, provides ATS scoring, and generates AI-driven improvement suggestions via the Gemini API.',
    features: [
      'ATS scoring of resumes',
      'AI-generated improvement suggestions',
      'Gemini API integration',
      'Web application prototype',
    ],
    challenges:
      'Translating ATS concepts into clear, actionable AI feedback for users.',
    outcome:
      'A focused AI product prototype demonstrating practical generative AI application in career technology.',
  },
];

export const education = [
  {
    num: '01',
    institution: 'Bahria University Karachi',
    degree: 'Bachelor of Business Administration (BBA)',
    period: 'Aug 2025 – Aug 2029',
    grade: 'GPA: 3.96 / 4.00',
    detail: 'Business Administration and Management',
    foundation: ['Marketing', 'Accounting', 'Management', 'Business Principles', 'Microsoft Excel'],
  },
  {
    num: '02',
    institution: 'Government Degree Science/Commerce College Malir Cantt',
    degree: 'Pre-Engineering',
    period: 'Aug 2023 – Aug 2025',
    grade: 'Grade: A1 — 86%',
    detail: 'Pre-Engineering',
    foundation: [],
  },
  {
    num: '03',
    institution: 'The Educators',
    degree: 'Computer Science',
    period: 'Aug 2021 – Aug 2023',
    grade: 'Grade: A1 — 88%',
    detail: 'Computer Science',
    foundation: ['C++', 'Computer Science', 'Core computing concepts'],
  },
];

export const certifications = [
  {
    num: '01',
    title: 'ACT AI – Artificial Intelligence Professional Course',
    issuer: 'NAVTTC / National Vocational and Technical Training Commission',
    date: 'July 2026',
  },
  {
    num: '02',
    title: 'Generative AI Essentials',
    issuer: 'IBM',
    date: 'July 2026',
  },
  {
    num: '03',
    title: 'Social Media Marketing',
    issuer: 'HP LIFE',
    date: 'June 2026',
  },
  {
    num: '04',
    title: 'Prompt Engineering For AI',
    issuer: 'Dubai Future Foundation',
    date: 'June 2026',
  },
  {
    num: '05',
    title: 'Freelancing Course',
    issuer: 'DigiSkills.pk',
    date: 'August 2025',
  },
  {
    num: '06',
    title: 'Digital Marketing Course',
    issuer: 'DigiSkills.pk',
    date: 'August 2025',
  },
  {
    num: '07',
    title: 'Graphic Designing Course',
    issuer: 'Cogito – The Computer Institute',
    date: 'June 2023',
  },
];

export const achievements = {
  highlight: { score: '247/250', label: 'ACT AI Final Examination' },
  items: [
    'Built and published multiple AI-powered and interactive web products.',
    'Maintains a public GitHub portfolio featuring AI applications, ecommerce concepts, 3D/animated experiences and modern web interfaces.',
    'Participated in university presentations, group projects, academic assignments and collaborative coursework.',
  ],
};

export const interests = [
  'AI Product Development',
  'Generative AI',
  'AI-assisted Software Development',
  'Prompt Engineering',
  'AI Automation',
  'RAG',
  'SaaS Products',
  'Ecommerce',
  'Frontend Development',
  'UI/UX',
  '3D Web Experiences',
  'Digital Marketing',
  'Creative Technology',
];

export const socials = [
  {
    name: 'LinkedIn',
    desc: 'Professional profile',
    url: 'https://www.linkedin.com/in/shayan-shahid-59ba64388',
    icon: 'Linkedin',
  },
  {
    name: 'GitHub',
    desc: 'Projects & experiments',
    url: 'https://github.com/shayanonetwo-12',
    icon: 'Github',
  },
  {
    name: 'Instagram',
    desc: 'Creative / professional content',
    url: 'https://www.instagram.com/shayan_vco?igsh=dm02Y21rMjV3ODA5',
    icon: 'Instagram',
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];
