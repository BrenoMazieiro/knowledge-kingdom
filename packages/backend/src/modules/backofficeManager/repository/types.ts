export type BMSessionEntity = {
  bmId: string;
  permissionLevel: string;
};

export interface IBMSessionRepository {
  create: (data: BMSessionEntity) => Promise<string>;
  findById: (sessionId: string) => Promise<BMSessionEntity | null>;
  refresh: (sessionId: string) => Promise<void>;
  destroy: (sessionId: string) => Promise<void>;
  destroyByBMId: (bmId: string) => Promise<void>;
}

export type BMEntity = {
  id: string;
  version: number;
  email: string;
  name: string;
  passwordHash: string;
  permissionLevel: string;
  twoFactorEnabled: boolean;
  twoFactorSecret: string | null;
  invitedById: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type BMEntityCreate = {
  email: string;
  name: string;
  passwordHash: string;
  permissionLevel: string;
  invitedById?: string | null;
};

export type BMEntityUpdate = {
  name?: string;
  passwordHash?: string;
  permissionLevel?: string;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string | null;
};

export interface IBMRepository {
  findOneById: (id: string) => Promise<BMEntity>;
  findOneByEmail: (email: string) => Promise<BMEntity>;
  findAll: () => Promise<BMEntity[]>;
  create: (data: BMEntityCreate) => Promise<BMEntity>;
  update: (id: string, version: number, data: BMEntityUpdate) => Promise<BMEntity>;
}
