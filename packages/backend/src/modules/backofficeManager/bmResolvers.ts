import {
  getBMProfileResolver,
  bmSignInResolver,
  bmSignOutResolver,
  inviteBMResolver,
  getBMsResolver,
} from './bmModule';

export const bmResolvers = {
  Query: {
    bmMe: getBMProfileResolver.resolve,
    backofficeManagers: getBMsResolver.resolve,
  },
  Mutation: {
    bmSignIn: bmSignInResolver.resolve,
    bmSignOut: bmSignOutResolver.resolve,
    inviteBM: inviteBMResolver.resolve,
  },
};
