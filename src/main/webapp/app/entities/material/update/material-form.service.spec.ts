import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../material.test-samples';

import { MaterialFormService } from './material-form.service';

describe('Material Form Service', () => {
  let service: MaterialFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialFormService);
  });

  describe('Service methods', () => {
    describe('createMaterialFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMaterialFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            content: expect.any(Object),
            slug: expect.any(Object),
            orderIndex: expect.any(Object),
            lesson: expect.any(Object),
            parent: expect.any(Object),
          }),
        );
      });

      it('passing IMaterial should create a new form with FormGroup', () => {
        const formGroup = service.createMaterialFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            content: expect.any(Object),
            slug: expect.any(Object),
            orderIndex: expect.any(Object),
            lesson: expect.any(Object),
            parent: expect.any(Object),
          }),
        );
      });
    });

    describe('getMaterial', () => {
      it('should return NewMaterial for default Material initial value', () => {
        const formGroup = service.createMaterialFormGroup(sampleWithNewData);

        const material = service.getMaterial(formGroup) as any;

        expect(material).toMatchObject(sampleWithNewData);
      });

      it('should return NewMaterial for empty Material initial value', () => {
        const formGroup = service.createMaterialFormGroup();

        const material = service.getMaterial(formGroup) as any;

        expect(material).toMatchObject({});
      });

      it('should return IMaterial', () => {
        const formGroup = service.createMaterialFormGroup(sampleWithRequiredData);

        const material = service.getMaterial(formGroup) as any;

        expect(material).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMaterial should not enable id FormControl', () => {
        const formGroup = service.createMaterialFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMaterial should disable id FormControl', () => {
        const formGroup = service.createMaterialFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
