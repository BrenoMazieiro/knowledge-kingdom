import {
  meResolver,
  signUpResolver,
  signInResolver,
  signOutResolver,
  validateEmailResolver,
  deleteMyAccountResolver,
  exportMyDataResolver,
  changePasswordResolver,
} from './authModule';

export const authResolvers = {
  Query: {
    me: meResolver.resolve,
    exportMyData: exportMyDataResolver.resolve,
  },
  Mutation: {
    signUp: signUpResolver.resolve,
    signIn: signInResolver.resolve,
    signOut: signOutResolver.resolve,
    validateEmail: validateEmailResolver.resolve,
    deleteMyAccount: deleteMyAccountResolver.resolve,
    changePassword: changePasswordResolver.resolve,
  },
};
