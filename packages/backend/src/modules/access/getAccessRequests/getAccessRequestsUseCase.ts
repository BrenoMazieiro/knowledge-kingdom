import type { IAccessRequestRepository, AccessRequestEntity } from '../repository/types';
import type { IGetAccessRequestsUseCase } from '../types';

export class GetAccessRequestsUseCase implements IGetAccessRequestsUseCase {
  constructor(private readonly accessRequestRepository: IAccessRequestRepository) {}

  execute = async (entityType: string, entityId: string): Promise<AccessRequestEntity[]> => {
    return this.accessRequestRepository.findByEntity(entityType, entityId);
  };
}
