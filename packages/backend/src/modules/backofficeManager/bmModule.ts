import { bmRepository } from './repository/bmRepositoryModule';
import { bmSessionRepository } from './repository/bmSessionRepositoryModule';
import { BMSignInUseCase } from './bmSignIn/bmSignInUseCase';
import { BMSignOutUseCase } from './bmSignOut/bmSignOutUseCase';
import { InviteBMUseCase } from './inviteBM/inviteBMUseCase';
import { GetBMsUseCase } from './getBMs/getBMsUseCase';
import { GetBMProfileUseCase } from './getBMProfile/getBMProfileUseCase';
import { GetBMProfileResolver } from './getBMProfile/getBMProfileResolver';
import { BMSignInResolver } from './bmSignIn/bmSignInResolver';
import { BMSignOutResolver } from './bmSignOut/bmSignOutResolver';
import { InviteBMResolver } from './inviteBM/inviteBMResolver';
import { GetBMsResolver } from './getBMs/getBMsResolver';

const getBMProfileUseCase = new GetBMProfileUseCase(bmRepository);
const bmSignInUseCase = new BMSignInUseCase(bmRepository, bmSessionRepository);
const bmSignOutUseCase = new BMSignOutUseCase(bmSessionRepository);
const inviteBMUseCase = new InviteBMUseCase(bmRepository);
const getBMsUseCase = new GetBMsUseCase(bmRepository);

export const getBMProfileResolver = new GetBMProfileResolver(getBMProfileUseCase);
export const bmSignInResolver = new BMSignInResolver(bmSignInUseCase, getBMProfileUseCase);
export const bmSignOutResolver = new BMSignOutResolver(bmSignOutUseCase);
export const inviteBMResolver = new InviteBMResolver(inviteBMUseCase);
export const getBMsResolver = new GetBMsResolver(getBMsUseCase);
