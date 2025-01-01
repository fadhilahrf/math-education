import { IMaterial } from 'app/entities/material/material.model';

export interface ILesson {
  id: number;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  level?: number | null;
  materials?: Pick<IMaterial, 'id' | 'title' | 'slug'>[] | null;
}

export type NewLesson = Omit<ILesson, 'id'> & { id: null };
