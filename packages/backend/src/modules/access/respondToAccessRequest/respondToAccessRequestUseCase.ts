import { AccessRequestStatus } from '@kk/shared/constants/enums';
import type { IAccessRequestRepository, AccessRequestEntity } from '../repository/types';
import type { IRespondToAccessRequestUseCase } from '../types';

export class RespondToAccessRequestUseCase implements IRespondToAccessRequestUseCase {
  constructor(private readonly accessRequestRepository: IAccessRequestRepository) {}

  execute = async (responderId: string, requestId: string, approved: boolean, reason?: string): Promise<AccessRequestEntity> => {
    const status = approved ? AccessRequestStatus.APPROVED : AccessRequestStatus.DENIED;
    return this.accessRequestRepository.respond(requestId, status, responderId, reason);
  };
}
