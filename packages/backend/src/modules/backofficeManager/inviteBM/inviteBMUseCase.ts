import { hashPassword } from '../../auth/password';
import { randomUUID } from 'node:crypto';
import type { IBMRepository, BMEntity } from '../repository/types';
import type { IInviteBMUseCase } from '../types';

export class InviteBMUseCase implements IInviteBMUseCase {
  constructor(private readonly bmRepository: IBMRepository) {}

  execute = async (
    inviterId: string,
    email: string,
    name: string,
    permissionLevel: string,
  ): Promise<BMEntity> => {
    const temporaryPassword = randomUUID().slice(0, 16);
    const passwordHash = await hashPassword(temporaryPassword);

    return this.bmRepository.create({
      email,
      name,
      passwordHash,
      permissionLevel,
      invitedById: inviterId,
    });
  };
}
