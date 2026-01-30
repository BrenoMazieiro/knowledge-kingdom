/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AccessRequest = {
  __typename?: 'AccessRequest';
  entityId: Scalars['ID']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  playerId: Scalars['ID']['output'];
  requestedAt: Scalars['DateTime']['output'];
  respondedAt?: Maybe<Scalars['DateTime']['output']>;
  respondedById?: Maybe<Scalars['ID']['output']>;
  responseReason?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type AuditLogEntry = {
  __typename?: 'AuditLogEntry';
  actionType: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  entityId: Scalars['ID']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  managerId: Scalars['ID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user: User;
};

export type BmAuthPayload = {
  __typename?: 'BMAuthPayload';
  manager: BackofficeManager;
};

export type BmSignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type BackofficeManager = {
  __typename?: 'BackofficeManager';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissionLevel: Scalars['String']['output'];
  twoFactorEnabled: Scalars['Boolean']['output'];
};

export type BlockRecord = {
  __typename?: 'BlockRecord';
  blockedAt: Scalars['DateTime']['output'];
  blockedById: Scalars['ID']['output'];
  entityId: Scalars['ID']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  presetMessage?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  unblockedAt?: Maybe<Scalars['DateTime']['output']>;
  unblockedById?: Maybe<Scalars['ID']['output']>;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type Content = {
  __typename?: 'Content';
  body?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  creatorId: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  house: House;
  houseId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  sortOrder: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: ContentType;
  url?: Maybe<Scalars['String']['output']>;
  version: Scalars['Int']['output'];
};

export enum ContentType {
  Article = 'ARTICLE',
  Book = 'BOOK',
  Video = 'VIDEO'
}

export type CreateContentInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  houseId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  type: ContentType;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateHouseGroupInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  villageId: Scalars['ID']['input'];
};

export type CreateHouseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  entryPrice?: InputMaybe<Scalars['Int']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  isFree?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  villageId: Scalars['ID']['input'];
};

export type CreateKingdomInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateQuestionInput = {
  difficulty: Scalars['String']['input'];
  explanation?: InputMaybe<Scalars['String']['input']>;
  houseId: Scalars['ID']['input'];
  options: Array<QuestionOptionInput>;
  text: Scalars['String']['input'];
};

export type CreateVillageInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  kingdomId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type DuelChallenge = {
  __typename?: 'DuelChallenge';
  challengedAt: Scalars['DateTime']['output'];
  challengerId: Scalars['ID']['output'];
  challengerScore?: Maybe<Scalars['Int']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  defenderId: Scalars['ID']['output'];
  defenderScore?: Maybe<Scalars['Int']['output']>;
  entityId: Scalars['ID']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  quillsCost: Scalars['Int']['output'];
  respondedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  winnerId?: Maybe<Scalars['ID']['output']>;
};

export type GetTransactionsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type House = {
  __typename?: 'House';
  contents: Array<Content>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  creatorId: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  entryPrice?: Maybe<Scalars['Int']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isFree: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  village: Village;
  villageId: Scalars['ID']['output'];
};

export type HouseConquest = {
  __typename?: 'HouseConquest';
  attemptCount: Scalars['Int']['output'];
  bestScorePercentage: Scalars['Int']['output'];
  bestTier: Scalars['String']['output'];
  houseId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  lastAttemptAt: Scalars['DateTime']['output'];
  nextRetryAvailableAt?: Maybe<Scalars['DateTime']['output']>;
  playerId: Scalars['ID']['output'];
  totalQuillsEarned: Scalars['Int']['output'];
};

export type HouseEntry = {
  __typename?: 'HouseEntry';
  enteredAt: Scalars['DateTime']['output'];
  houseId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  playerId: Scalars['ID']['output'];
  pricePaid: Scalars['Int']['output'];
};

export type HouseGroup = {
  __typename?: 'HouseGroup';
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['ID']['output'];
  createdByType: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  villageId: Scalars['ID']['output'];
};

export type InviteBmInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  permissionLevel: Scalars['String']['input'];
};

export type Kingdom = {
  __typename?: 'Kingdom';
  createdAt: Scalars['DateTime']['output'];
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kingQueen?: Maybe<User>;
  kingQueenId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  treasuryBalance: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  villages: Array<Village>;
  visibility: Scalars['String']['output'];
};

export type KingdomOverview = {
  __typename?: 'KingdomOverview';
  contentCount: Scalars['Int']['output'];
  houseCount: Scalars['Int']['output'];
  kingdom: Kingdom;
  questionCount: Scalars['Int']['output'];
  villageCount: Scalars['Int']['output'];
};

export type LeaderboardEntry = {
  __typename?: 'LeaderboardEntry';
  badgesEarned: Scalars['Int']['output'];
  conquests: Scalars['Int']['output'];
  gameName: Scalars['String']['output'];
  rank: Scalars['Int']['output'];
  totalQuills: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
};

export type LeadershipTitle = {
  __typename?: 'LeadershipTitle';
  acquiredAt: Scalars['DateTime']['output'];
  acquiredMethod: Scalars['String']['output'];
  entityId: Scalars['ID']['output'];
  entityType: Scalars['String']['output'];
  gracePeriodUntil?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  playerId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  bmSignIn: BmAuthPayload;
  bmSignOut: Scalars['Boolean']['output'];
  challengeLeader: DuelChallenge;
  changePassword: Scalars['Boolean']['output'];
  claimTitle: LeadershipTitle;
  completeTest: TestSession;
  createContent: Content;
  createHouse: House;
  createHouseGroup: HouseGroup;
  createKingdom: Kingdom;
  createQuestion: Question;
  createVillage: Village;
  deleteContent: Scalars['Boolean']['output'];
  deleteHouse: Scalars['Boolean']['output'];
  deleteKingdom: Scalars['Boolean']['output'];
  deleteMyAccount: Scalars['Boolean']['output'];
  deleteQuestion: Scalars['Boolean']['output'];
  deleteVillage: Scalars['Boolean']['output'];
  enterHouse: HouseEntry;
  inviteBM: BackofficeManager;
  requestAccess: AccessRequest;
  respondToAccessRequest: AccessRequest;
  signIn: AuthPayload;
  signOut: Scalars['Boolean']['output'];
  signUp: AuthPayload;
  startTest: StartTestPayload;
  submitAnswer: TestAnswer;
  updateContent: Content;
  updateHouse: House;
  updateKingdom: Kingdom;
  updateQuestion: Question;
  updateVillage: Village;
  validateEmail: Scalars['Boolean']['output'];
};


export type MutationBmSignInArgs = {
  input: BmSignInInput;
};


export type MutationChallengeLeaderArgs = {
  entityId: Scalars['ID']['input'];
  entityType: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationClaimTitleArgs = {
  entityId: Scalars['ID']['input'];
  entityType: Scalars['String']['input'];
};


export type MutationCompleteTestArgs = {
  testSessionId: Scalars['ID']['input'];
};


export type MutationCreateContentArgs = {
  input: CreateContentInput;
};


export type MutationCreateHouseArgs = {
  input: CreateHouseInput;
};


export type MutationCreateHouseGroupArgs = {
  input: CreateHouseGroupInput;
};


export type MutationCreateKingdomArgs = {
  input: CreateKingdomInput;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationCreateVillageArgs = {
  input: CreateVillageInput;
};


export type MutationDeleteContentArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
};


export type MutationDeleteHouseArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
};


export type MutationDeleteKingdomArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
};


export type MutationDeleteVillageArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
};


export type MutationEnterHouseArgs = {
  houseId: Scalars['ID']['input'];
};


export type MutationInviteBmArgs = {
  input: InviteBmInput;
};


export type MutationRequestAccessArgs = {
  entityId: Scalars['ID']['input'];
  entityType: Scalars['String']['input'];
};


export type MutationRespondToAccessRequestArgs = {
  approved: Scalars['Boolean']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  requestId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationStartTestArgs = {
  houseId: Scalars['ID']['input'];
};


export type MutationSubmitAnswerArgs = {
  answerId: Scalars['ID']['input'];
  selectedOptionId: Scalars['ID']['input'];
};


export type MutationUpdateContentArgs = {
  input: UpdateContentInput;
};


export type MutationUpdateHouseArgs = {
  input: UpdateHouseInput;
};


export type MutationUpdateKingdomArgs = {
  input: UpdateKingdomInput;
};


export type MutationUpdateQuestionArgs = {
  input: UpdateQuestionInput;
};


export type MutationUpdateVillageArgs = {
  input: UpdateVillageInput;
};


export type MutationValidateEmailArgs = {
  input: ValidateEmailInput;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginationInput = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  sortBy?: Scalars['String']['input'];
  sortOrder?: SortOrder;
};

export type PlayerBadge = {
  __typename?: 'PlayerBadge';
  badgeType: Scalars['String']['output'];
  earnedAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  playerId: Scalars['ID']['output'];
  quillsEarned: Scalars['Int']['output'];
  scopeId?: Maybe<Scalars['ID']['output']>;
  scopeType: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  accessRequests: Array<AccessRequest>;
  auditLog: Array<AuditLogEntry>;
  backofficeManagers: Array<BackofficeManager>;
  blockRecords: Array<BlockRecord>;
  bmMe?: Maybe<BackofficeManager>;
  content: Content;
  contents: Array<Content>;
  exportMyData: UserDataExport;
  house: House;
  houseGroups: Array<HouseGroup>;
  houses: Array<House>;
  kingdom: Kingdom;
  kingdomOverview: KingdomOverview;
  kingdoms: Array<Kingdom>;
  leaderboard: Array<LeaderboardEntry>;
  me?: Maybe<User>;
  myBadges: Array<PlayerBadge>;
  myConquests: Array<HouseConquest>;
  myTitles: Array<LeadershipTitle>;
  myTransactions: Array<Transaction>;
  myWallet: Wallet;
  questionPool: QuestionPool;
  questions: Array<Question>;
  users: Array<User>;
  village: Village;
  villageOverview: VillageOverview;
  villages: Array<Village>;
};


export type QueryAccessRequestsArgs = {
  entityId: Scalars['ID']['input'];
  entityType: Scalars['String']['input'];
};


export type QueryAuditLogArgs = {
  entityId: Scalars['ID']['input'];
  entityType: Scalars['String']['input'];
};


export type QueryBlockRecordsArgs = {
  entityId: Scalars['ID']['input'];
  entityType: Scalars['String']['input'];
};


export type QueryContentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContentsArgs = {
  houseId: Scalars['ID']['input'];
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryHouseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHouseGroupsArgs = {
  villageId: Scalars['ID']['input'];
};


export type QueryHousesArgs = {
  pagination?: InputMaybe<PaginationInput>;
  villageId: Scalars['ID']['input'];
};


export type QueryKingdomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryKingdomOverviewArgs = {
  kingdomId: Scalars['ID']['input'];
};


export type QueryKingdomsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryLeaderboardArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyTransactionsArgs = {
  input?: InputMaybe<GetTransactionsInput>;
};


export type QueryQuestionPoolArgs = {
  houseId: Scalars['ID']['input'];
};


export type QueryQuestionsArgs = {
  houseId: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryVillageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVillageOverviewArgs = {
  villageId: Scalars['ID']['input'];
};


export type QueryVillagesArgs = {
  kingdomId: Scalars['ID']['input'];
  pagination?: InputMaybe<PaginationInput>;
};

export type Question = {
  __typename?: 'Question';
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['ID']['output'];
  difficulty: Scalars['String']['output'];
  explanation?: Maybe<Scalars['String']['output']>;
  houseId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  options: Array<QuestionOption>;
  sortOrder: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type QuestionOption = {
  __typename?: 'QuestionOption';
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  questionId: Scalars['ID']['output'];
  sortOrder: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export type QuestionOptionInput = {
  isCorrect: Scalars['Boolean']['input'];
  text: Scalars['String']['input'];
};

export type QuestionPool = {
  __typename?: 'QuestionPool';
  counts: QuestionPoolCounts;
  houseId: Scalars['ID']['output'];
  total: Scalars['Int']['output'];
};

export type QuestionPoolCounts = {
  __typename?: 'QuestionPoolCounts';
  EASY: Scalars['Int']['output'];
  HARD: Scalars['Int']['output'];
  MEDIUM: Scalars['Int']['output'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  gameName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StartTestPayload = {
  __typename?: 'StartTestPayload';
  answers: Array<TestAnswer>;
  session: TestSession;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']['output']>;
};

export type TestAnswer = {
  __typename?: 'TestAnswer';
  answeredAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  questionId: Scalars['ID']['output'];
  selectedOptionId?: Maybe<Scalars['ID']['output']>;
  testSessionId: Scalars['ID']['output'];
};

export type TestSession = {
  __typename?: 'TestSession';
  attemptNumber: Scalars['Int']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  correctCount: Scalars['Int']['output'];
  houseId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  isFirstOfDay: Scalars['Boolean']['output'];
  playerId: Scalars['ID']['output'];
  questionCount: Scalars['Int']['output'];
  quillsEarned: Scalars['Int']['output'];
  scorePercentage: Scalars['Int']['output'];
  startedAt: Scalars['DateTime']['output'];
  tierAchieved?: Maybe<Scalars['String']['output']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  accountId: Scalars['ID']['output'];
  accountType: Scalars['String']['output'];
  amount: Scalars['Int']['output'];
  balanceAfter: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  referenceId?: Maybe<Scalars['ID']['output']>;
  referenceType?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type UpdateContentInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ContentType>;
  url?: InputMaybe<Scalars['String']['input']>;
  version: Scalars['Int']['input'];
};

export type UpdateHouseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  entryPrice?: InputMaybe<Scalars['Int']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  version: Scalars['Int']['input'];
};

export type UpdateKingdomInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  version: Scalars['Int']['input'];
};

export type UpdateQuestionInput = {
  difficulty?: InputMaybe<Scalars['String']['input']>;
  explanation?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  options?: InputMaybe<Array<QuestionOptionInput>>;
  text?: InputMaybe<Scalars['String']['input']>;
  version: Scalars['Int']['input'];
};

export type UpdateVillageInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  version: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  gameName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UserDataExport = {
  __typename?: 'UserDataExport';
  exportedAt: Scalars['DateTime']['output'];
  profile: UserProfile;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  gameName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ValidateEmailInput = {
  token: Scalars['String']['input'];
};

export type Village = {
  __typename?: 'Village';
  chancellor?: Maybe<User>;
  chancellorId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  houses: Array<House>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kingdom: Kingdom;
  kingdomId: Scalars['ID']['output'];
  manager?: Maybe<User>;
  managerId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  treasuryBalance: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  visibility: Scalars['String']['output'];
};

export type VillageOverview = {
  __typename?: 'VillageOverview';
  badgesEarned: Scalars['Int']['output'];
  conquests: Scalars['Int']['output'];
  contentCount: Scalars['Int']['output'];
  houseCount: Scalars['Int']['output'];
  questionCount: Scalars['Int']['output'];
  village: Village;
};

export type Wallet = {
  __typename?: 'Wallet';
  balance: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  playerId: Scalars['ID']['output'];
};

export type BmMeQueryVariables = Exact<{ [key: string]: never; }>;


export type BmMeQuery = { __typename?: 'Query', bmMe?: { __typename?: 'BackofficeManager', id: string, email: string, name: string, permissionLevel: string } | null };

export type BmSignInMutationVariables = Exact<{
  input: BmSignInInput;
}>;


export type BmSignInMutation = { __typename?: 'Mutation', bmSignIn: { __typename?: 'BMAuthPayload', manager: { __typename?: 'BackofficeManager', id: string, email: string, name: string, permissionLevel: string } } };

export type BmSignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type BmSignOutMutation = { __typename?: 'Mutation', bmSignOut: boolean };

export type GetMyBadgesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBadgesQuery = { __typename?: 'Query', myBadges: Array<{ __typename?: 'PlayerBadge', id: string, playerId: string, badgeType: string, scopeType: string, scopeId?: string | null, quillsEarned: number, earnedAt: any }> };

export type GetBackofficeManagersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBackofficeManagersQuery = { __typename?: 'Query', backofficeManagers: Array<{ __typename?: 'BackofficeManager', id: string, email: string, name: string, permissionLevel: string, createdAt: any }> };

export type InviteBmMutationVariables = Exact<{
  input: InviteBmInput;
}>;


export type InviteBmMutation = { __typename?: 'Mutation', inviteBM: { __typename?: 'BackofficeManager', id: string, email: string, name: string, permissionLevel: string, createdAt: any } };

export type GetContentsQueryVariables = Exact<{
  houseId: Scalars['ID']['input'];
}>;


export type GetContentsQuery = { __typename?: 'Query', contents: Array<{ __typename?: 'Content', id: string, version: number, houseId: string, creatorId: string, title: string, type: ContentType, url?: string | null, body?: string | null, description?: string | null, sortOrder: number, createdAt: any }> };

export type GetContentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetContentQuery = { __typename?: 'Query', content: { __typename?: 'Content', id: string, version: number, houseId: string, creatorId: string, title: string, type: ContentType, url?: string | null, body?: string | null, description?: string | null, sortOrder: number, createdAt: any } };

export type CreateContentMutationVariables = Exact<{
  input: CreateContentInput;
}>;


export type CreateContentMutation = { __typename?: 'Mutation', createContent: { __typename?: 'Content', id: string, version: number, houseId: string, title: string, type: ContentType, url?: string | null, body?: string | null, description?: string | null, sortOrder: number, createdAt: any } };

export type UpdateContentMutationVariables = Exact<{
  input: UpdateContentInput;
}>;


export type UpdateContentMutation = { __typename?: 'Mutation', updateContent: { __typename?: 'Content', id: string, version: number, houseId: string, title: string, type: ContentType, url?: string | null, body?: string | null, description?: string | null, sortOrder: number, createdAt: any } };

export type DeleteContentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
}>;


export type DeleteContentMutation = { __typename?: 'Mutation', deleteContent: boolean };

export type GetHousesQueryVariables = Exact<{
  villageId: Scalars['ID']['input'];
}>;


export type GetHousesQuery = { __typename?: 'Query', houses: Array<{ __typename?: 'House', id: string, version: number, villageId: string, creatorId: string, ownerType: string, name: string, description?: string | null, iconUrl?: string | null, isFree: boolean, entryPrice?: number | null, sortOrder: number, createdAt: any }> };

export type GetHouseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetHouseQuery = { __typename?: 'Query', house: { __typename?: 'House', id: string, version: number, villageId: string, creatorId: string, ownerType: string, name: string, description?: string | null, iconUrl?: string | null, isFree: boolean, entryPrice?: number | null, sortOrder: number, createdAt: any, village: { __typename?: 'Village', id: string, name: string, kingdom: { __typename?: 'Kingdom', id: string, name: string } }, creator: { __typename?: 'User', id: string, name: string }, contents: Array<{ __typename?: 'Content', id: string, version: number, title: string, type: ContentType, url?: string | null, body?: string | null, description?: string | null, sortOrder: number, createdAt: any }> } };

export type CreateHouseMutationVariables = Exact<{
  input: CreateHouseInput;
}>;


export type CreateHouseMutation = { __typename?: 'Mutation', createHouse: { __typename?: 'House', id: string, version: number, villageId: string, name: string, description?: string | null, isFree: boolean, entryPrice?: number | null, sortOrder: number, createdAt: any } };

export type UpdateHouseMutationVariables = Exact<{
  input: UpdateHouseInput;
}>;


export type UpdateHouseMutation = { __typename?: 'Mutation', updateHouse: { __typename?: 'House', id: string, version: number, villageId: string, name: string, description?: string | null, iconUrl?: string | null, isFree: boolean, entryPrice?: number | null, sortOrder: number, createdAt: any } };

export type DeleteHouseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
}>;


export type DeleteHouseMutation = { __typename?: 'Mutation', deleteHouse: boolean };

export type GetKingdomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetKingdomsQuery = { __typename?: 'Query', kingdoms: Array<{ __typename?: 'Kingdom', id: string, version: number, name: string, description?: string | null, iconUrl?: string | null, visibility: string, status: string, treasuryBalance: number, sortOrder: number, createdAt: any }> };

export type GetKingdomQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetKingdomQuery = { __typename?: 'Query', kingdom: { __typename?: 'Kingdom', id: string, version: number, name: string, description?: string | null, iconUrl?: string | null, visibility: string, status: string, treasuryBalance: number, creatorId?: string | null, kingQueenId?: string | null, sortOrder: number, createdAt: any, villages: Array<{ __typename?: 'Village', id: string, name: string, sortOrder: number }> } };

export type GetKingdomOverviewQueryVariables = Exact<{
  kingdomId: Scalars['ID']['input'];
}>;


export type GetKingdomOverviewQuery = { __typename?: 'Query', kingdomOverview: { __typename?: 'KingdomOverview', villageCount: number, houseCount: number, questionCount: number, contentCount: number, kingdom: { __typename?: 'Kingdom', id: string, version: number, name: string, description?: string | null, iconUrl?: string | null, visibility: string, status: string, treasuryBalance: number, sortOrder: number, createdAt: any } } };

export type CreateKingdomMutationVariables = Exact<{
  input: CreateKingdomInput;
}>;


export type CreateKingdomMutation = { __typename?: 'Mutation', createKingdom: { __typename?: 'Kingdom', id: string, version: number, name: string, description?: string | null, iconUrl?: string | null, visibility: string, status: string, sortOrder: number, createdAt: any } };

export type UpdateKingdomMutationVariables = Exact<{
  input: UpdateKingdomInput;
}>;


export type UpdateKingdomMutation = { __typename?: 'Mutation', updateKingdom: { __typename?: 'Kingdom', id: string, version: number, name: string, description?: string | null, iconUrl?: string | null, visibility: string, status: string, sortOrder: number, createdAt: any } };

export type DeleteKingdomMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
}>;


export type DeleteKingdomMutation = { __typename?: 'Mutation', deleteKingdom: boolean };

export type GetLeaderboardQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetLeaderboardQuery = { __typename?: 'Query', leaderboard: Array<{ __typename?: 'LeaderboardEntry', userId: string, gameName: string, totalQuills: number, conquests: number, badgesEarned: number, rank: number }> };

export type GetQuestionsQueryVariables = Exact<{
  houseId: Scalars['ID']['input'];
}>;


export type GetQuestionsQuery = { __typename?: 'Query', questions: Array<{ __typename?: 'Question', id: string, version: number, houseId: string, creatorId: string, text: string, difficulty: string, explanation?: string | null, sortOrder: number, createdAt: any, options: Array<{ __typename?: 'QuestionOption', id: string, questionId: string, text: string, isCorrect: boolean, sortOrder: number }> }> };

export type GetQuestionPoolQueryVariables = Exact<{
  houseId: Scalars['ID']['input'];
}>;


export type GetQuestionPoolQuery = { __typename?: 'Query', questionPool: { __typename?: 'QuestionPool', houseId: string, total: number, counts: { __typename?: 'QuestionPoolCounts', EASY: number, MEDIUM: number, HARD: number } } };

export type CreateQuestionMutationVariables = Exact<{
  input: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'Question', id: string, version: number, houseId: string, text: string, difficulty: string, explanation?: string | null, sortOrder: number, createdAt: any, options: Array<{ __typename?: 'QuestionOption', id: string, text: string, isCorrect: boolean, sortOrder: number }> } };

export type UpdateQuestionMutationVariables = Exact<{
  input: UpdateQuestionInput;
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', updateQuestion: { __typename?: 'Question', id: string, version: number, houseId: string, text: string, difficulty: string, explanation?: string | null, sortOrder: number, options: Array<{ __typename?: 'QuestionOption', id: string, text: string, isCorrect: boolean, sortOrder: number }> } };

export type DeleteQuestionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
}>;


export type DeleteQuestionMutation = { __typename?: 'Mutation', deleteQuestion: boolean };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, name: string, gameName: string, emailVerified: boolean, createdAt: any }> };

export type GetVillagesQueryVariables = Exact<{
  kingdomId: Scalars['ID']['input'];
}>;


export type GetVillagesQuery = { __typename?: 'Query', villages: Array<{ __typename?: 'Village', id: string, version: number, kingdomId: string, name: string, description?: string | null, iconUrl?: string | null, visibility: string, status: string, chancellorId?: string | null, treasuryBalance: number, sortOrder: number, createdAt: any }> };

export type GetVillageQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetVillageQuery = { __typename?: 'Query', village: { __typename?: 'Village', id: string, version: number, kingdomId: string, name: string, description?: string | null, iconUrl?: string | null, visibility: string, status: string, chancellorId?: string | null, treasuryBalance: number, sortOrder: number, createdAt: any, kingdom: { __typename?: 'Kingdom', id: string, name: string }, houses: Array<{ __typename?: 'House', id: string, name: string, sortOrder: number }> } };

export type GetVillageOverviewQueryVariables = Exact<{
  villageId: Scalars['ID']['input'];
}>;


export type GetVillageOverviewQuery = { __typename?: 'Query', villageOverview: { __typename?: 'VillageOverview', houseCount: number, questionCount: number, contentCount: number, conquests: number, badgesEarned: number, village: { __typename?: 'Village', id: string, version: number, name: string, description?: string | null, iconUrl?: string | null, visibility: string, status: string, treasuryBalance: number, sortOrder: number, createdAt: any, kingdom: { __typename?: 'Kingdom', id: string, name: string } } } };

export type CreateVillageMutationVariables = Exact<{
  input: CreateVillageInput;
}>;


export type CreateVillageMutation = { __typename?: 'Mutation', createVillage: { __typename?: 'Village', id: string, version: number, kingdomId: string, name: string, description?: string | null, iconUrl?: string | null, visibility: string, status: string, sortOrder: number, createdAt: any } };

export type UpdateVillageMutationVariables = Exact<{
  input: UpdateVillageInput;
}>;


export type UpdateVillageMutation = { __typename?: 'Mutation', updateVillage: { __typename?: 'Village', id: string, version: number, kingdomId: string, name: string, description?: string | null, iconUrl?: string | null, visibility: string, status: string, sortOrder: number, createdAt: any } };

export type DeleteVillageMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
}>;


export type DeleteVillageMutation = { __typename?: 'Mutation', deleteVillage: boolean };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const BmMeDocument = new TypedDocumentString(`
    query BMMe {
  bmMe {
    id
    email
    name
    permissionLevel
  }
}
    `) as unknown as TypedDocumentString<BmMeQuery, BmMeQueryVariables>;
export const BmSignInDocument = new TypedDocumentString(`
    mutation BMSignIn($input: BMSignInInput!) {
  bmSignIn(input: $input) {
    manager {
      id
      email
      name
      permissionLevel
    }
  }
}
    `) as unknown as TypedDocumentString<BmSignInMutation, BmSignInMutationVariables>;
export const BmSignOutDocument = new TypedDocumentString(`
    mutation BMSignOut {
  bmSignOut
}
    `) as unknown as TypedDocumentString<BmSignOutMutation, BmSignOutMutationVariables>;
export const GetMyBadgesDocument = new TypedDocumentString(`
    query GetMyBadges {
  myBadges {
    id
    playerId
    badgeType
    scopeType
    scopeId
    quillsEarned
    earnedAt
  }
}
    `) as unknown as TypedDocumentString<GetMyBadgesQuery, GetMyBadgesQueryVariables>;
export const GetBackofficeManagersDocument = new TypedDocumentString(`
    query GetBackofficeManagers {
  backofficeManagers {
    id
    email
    name
    permissionLevel
    createdAt
  }
}
    `) as unknown as TypedDocumentString<GetBackofficeManagersQuery, GetBackofficeManagersQueryVariables>;
export const InviteBmDocument = new TypedDocumentString(`
    mutation InviteBM($input: InviteBMInput!) {
  inviteBM(input: $input) {
    id
    email
    name
    permissionLevel
    createdAt
  }
}
    `) as unknown as TypedDocumentString<InviteBmMutation, InviteBmMutationVariables>;
export const GetContentsDocument = new TypedDocumentString(`
    query GetContents($houseId: ID!) {
  contents(houseId: $houseId) {
    id
    version
    houseId
    creatorId
    title
    type
    url
    body
    description
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<GetContentsQuery, GetContentsQueryVariables>;
export const GetContentDocument = new TypedDocumentString(`
    query GetContent($id: ID!) {
  content(id: $id) {
    id
    version
    houseId
    creatorId
    title
    type
    url
    body
    description
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<GetContentQuery, GetContentQueryVariables>;
export const CreateContentDocument = new TypedDocumentString(`
    mutation CreateContent($input: CreateContentInput!) {
  createContent(input: $input) {
    id
    version
    houseId
    title
    type
    url
    body
    description
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<CreateContentMutation, CreateContentMutationVariables>;
export const UpdateContentDocument = new TypedDocumentString(`
    mutation UpdateContent($input: UpdateContentInput!) {
  updateContent(input: $input) {
    id
    version
    houseId
    title
    type
    url
    body
    description
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<UpdateContentMutation, UpdateContentMutationVariables>;
export const DeleteContentDocument = new TypedDocumentString(`
    mutation DeleteContent($id: ID!, $version: Int!) {
  deleteContent(id: $id, version: $version)
}
    `) as unknown as TypedDocumentString<DeleteContentMutation, DeleteContentMutationVariables>;
export const GetHousesDocument = new TypedDocumentString(`
    query GetHouses($villageId: ID!) {
  houses(villageId: $villageId) {
    id
    version
    villageId
    creatorId
    ownerType
    name
    description
    iconUrl
    isFree
    entryPrice
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<GetHousesQuery, GetHousesQueryVariables>;
export const GetHouseDocument = new TypedDocumentString(`
    query GetHouse($id: ID!) {
  house(id: $id) {
    id
    version
    villageId
    creatorId
    ownerType
    name
    description
    iconUrl
    isFree
    entryPrice
    sortOrder
    createdAt
    village {
      id
      name
      kingdom {
        id
        name
      }
    }
    creator {
      id
      name
    }
    contents {
      id
      version
      title
      type
      url
      body
      description
      sortOrder
      createdAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetHouseQuery, GetHouseQueryVariables>;
export const CreateHouseDocument = new TypedDocumentString(`
    mutation CreateHouse($input: CreateHouseInput!) {
  createHouse(input: $input) {
    id
    version
    villageId
    name
    description
    isFree
    entryPrice
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<CreateHouseMutation, CreateHouseMutationVariables>;
export const UpdateHouseDocument = new TypedDocumentString(`
    mutation UpdateHouse($input: UpdateHouseInput!) {
  updateHouse(input: $input) {
    id
    version
    villageId
    name
    description
    iconUrl
    isFree
    entryPrice
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<UpdateHouseMutation, UpdateHouseMutationVariables>;
export const DeleteHouseDocument = new TypedDocumentString(`
    mutation DeleteHouse($id: ID!, $version: Int!) {
  deleteHouse(id: $id, version: $version)
}
    `) as unknown as TypedDocumentString<DeleteHouseMutation, DeleteHouseMutationVariables>;
export const GetKingdomsDocument = new TypedDocumentString(`
    query GetKingdoms {
  kingdoms {
    id
    version
    name
    description
    iconUrl
    visibility
    status
    treasuryBalance
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<GetKingdomsQuery, GetKingdomsQueryVariables>;
export const GetKingdomDocument = new TypedDocumentString(`
    query GetKingdom($id: ID!) {
  kingdom(id: $id) {
    id
    version
    name
    description
    iconUrl
    visibility
    status
    treasuryBalance
    creatorId
    kingQueenId
    sortOrder
    createdAt
    villages {
      id
      name
      sortOrder
    }
  }
}
    `) as unknown as TypedDocumentString<GetKingdomQuery, GetKingdomQueryVariables>;
export const GetKingdomOverviewDocument = new TypedDocumentString(`
    query GetKingdomOverview($kingdomId: ID!) {
  kingdomOverview(kingdomId: $kingdomId) {
    kingdom {
      id
      version
      name
      description
      iconUrl
      visibility
      status
      treasuryBalance
      sortOrder
      createdAt
    }
    villageCount
    houseCount
    questionCount
    contentCount
  }
}
    `) as unknown as TypedDocumentString<GetKingdomOverviewQuery, GetKingdomOverviewQueryVariables>;
export const CreateKingdomDocument = new TypedDocumentString(`
    mutation CreateKingdom($input: CreateKingdomInput!) {
  createKingdom(input: $input) {
    id
    version
    name
    description
    iconUrl
    visibility
    status
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<CreateKingdomMutation, CreateKingdomMutationVariables>;
export const UpdateKingdomDocument = new TypedDocumentString(`
    mutation UpdateKingdom($input: UpdateKingdomInput!) {
  updateKingdom(input: $input) {
    id
    version
    name
    description
    iconUrl
    visibility
    status
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<UpdateKingdomMutation, UpdateKingdomMutationVariables>;
export const DeleteKingdomDocument = new TypedDocumentString(`
    mutation DeleteKingdom($id: ID!, $version: Int!) {
  deleteKingdom(id: $id, version: $version)
}
    `) as unknown as TypedDocumentString<DeleteKingdomMutation, DeleteKingdomMutationVariables>;
export const GetLeaderboardDocument = new TypedDocumentString(`
    query GetLeaderboard($limit: Int) {
  leaderboard(limit: $limit) {
    userId
    gameName
    totalQuills
    conquests
    badgesEarned
    rank
  }
}
    `) as unknown as TypedDocumentString<GetLeaderboardQuery, GetLeaderboardQueryVariables>;
export const GetQuestionsDocument = new TypedDocumentString(`
    query GetQuestions($houseId: ID!) {
  questions(houseId: $houseId) {
    id
    version
    houseId
    creatorId
    text
    difficulty
    explanation
    sortOrder
    createdAt
    options {
      id
      questionId
      text
      isCorrect
      sortOrder
    }
  }
}
    `) as unknown as TypedDocumentString<GetQuestionsQuery, GetQuestionsQueryVariables>;
export const GetQuestionPoolDocument = new TypedDocumentString(`
    query GetQuestionPool($houseId: ID!) {
  questionPool(houseId: $houseId) {
    houseId
    counts {
      EASY
      MEDIUM
      HARD
    }
    total
  }
}
    `) as unknown as TypedDocumentString<GetQuestionPoolQuery, GetQuestionPoolQueryVariables>;
export const CreateQuestionDocument = new TypedDocumentString(`
    mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
    version
    houseId
    text
    difficulty
    explanation
    sortOrder
    createdAt
    options {
      id
      text
      isCorrect
      sortOrder
    }
  }
}
    `) as unknown as TypedDocumentString<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const UpdateQuestionDocument = new TypedDocumentString(`
    mutation UpdateQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
    id
    version
    houseId
    text
    difficulty
    explanation
    sortOrder
    options {
      id
      text
      isCorrect
      sortOrder
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const DeleteQuestionDocument = new TypedDocumentString(`
    mutation DeleteQuestion($id: ID!, $version: Int!) {
  deleteQuestion(id: $id, version: $version)
}
    `) as unknown as TypedDocumentString<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
export const GetUsersDocument = new TypedDocumentString(`
    query GetUsers {
  users {
    id
    email
    name
    gameName
    emailVerified
    createdAt
  }
}
    `) as unknown as TypedDocumentString<GetUsersQuery, GetUsersQueryVariables>;
export const GetVillagesDocument = new TypedDocumentString(`
    query GetVillages($kingdomId: ID!) {
  villages(kingdomId: $kingdomId) {
    id
    version
    kingdomId
    name
    description
    iconUrl
    visibility
    status
    chancellorId
    treasuryBalance
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<GetVillagesQuery, GetVillagesQueryVariables>;
export const GetVillageDocument = new TypedDocumentString(`
    query GetVillage($id: ID!) {
  village(id: $id) {
    id
    version
    kingdomId
    name
    description
    iconUrl
    visibility
    status
    chancellorId
    treasuryBalance
    sortOrder
    createdAt
    kingdom {
      id
      name
    }
    houses {
      id
      name
      sortOrder
    }
  }
}
    `) as unknown as TypedDocumentString<GetVillageQuery, GetVillageQueryVariables>;
export const GetVillageOverviewDocument = new TypedDocumentString(`
    query GetVillageOverview($villageId: ID!) {
  villageOverview(villageId: $villageId) {
    village {
      id
      version
      name
      description
      iconUrl
      visibility
      status
      treasuryBalance
      sortOrder
      createdAt
      kingdom {
        id
        name
      }
    }
    houseCount
    questionCount
    contentCount
    conquests
    badgesEarned
  }
}
    `) as unknown as TypedDocumentString<GetVillageOverviewQuery, GetVillageOverviewQueryVariables>;
export const CreateVillageDocument = new TypedDocumentString(`
    mutation CreateVillage($input: CreateVillageInput!) {
  createVillage(input: $input) {
    id
    version
    kingdomId
    name
    description
    iconUrl
    visibility
    status
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<CreateVillageMutation, CreateVillageMutationVariables>;
export const UpdateVillageDocument = new TypedDocumentString(`
    mutation UpdateVillage($input: UpdateVillageInput!) {
  updateVillage(input: $input) {
    id
    version
    kingdomId
    name
    description
    iconUrl
    visibility
    status
    sortOrder
    createdAt
  }
}
    `) as unknown as TypedDocumentString<UpdateVillageMutation, UpdateVillageMutationVariables>;
export const DeleteVillageDocument = new TypedDocumentString(`
    mutation DeleteVillage($id: ID!, $version: Int!) {
  deleteVillage(id: $id, version: $version)
}
    `) as unknown as TypedDocumentString<DeleteVillageMutation, DeleteVillageMutationVariables>;