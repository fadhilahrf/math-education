import { IMaterial, NewMaterial } from './material.model';

export const sampleWithRequiredData: IMaterial = {
  id: 28810,
  title: 'ew',
  content: 'part but',
  slug: 'pfft',
};

export const sampleWithPartialData: IMaterial = {
  id: 27555,
  title: 'jubilantly miserly minus',
  content: 'omelet far dual',
  slug: 'willfully',
  orderIndex: 31954,
};

export const sampleWithFullData: IMaterial = {
  id: 24846,
  title: 'ready whether',
  description: 'sequester before neat',
  content: 'boo unlike atrium',
  slug: 'commercial valentine',
  orderIndex: 20492,
};

export const sampleWithNewData: NewMaterial = {
  title: 'begonia which shore',
  content: 'internalize against dead',
  slug: 'gosh anxiously slowly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
