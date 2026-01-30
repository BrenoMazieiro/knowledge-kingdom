export enum ContentType {
  BOOK = 'BOOK',
  VIDEO = 'VIDEO',
  ARTICLE = 'ARTICLE',
}

export enum QuestionDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum ConquestTier {
  NOVICE = 'NOVICE',
  ADEPT = 'ADEPT',
  MAESTRO = 'MAESTRO',
  ARCHON = 'ARCHON',
}

export enum VillageBadge {
  APPRENTICE = 'APPRENTICE',
  JOURNEYMAN = 'JOURNEYMAN',
  EXPERT = 'EXPERT',
  SAGE = 'SAGE',
}

export enum KingdomBadge {
  EXPLORER = 'EXPLORER',
  SCHOLAR = 'SCHOLAR',
  MASTER = 'MASTER',
  SOVEREIGN = 'SOVEREIGN',
}

export enum BMPermissionLevel {
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN',
}

export enum EntityVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum EntityStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}

export enum OwnerType {
  PLAYER = 'PLAYER',
  TREASURY = 'TREASURY',
}

export enum AccountType {
  PLAYER = 'PLAYER',
  KINGDOM_TREASURY = 'KINGDOM_TREASURY',
  VILLAGE_TREASURY = 'VILLAGE_TREASURY',
  PLATFORM = 'PLATFORM',
}

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export enum DuelStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
}

export enum AccessRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
}

export enum LeadershipTitle {
  KING_QUEEN = 'KING_QUEEN',
  CHANCELLOR = 'CHANCELLOR',
  MANAGER = 'MANAGER',
}

export enum AcquiredMethod {
  CLAIM = 'CLAIM',
  DUEL_WIN = 'DUEL_WIN',
  APPOINTED = 'APPOINTED',
}

export enum BadgeScopeType {
  VILLAGE = 'VILLAGE',
  KINGDOM = 'KINGDOM',
  WORLD = 'WORLD',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
