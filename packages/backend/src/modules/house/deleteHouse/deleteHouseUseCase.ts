import type { IHouseRepository } from '../repository/types';

export interface IDeleteHouseUseCase {
  execute: (id: string, version: number) => Promise<void>;
}

export class DeleteHouseUseCase implements IDeleteHouseUseCase {
  constructor(private readonly houseRepository: IHouseRepository) {}

  execute = async (id: string, version: number): Promise<void> => {
    await this.houseRepository.softDelete(id, version);
  };
}
