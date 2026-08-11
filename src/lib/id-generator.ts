// ============================================================
// HACKER HOUSE GOA 2026 — ID Generator
// ============================================================

const USED_IDS = new Set<string>();

/**
 * Generate a unique Builder ID in the format HH-26-XXXX
 * Uses crypto random for collision safety
 */
export function generateBuilderId(): string {
  let id: string;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    const num = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    id = `HH-26-${num.toString().padStart(4, '0')}`;
    attempts++;
  } while (USED_IDS.has(id) && attempts < maxAttempts);

  // If we hit max attempts, use crypto for more entropy
  if (USED_IDS.has(id)) {
    const array = new Uint16Array(1);
    crypto.getRandomValues(array);
    const num = (array[0] % 9000) + 1000;
    id = `HH-26-${num.toString().padStart(4, '0')}`;
  }

  USED_IDS.add(id);
  return id;
}

/**
 * Generate a unique Team ID in the format HH-26-S-XXX
 */
export function generateTeamId(): string {
  const num = Math.floor(Math.random() * 900) + 100;
  return `HH-26-S-${num.toString().padStart(3, '0')}`;
}

/**
 * Generate a Builder Class based on stack and optional randomness
 */
export function generateBuilderClass(stack: string): {
  id: string;
  label: string;
  icon: string;
} {
  const { BUILDER_CLASSES } = require('./config');

  const stackLower = stack.toLowerCase();

  // Weight builder classes based on stack
  const weights: Record<string, string[]> = {
    shipper: ['fullstack', 'full-stack', 'product', 'startup', 'ship'],
    hacker: ['backend', 'systems', 'rust', 'go', 'c++', 'low-level', 'infra'],
    designer: ['design', 'ui', 'ux', 'figma', 'creative', 'graphic'],
    founder: ['founder', 'ceo', 'startup', 'entrepreneur', 'business'],
    researcher: ['ml', 'ai', 'research', 'data science', 'nlp', 'phd'],
    architect: ['architect', 'devops', 'cloud', 'infrastructure', 'platform'],
    tinkerer: ['hardware', 'iot', 'arduino', 'embedded', 'raspberry'],
    degen: ['web3', 'crypto', 'blockchain', 'solidity', 'defi', 'nft'],
    creator: ['content', 'video', 'writing', 'community', 'social'],
    'systems-thinker': ['distributed', 'database', 'systems', 'scaling'],
    'product-person': ['product', 'pm', 'product manager', 'analytics'],
  };

  // Find matching classes based on stack
  const matches: string[] = [];
  for (const [classId, keywords] of Object.entries(weights)) {
    if (keywords.some((kw) => stackLower.includes(kw))) {
      matches.push(classId);
    }
  }

  // Pick from matches or random
  let selectedId: string;
  if (matches.length > 0) {
    selectedId = matches[Math.floor(Math.random() * matches.length)];
  } else {
    const allClasses = BUILDER_CLASSES.map(
      (c: { id: string }) => c.id
    );
    selectedId = allClasses[Math.floor(Math.random() * allClasses.length)];
  }

  const selected = BUILDER_CLASSES.find(
    (c: { id: string }) => c.id === selectedId
  );
  return selected || BUILDER_CLASSES[0];
}
