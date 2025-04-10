import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILesson } from '../lesson.model';
import { LessonService } from '../service/lesson.service';
import { LessonFormService, LessonFormGroup } from './lesson-form.service';

@Component({
  standalone: true,
  selector: 'jhi-lesson-update',
  templateUrl: './lesson-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LessonUpdateComponent implements OnInit {
  isSaving = false;
  lesson: ILesson | null = null;

  editForm: LessonFormGroup = this.lessonFormService.createLessonFormGroup();

  slugExists: boolean | null = null;

  constructor(
    protected lessonService: LessonService,
    protected lessonFormService: LessonFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lesson }) => {
      this.lesson = lesson;
      if (lesson) {
        this.updateForm(lesson);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lesson = this.lessonFormService.getLesson(this.editForm);
    if (lesson.id !== null) {
      this.subscribeToSaveResponse(this.lessonService.update(lesson));
    } else {
      this.subscribeToSaveResponse(this.lessonService.create(lesson));
    }
  }

  generateSlug(): void {
    if (this.editForm.get('title')?.valid) {
      this.lessonService.generateSlug(this.editForm.get('title')?.value!).subscribe(res=>{
        if (res.body) {
          this.editForm.patchValue({ slug: res.body });
        }
      })
    }
  }

  checkSlugExistence(): void {
    if (this.editForm.get('slug')?.valid) {
      this.lessonService.slugExists(this.editForm.get('slug')?.value!).subscribe(res=>{
        if (res.body!=null) {
          this.slugExists = res.body;
          console.log(this.editForm.get('slug')?.value! + ' : ' + this.slugExists)
        }
      })
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILesson>>): void {
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

  protected updateForm(lesson: ILesson): void {
    this.lesson = lesson;
    this.lessonFormService.resetForm(this.editForm, lesson);
  }
}
