import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILesson } from 'app/entities/lesson/lesson.model';
import { LessonService } from 'app/entities/lesson/service/lesson.service';
import { IMaterial, NewMaterial } from '../material.model';
import { MaterialService } from '../service/material.service';
import { MaterialFormGroup, MaterialFormService } from './material-form.service';
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
  material: IMaterial | NewMaterial | null = null;

  lessonsSharedCollection: ILesson[] = [];
  materialsSharedCollection: IMaterial[] = [];

  mode = ''

  modeType = {
    default: '',
    latexEditor: 'latex-editor',
    preview: 'preview'
  }

  slugExists: boolean | null = null;

  protected materialService = inject(MaterialService);
  protected materialFormService = inject(MaterialFormService);
  protected lessonService = inject(LessonService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: MaterialFormGroup = this.materialFormService.createMaterialFormGroup();

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
    this.convertFormToMaterial();
  }

  convertFormToMaterial(): void {
    this.material = this.materialFormService.getMaterial(this.editForm);
  }

  switchMode(mode: string) : void {
    this.router.navigate([], {
      queryParams: { mode },
      queryParamsHandling: 'merge'
    });
  }

  generateSlug(): void {
    if (this.editForm.get('title')?.valid) {
      this.materialService.generateSlug(this.editForm.get('title')?.value!).subscribe(res=>{
        if (res.body) {
          this.editForm.patchValue({ slug: res.body });
        }
      })
    }
  }

  checkSlugExistence(): void {
    if (this.editForm.get('slug')?.valid) {
      this.materialService.slugExists(this.editForm.get('slug')?.value!).subscribe(res=>{
        if (res.body!=null) {
          this.slugExists = res.body;
          console.log(this.editForm.get('slug')?.value! + ' : ' + this.slugExists)
        }
      })
    }
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
    this.materialsSharedCollection = this.materialService.addMaterialToCollectionIfMissing<IMaterial>(
      this.materialsSharedCollection,
      material.parent,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.lessonService
      .query()
      .pipe(map((res: HttpResponse<ILesson[]>) => res.body ?? []))
      .pipe(map((lessons: ILesson[]) => this.lessonService.addLessonToCollectionIfMissing<ILesson>(lessons, this.material?.lesson)))
      .subscribe((lessons: ILesson[]) => (this.lessonsSharedCollection = lessons));

    this.materialService
      .query()
      .pipe(map((res: HttpResponse<IMaterial[]>) => res.body ?? []))
      .pipe(
        map((materials: IMaterial[]) => this.materialService.addMaterialToCollectionIfMissing<IMaterial>(materials, this.material?.parent)),
      )
      .subscribe((materials: IMaterial[]) => (this.materialsSharedCollection = materials.filter(material=>material.id!=this.material?.id)));
  }
}
