import { enterHouseResolver } from './houseEntryModule';

export const houseEntryResolvers = {
  Mutation: {
    enterHouse: enterHouseResolver.resolve,
  },
};
