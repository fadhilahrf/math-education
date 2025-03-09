import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILesson, NewLesson } from '../lesson.model';
import { LessonService } from '../service/lesson.service';

export const lessonResolve = (route: ActivatedRouteSnapshot): Observable<null | ILesson> => {
  const id = route.params['id'];
  if (id) {
    return inject(LessonService)
      .find(id)
      .pipe(
        mergeMap((lesson: HttpResponse<ILesson>) => {
          if (lesson.body) {
            return of(lesson.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export const duplicateLessonResolve = (route: ActivatedRouteSnapshot): Observable<null | NewLesson> => {
  const sourceId = route.params['sourceId'];
  const lessonService = inject(LessonService);

  if (sourceId) {
    return lessonService
      .find(sourceId)
      .pipe(
        mergeMap((lesson: HttpResponse<ILesson>) => {
          if (lesson.body) {
            return lessonService
              .generateSlug(lesson.body.title!)
              .pipe(
                mergeMap((slug: HttpResponse<string>) => {
                  const duplicatedLesson: NewLesson = {
                    ...lesson.body,
                    id: null,
                    slug: slug.body ?? lesson.body!.slug
                  }

                  return of(duplicatedLesson);
                })
              );
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};