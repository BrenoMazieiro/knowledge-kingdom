import type { ContentEntity, ContentEntityUpdate } from './repository/types';

export type ContentDTO = {
  id: string;
  version: number;
  houseId: string;
  creatorId: string;
  title: string;
  type: string;
  url: string | null;
  body: string | null;
  description: string | null;
  sortOrder: number;
  createdAt: Date;
};

export interface IGetContentUseCase {
  execute: (id: string) => Promise<ContentEntity>;
}

export interface IGetContentsUseCase {
  execute: (houseId: string) => Promise<ContentEntity[]>;
}

export interface IUpdateContentUseCase {
  execute: (id: string, version: number, data: ContentEntityUpdate) => Promise<ContentEntity>;
}

export interface IDeleteContentUseCase {
  execute: (id: string, version: number) => Promise<void>;
}
