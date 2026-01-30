import { accessRequestRepository } from './repository/accessRequestRepositoryModule';
import { RequestAccessUseCase } from './requestAccess/requestAccessUseCase';
import { RespondToAccessRequestUseCase } from './respondToAccessRequest/respondToAccessRequestUseCase';
import { GetAccessRequestsUseCase } from './getAccessRequests/getAccessRequestsUseCase';
import { RequestAccessResolver } from './requestAccess/requestAccessResolver';
import { RespondToAccessRequestResolver } from './respondToAccessRequest/respondToAccessRequestResolver';
import { GetAccessRequestsResolver } from './getAccessRequests/getAccessRequestsResolver';

const requestAccessUseCase = new RequestAccessUseCase(accessRequestRepository);
const respondToAccessRequestUseCase = new RespondToAccessRequestUseCase(accessRequestRepository);
const getAccessRequestsUseCase = new GetAccessRequestsUseCase(accessRequestRepository);

export const requestAccessResolver = new RequestAccessResolver(requestAccessUseCase);
export const respondToAccessRequestResolver = new RespondToAccessRequestResolver(respondToAccessRequestUseCase);
export const getAccessRequestsResolver = new GetAccessRequestsResolver(getAccessRequestsUseCase);
