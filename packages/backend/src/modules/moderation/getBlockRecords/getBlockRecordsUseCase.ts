import type { IBlockRecordRepository, BlockRecordEntity } from '../repository/types';
import type { IGetBlockRecordsUseCase } from '../types';

export class GetBlockRecordsUseCase implements IGetBlockRecordsUseCase {
  constructor(private readonly blockRecordRepository: IBlockRecordRepository) {}

  execute = async (entityType: string, entityId: string): Promise<BlockRecordEntity[]> => {
    return this.blockRecordRepository.findByEntity(entityType, entityId);
  };
}
