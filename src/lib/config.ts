// ============================================================
// HACKER HOUSE GOA 2026 — Centralized Configuration & Data Layer
// Sourced from official https://hhgoa.com/ with static fallbacks
// ============================================================

export const OFFICIAL_APPLY_URL = 'https://hhgoa.com/';
export const CHECK_HYPE_URL = 'https://hhgoa.com/#check-hype';

export const EVENT = {
  name: 'Hacker House Goa',
  shortName: 'HH GOA',
  year: 2026,
  edition: '2026 EDITION',
  tagline: '4 days. 500 builders. One house by the ocean.',
  location: 'GOA, INDIA',
  dates: '28 – 31 OCTOBER 2026',
  datesShort: '28—31 OCT',
  startDate: '2026-10-28',
  endDate: '2026-10-31',
  daysCount: 4,
  buildersLimit: 500,
  hashtag: '#FrameInGoa',
  email: 'satapathyprayasu@gmail.com',
  officialUrl: 'https://hhgoa.com/',
  applyUrl: OFFICIAL_APPLY_URL,
} as const;

export const STATS = {
  registrations: '6800+',
  hackers: '390+',
  projects: '100',
  bounties: '$50K+',
  builders: '500',
  days: '04',
  house: '01',
  applicants: '20K+',
  xPosts: '1,284',
  builderIds: '3,842',
  teamsCount: '421',
} as const;

export const SOCIAL = {
  x: 'https://x.com/247pmstudio',
  telegram: 'https://t.me/twofourtysevenpm',
  devfolio: 'https://hacker-house-goa-2026.devfolio.co/',
} as const;

export const MESSAGING = {
  hero: {
    eyebrow: 'HH GOA 2026 · 28—31 OCT · GOA, INDIA',
    badge: 'HACKER HOUSE GOA · 2026 EDITION',
    titleLine1: 'THIS IS YOUR',
    titleLine2: 'HACKER HOUSE',
    titleLine3: 'IDENTITY.',
    hindiScript: 'गोवा',
    dates: '28 – 31 OCTOBER 2026',
    location: 'GOA, INDIA',
    tagline: '4 days. 500 builders.\nOne house by the ocean.',
    description: 'Build your official Hacker House Goa 2026 Builder ID.\nPick your builder class. Add your stack. Choose your frame.\nMake something that feels like you.',
    primaryCta: 'BUILD MY BUILDER ID →',
    secondaryCta: 'CHECK THE HYPE ↗',
    supportLabel: 'NO SIGN-UP · FREE TO CREATE',
    applyCta: 'APPLY FOR HH GOA →',
    createIdCta: 'CREATE YOUR ID',
  },
  house: {
    headline: ['NOT A CONFERENCE.', 'NOT A HACKATHON.', 'A HOUSE FULL OF BUILDERS.'],
    body: [
      'Four days away from the noise.',
      'Build, break, ship, sleep, repeat.',
      'Somewhere between the ocean',
      'and the next idea.',
    ],
    cta: 'EXPLORE THE HOUSE →',
  },
  noise: {
    headline: 'LESS NOISE.',
    subline: 'MORE BUILDING.',
  },
  about: {
    description: 'Hacker House Goa brings builders together for a few days of uninterrupted creation, collaboration and chaos — the good kind.',
    description2: 'Leave the noise behind.\nBring your laptop, your weirdest idea and the urge to build something that shouldn\'t exist yet.',
  },
  pillars: [
    {
      title: 'BUILD',
      description: 'Turn ideas into working things.',
    },
    {
      title: 'MEET',
      description: 'Find people who speak in commits, APIs and 3AM ideas.',
    },
    {
      title: 'SHIP',
      description: 'Don\'t just talk about it. Put it out there.',
    },
  ],
  idPreview: {
    headline: 'BUILD YOUR IDENTITY.',
    description: 'Create your official Hacker House Goa Builder ID.',
    formats: ['BUILDER ID', 'PROFILE', 'LANDSCAPE', 'BADGE'],
  },
  finalCta: {
    headline: 'READY TO BUILD YOUR IDENTITY?',
    cta: 'BUILD MY BUILDER ID →',
  },
  footer: {
    tagline: 'BUILD · SHIP · BELONG',
  },
} as const;

export const EXPERIENCE_DAYS = [
  {
    number: '01',
    title: 'ARRIVE',
    description: 'CHECK-IN &\nMEET YOUR\nSQUAD.',
    icon: 'airplane',
    bg: 'bg-cream text-dark-ink',
  },
  {
    number: '02',
    title: 'BUILD',
    description: 'CODE. DESIGN.\nCOLLABORATE.\nREPEAT.',
    icon: 'laptop',
    bg: 'bg-goa-green text-cream',
  },
  {
    number: '03',
    title: 'BREAK',
    description: 'OCEAN. SUN.\nMUSIC.\nGOOD FOOD.',
    icon: 'beach',
    bg: 'bg-goa-green text-cream',
  },
  {
    number: '04',
    title: 'SHIP',
    description: 'PITCH. LAUNCH.\nGET FEEDBACK.\nIMPROVE.',
    icon: 'surfboard',
    bg: 'bg-goa-green text-cream',
  },
  {
    number: '05',
    title: 'CONNECT',
    description: 'REAL PEOPLE.\nREAL BUILDS.\nREAL FRIENDS.',
    icon: 'people',
    bg: 'bg-goa-green text-cream',
  },
  {
    number: '06',
    title: 'REPEAT',
    description: 'SLEEP. EAT.\nDO IT AGAIN.',
    icon: 'night',
    bg: 'bg-goa-green text-cream',
  },
] as const;

export const BUILDER_CLASSES = [
  { id: 'shipper', label: 'THE SHIPPER', icon: '⚡' },
  { id: 'hacker', label: 'THE HACKER', icon: '🎮' },
  { id: 'designer', label: 'THE DESIGNER', icon: '✶' },
  { id: 'founder', label: 'THE FOUNDER', icon: '🚩' },
  { id: 'researcher', label: 'THE RESEARCHER', icon: '⚛' },
  { id: 'architect', label: 'THE ARCHITECT', icon: '🏛' },
  { id: 'tinkerer', label: 'THE TINKERER', icon: '⚙' },
  { id: 'degen', label: 'THE DEGEN', icon: '🎲' },
  { id: 'creator', label: 'THE CREATOR', icon: '🎨' },
  { id: 'systems-thinker', label: 'THE SYSTEMS THINKER', icon: '🧠' },
  { id: 'product-person', label: 'THE PRODUCT PERSON', icon: '📦' },
] as const;

export const FRAME_STYLES = [
  { id: 'monsoon', label: 'MONSOON', color: '#1E5B3A', bg: '#1E5B3A' },
  { id: 'sunburst', label: 'SUNBURST', color: '#FFD700', bg: '#3B1306' },
  { id: 'night', label: 'NIGHT', color: '#1a1a2e', bg: '#1a1a2e' },
  { id: 'sea', label: 'SEA', color: '#1e6091', bg: '#1e6091' },
] as const;

export const FRAME_FORMATS = [
  { id: 'portrait', label: 'PORTRAIT', icon: 'portrait' },
  { id: 'landscape', label: 'LANDSCAPE', icon: 'landscape' },
  { id: 'square', label: 'SQUARE', icon: 'square' },
  { id: 'arch', label: 'ARCH BADGE', icon: 'arch' },
  { id: 'pfp', label: 'PFP CIRCLE', icon: 'circle' },
  { id: 'vip', label: 'VIP PASS', icon: 'vip' },
  { id: 'team', label: 'TEAM CARD', icon: 'team' },
  { id: 'ornate', label: 'ORNATE', icon: 'ornate' },
] as const;

export const NAV_LINKS = [
  { label: 'THE HOUSE', href: '/house' },
  { label: 'BUILD YOUR ID', href: '/create' },
  { label: 'CHECK HYPE', href: CHECK_HYPE_URL },
] as const;

export const SHARE_TEXT = (builderClass: string, builderId: string) =>
  `I just created my Hacker House Goa Builder ID.\n\n${builderClass}\nID: ${builderId}\n\n${EVENT.hashtag}\n\nApply for Hacker House Goa 2026: ${OFFICIAL_APPLY_URL}`;
