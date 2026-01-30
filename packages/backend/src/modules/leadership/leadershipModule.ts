import { leadershipTitleRepository } from './repository/leadershipTitleRepositoryModule';
import { duelChallengeRepository } from './repository/duelChallengeRepositoryModule';
import { walletRepository } from '../wallet/repository/walletRepositoryModule';
import { ClaimTitleUseCase } from './claimTitle/claimTitleUseCase';
import { GetMyTitlesUseCase } from './getMyTitles/getMyTitlesUseCase';
import { ChallengeLeaderUseCase } from './challengeLeader/challengeLeaderUseCase';
import { ClaimTitleResolver } from './claimTitle/claimTitleResolver';
import { GetMyTitlesResolver } from './getMyTitles/getMyTitlesResolver';
import { ChallengeLeaderResolver } from './challengeLeader/challengeLeaderResolver';

const claimTitleUseCase = new ClaimTitleUseCase(leadershipTitleRepository);
const getMyTitlesUseCase = new GetMyTitlesUseCase(leadershipTitleRepository);
const challengeLeaderUseCase = new ChallengeLeaderUseCase(leadershipTitleRepository, duelChallengeRepository, walletRepository);

export const claimTitleResolver = new ClaimTitleResolver(claimTitleUseCase);
export const getMyTitlesResolver = new GetMyTitlesResolver(getMyTitlesUseCase);
export const challengeLeaderResolver = new ChallengeLeaderResolver(challengeLeaderUseCase);
