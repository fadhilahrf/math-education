import { ILesson } from 'app/entities/lesson/lesson.model';

export interface IMaterial {
  id: number;
  title?: string | null;
  description?: string | null;
  content?: string | null;
  slug?: string | null;
  orderIndex?: number | null;
  lesson?: Pick<ILesson, 'id' | 'title'> | null;
  parent?: Pick<IMaterial, 'id' | 'title'> | null;
  children?: Pick<IMaterial, 'id' | 'title' | 'slug' | 'orderIndex'>[] | null;
}

export type NewMaterial = Omit<IMaterial, 'id'> & { id: null };
