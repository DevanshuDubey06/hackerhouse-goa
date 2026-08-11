// ============================================================
// HACKER HOUSE GOA 2026 — Local Storage Fallback
// When Supabase is not configured, data is stored locally
// ============================================================

export interface BuilderData {
  id: string;
  publicId: string;
  name: string;
  stack: string;
  location: string;
  builderClass: { id: string; label: string; icon: string };
  frameStyle: string;
  frameFormat: string;
  photoDataUrl: string | null;
  createdAt: string;
}

export interface TeamData {
  id: string;
  publicId: string;
  name: string;
  members: BuilderData[];
  createdAt: string;
}

const BUILDERS_KEY = 'hh-goa-builders';
const TEAMS_KEY = 'hh-goa-teams';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// ---- Builders ----

export function saveBuilder(builder: BuilderData): void {
  if (!isBrowser()) return;
  const builders = getBuilders();
  builders.push(builder);
  localStorage.setItem(BUILDERS_KEY, JSON.stringify(builders));
}

export function getBuilders(): BuilderData[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(BUILDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getBuilderByPublicId(publicId: string): BuilderData | null {
  const builders = getBuilders();
  return builders.find((b) => b.publicId === publicId) || null;
}

// ---- Teams ----

export function saveTeam(team: TeamData): void {
  if (!isBrowser()) return;
  const teams = getTeams();
  teams.push(team);
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
}

export function getTeams(): TeamData[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(TEAMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getTeamByPublicId(publicId: string): TeamData | null {
  const teams = getTeams();
  return teams.find((t) => t.publicId === publicId) || null;
}

// ---- Radar (featured builders) ----

export interface RadarEntry {
  builderId: string;
  publicId: string;
  name: string;
  location: string;
  builderClass: string;
  score: number;
  status: 'pending' | 'approved' | 'featured' | 'rejected';
  createdAt: string;
}

const RADAR_KEY = 'hh-goa-radar';

export function addToRadar(entry: RadarEntry): void {
  if (!isBrowser()) return;
  const entries = getRadarEntries();
  entries.push(entry);
  localStorage.setItem(RADAR_KEY, JSON.stringify(entries));
}

export function getRadarEntries(): RadarEntry[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(RADAR_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getApprovedRadarEntries(): RadarEntry[] {
  return getRadarEntries().filter(
    (e) => e.status === 'approved' || e.status === 'featured'
  );
}
