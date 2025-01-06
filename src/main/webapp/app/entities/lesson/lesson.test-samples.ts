import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 5184,
  title: 'definite',
  slug: 'developmental triumphantly',
};

export const sampleWithPartialData: ILesson = {
  id: 7044,
  title: 'discrete',
  slug: 'small phooey',
  level: 11224,
};

export const sampleWithFullData: ILesson = {
  id: 29198,
  title: 'circa stealthily',
  slug: 'engage any',
  description: 'closely uh-huh wherever',
  level: 13625,
};

export const sampleWithNewData: NewLesson = {
  title: 'fold even',
  slug: 'provided',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
