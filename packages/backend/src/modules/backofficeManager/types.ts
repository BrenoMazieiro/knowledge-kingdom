import type { BMEntity } from './repository/types';

export type BMDTO = {
  id: string;
  email: string;
  name: string;
  permissionLevel: string;
  twoFactorEnabled: boolean;
  createdAt: Date;
};

export type BMAuthPayloadDTO = {
  manager: BMDTO;
};

export interface IBMSignInUseCase {
  execute: (email: string, password: string) => Promise<{ bmId: string; sessionId: string; permissionLevel: string }>;
}

export interface IBMSignOutUseCase {
  execute: (sessionId: string) => Promise<void>;
}

export interface IInviteBMUseCase {
  execute: (inviterId: string, email: string, name: string, permissionLevel: string) => Promise<BMEntity>;
}

export interface IGetBMsUseCase {
  execute: () => Promise<BMEntity[]>;
}

export interface IGetBMProfileUseCase {
  execute: (bmId: string) => Promise<BMEntity>;
}
