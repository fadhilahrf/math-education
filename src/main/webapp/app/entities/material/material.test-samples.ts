import { IMaterial, NewMaterial } from './material.model';

export const sampleWithRequiredData: IMaterial = {
  id: 26769,
  title: 'furiously season incidentally',
  content: 'cameo until black',
  slug: 'pass',
};

export const sampleWithPartialData: IMaterial = {
  id: 511,
  title: 'vigilant finally',
  description: 'about clamp hence',
  content: 'whispered periodic ack',
  slug: 'meanwhile rigid',
};

export const sampleWithFullData: IMaterial = {
  id: 2403,
  title: 'gee erase',
  description: 'aw',
  content: 'officially',
  slug: 'whoever figure swell',
  orderIndex: 5712,
};

export const sampleWithNewData: NewMaterial = {
  title: 'fast',
  content: 'finally boohoo explanation',
  slug: 'circa',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
