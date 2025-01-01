import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILesson } from 'app/entities/lesson/lesson.model';
import { LessonService } from 'app/entities/lesson/service/lesson.service';
import { IMaterial } from '../material.model';
import { MaterialService } from '../service/material.service';
import { MaterialFormService, MaterialFormGroup } from './material-form.service';
import { LatexEditorComponent } from 'app/shared/latex-editor/latex-editor.component';
import { MaterialPreviewComponent } from '../preview/material-preview.component';

@Component({
  standalone: true,
  selector: 'jhi-material-update',
  templateUrl: './material-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule, LatexEditorComponent, MaterialPreviewComponent],
})
export class MaterialUpdateComponent implements OnInit {
  isSaving = false;
  material: IMaterial | null = null;

  lessonsSharedCollection: ILesson[] = [];
  materialsSharedCollection: IMaterial[] = [];

  editForm: MaterialFormGroup = this.materialFormService.createMaterialFormGroup();

  mode = ''

  modeType = {
    default: '',
    latexEditor: 'latex-editor',
    preview: 'preview'
  }

  constructor(
    protected materialService: MaterialService,
    protected materialFormService: MaterialFormService,
    protected lessonService: LessonService,
    protected activatedRoute: ActivatedRoute,
     protected router: Router
  ) {}

  compareLesson = (o1: ILesson | null, o2: ILesson | null): boolean => this.lessonService.compareLesson(o1, o2);

  compareMaterial = (o1: IMaterial | null, o2: IMaterial | null): boolean => this.materialService.compareMaterial(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ material }) => {
      this.material = material;
      if (material) {
        this.updateForm(material);
      }

      this.loadRelationshipsOptions();
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['mode']) {
        this.mode=params['mode'];
      } else {
        this.mode=this.modeType.default;
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const material = this.materialFormService.getMaterial(this.editForm);
    if (material.id !== null) {
      this.subscribeToSaveResponse(this.materialService.update(material));
    } else {
      this.subscribeToSaveResponse(this.materialService.create(material));
    }
  }

  saveContent(content: string): void {
    this.editForm.patchValue({ content });
  }

  switchMode(mode: string) : void {
    this.router.navigate([], {
      queryParams: { mode },
      queryParamsHandling: 'merge'
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterial>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(material: IMaterial): void {
    this.material = material;
    this.materialFormService.resetForm(this.editForm, material);

    this.lessonsSharedCollection = this.lessonService.addLessonToCollectionIfMissing<ILesson>(
      this.lessonsSharedCollection,
      material.lesson,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.lessonService
      .query()
      .pipe(map((res: HttpResponse<ILesson[]>) => res.body ?? []))
      .pipe(map((lessons: ILesson[]) => this.lessonService.addLessonToCollectionIfMissing<ILesson>(lessons, this.material?.lesson)))
      .subscribe((lessons: ILesson[]) => (this.lessonsSharedCollection = lessons));
  }
}
