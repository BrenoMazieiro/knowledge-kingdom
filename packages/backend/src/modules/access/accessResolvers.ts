import { requestAccessResolver, respondToAccessRequestResolver, getAccessRequestsResolver } from './accessModule';

export const accessResolvers = {
  Query: {
    accessRequests: getAccessRequestsResolver.resolve,
  },
  Mutation: {
    requestAccess: requestAccessResolver.resolve,
    respondToAccessRequest: respondToAccessRequestResolver.resolve,
  },
};
