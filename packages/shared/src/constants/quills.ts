/** Quill rewards for achieving conquest tiers */
export const QUILL_REWARDS = {
  NOVICE: 50,
  ADEPT: 150,
  MAESTRO: 400,
  ARCHON: 1000,
} as const;

/** Quill costs for various actions */
export const QUILL_COSTS = {
  CREATE_HOUSE: 500,
  RETAKE_2: 50,
  RETAKE_3: 150,
  RETAKE_4_PLUS: 300,
  CHALLENGE_CHANCELLOR: 500,
  CHALLENGE_KING_QUEEN: 1000,
} as const;

/** Revenue split for paid house entries (percentages) */
export const REVENUE_SPLIT = {
  OWNER: 70,
  PLATFORM: 20,
  KINGDOM_TREASURY: 7,
  VILLAGE_TREASURY: 3,
} as const;

/** Cooldown periods for test retakes (in hours) */
export const RETAKE_COOLDOWNS = {
  ATTEMPT_2: 24,
  ATTEMPT_3: 72,
  ATTEMPT_4_PLUS: 168,
} as const;

/** Score percentage thresholds for conquest tiers */
export const TIER_THRESHOLDS = {
  NOVICE: 50,
  ADEPT: 75,
  MAESTRO: 90,
  ARCHON: 100,
} as const;

/** Village/Kingdom badge thresholds as completion percentages */
export const BADGE_THRESHOLDS = {
  TIER_1: 25,
  TIER_2: 50,
  TIER_3: 75,
  TIER_4: 100,
} as const;

/** Village badge quill rewards */
export const VILLAGE_BADGE_REWARDS = {
  APPRENTICE: 200,
  JOURNEYMAN: 500,
  EXPERT: 1000,
  SAGE: 2500,
} as const;

/** Kingdom badge quill rewards */
export const KINGDOM_BADGE_REWARDS = {
  EXPLORER: 500,
  SCHOLAR: 1500,
  MASTER: 3000,
  SOVEREIGN: 5000,
} as const;

/** Grand Archivist reward (Sovereign in ALL kingdoms) */
export const GRAND_ARCHIVIST_REWARD = 10000;

/** Minimum questions required per house to create a test */
export const MIN_QUESTIONS_PER_HOUSE = 5;

/** Cooldown period between duel challenges (in days) */
export const DUEL_COOLDOWN_DAYS = 30;

/** Number of questions in a duel test */
export const DUEL_QUESTION_COUNT = 50;

/** Daily bonus quills for first test of the day */
export const DAILY_BONUS_QUILLS = 25;

/** Leadership claim threshold: 70% Archon in villages/houses */
export const LEADERSHIP_CLAIM_THRESHOLD = 70;

/** Chancellor challenge threshold: 30% Archon in village houses */
export const CHANCELLOR_CHALLENGE_THRESHOLD = 30;
