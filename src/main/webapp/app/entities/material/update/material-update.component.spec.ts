import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ILesson } from 'app/entities/lesson/lesson.model';
import { LessonService } from 'app/entities/lesson/service/lesson.service';
import { MaterialService } from '../service/material.service';
import { IMaterial } from '../material.model';
import { MaterialFormService } from './material-form.service';

import { MaterialUpdateComponent } from './material-update.component';

describe('Material Management Update Component', () => {
  let comp: MaterialUpdateComponent;
  let fixture: ComponentFixture<MaterialUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let materialFormService: MaterialFormService;
  let materialService: MaterialService;
  let lessonService: LessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), MaterialUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(MaterialUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MaterialUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    materialFormService = TestBed.inject(MaterialFormService);
    materialService = TestBed.inject(MaterialService);
    lessonService = TestBed.inject(LessonService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Lesson query and add missing value', () => {
      const material: IMaterial = { id: 456 };
      const lesson: ILesson = { id: 17081 };
      material.lesson = lesson;

      const lessonCollection: ILesson[] = [{ id: 32703 }];
      jest.spyOn(lessonService, 'query').mockReturnValue(of(new HttpResponse({ body: lessonCollection })));
      const additionalLessons = [lesson];
      const expectedCollection: ILesson[] = [...additionalLessons, ...lessonCollection];
      jest.spyOn(lessonService, 'addLessonToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ material });
      comp.ngOnInit();

      expect(lessonService.query).toHaveBeenCalled();
      expect(lessonService.addLessonToCollectionIfMissing).toHaveBeenCalledWith(
        lessonCollection,
        ...additionalLessons.map(expect.objectContaining),
      );
      expect(comp.lessonsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Material query and add missing value', () => {
      const material: IMaterial = { id: 456 };
      const parent: IMaterial = { id: 15761 };
      material.parent = parent;

      const materialCollection: IMaterial[] = [{ id: 8633 }];
      jest.spyOn(materialService, 'query').mockReturnValue(of(new HttpResponse({ body: materialCollection })));
      const additionalMaterials = [parent];
      const expectedCollection: IMaterial[] = [...additionalMaterials, ...materialCollection];
      jest.spyOn(materialService, 'addMaterialToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ material });
      comp.ngOnInit();

      expect(materialService.query).toHaveBeenCalled();
      expect(materialService.addMaterialToCollectionIfMissing).toHaveBeenCalledWith(
        materialCollection,
        ...additionalMaterials.map(expect.objectContaining),
      );
      expect(comp.materialsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const material: IMaterial = { id: 456 };
      const lesson: ILesson = { id: 25528 };
      material.lesson = lesson;
      const parent: IMaterial = { id: 1479 };
      material.parent = parent;

      activatedRoute.data = of({ material });
      comp.ngOnInit();

      expect(comp.lessonsSharedCollection).toContain(lesson);
      expect(comp.materialsSharedCollection).toContain(parent);
      expect(comp.material).toEqual(material);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaterial>>();
      const material = { id: 123 };
      jest.spyOn(materialFormService, 'getMaterial').mockReturnValue(material);
      jest.spyOn(materialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ material });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: material }));
      saveSubject.complete();

      // THEN
      expect(materialFormService.getMaterial).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(materialService.update).toHaveBeenCalledWith(expect.objectContaining(material));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaterial>>();
      const material = { id: 123 };
      jest.spyOn(materialFormService, 'getMaterial').mockReturnValue({ id: null });
      jest.spyOn(materialService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ material: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: material }));
      saveSubject.complete();

      // THEN
      expect(materialFormService.getMaterial).toHaveBeenCalled();
      expect(materialService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaterial>>();
      const material = { id: 123 };
      jest.spyOn(materialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ material });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(materialService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareLesson', () => {
      it('Should forward to lessonService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(lessonService, 'compareLesson');
        comp.compareLesson(entity, entity2);
        expect(lessonService.compareLesson).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareMaterial', () => {
      it('Should forward to materialService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(materialService, 'compareMaterial');
        comp.compareMaterial(entity, entity2);
        expect(materialService.compareMaterial).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
