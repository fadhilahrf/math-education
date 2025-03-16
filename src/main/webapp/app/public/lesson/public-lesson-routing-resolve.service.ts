import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PublicLessonService } from './public-lesson.service';
import { ILesson } from 'app/entities/lesson/lesson.model';


export const publicLessonResolve = (route: ActivatedRouteSnapshot): Observable<null | ILesson> => {
    const slug = route.params['slug'];
    if (slug) {
      return inject(PublicLessonService)
        .findBySlug(slug, true)
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

export default publicLessonResolve;