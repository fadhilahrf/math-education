import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 1196,
  title: 'beech tog actuate',
  slug: 'registration beneath',
};

export const sampleWithPartialData: ILesson = {
  id: 28404,
  title: 'after',
  slug: 'pfft spectacular',
  description: 'boycott while',
  level: 32423,
};

export const sampleWithFullData: ILesson = {
  id: 3994,
  title: 'yippee reinvest unlike',
  slug: 'brr',
  description: 'unusual so',
  level: 1195,
};

export const sampleWithNewData: NewLesson = {
  title: 'twig ambiguity',
  slug: 'and',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
