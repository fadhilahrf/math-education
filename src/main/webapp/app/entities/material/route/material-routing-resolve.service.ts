import { Inject, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMaterial, NewMaterial } from '../material.model';
import { MaterialService } from '../service/material.service';

export const materialResolve = (route: ActivatedRouteSnapshot): Observable<null | IMaterial> => {
  const id = route.params['id'];
  if (id) {
    return inject(MaterialService)
      .find(id)
      .pipe(
        mergeMap((material: HttpResponse<IMaterial>) => {
          if (material.body) {
            return of(material.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export const duplicateMaterialResolve = (route: ActivatedRouteSnapshot): Observable<null | NewMaterial> => {
  const sourceId = route.params['sourceId'];
  const materialService = inject(MaterialService);

  if (sourceId) {
    return materialService
      .find(sourceId)
      .pipe(
          mergeMap((material: HttpResponse<IMaterial>) => {
          if (material.body) {
            return materialService
              .generateSlug(material.body.title!)
              .pipe(
                mergeMap((slug: HttpResponse<string>) => {
                  const duplicatedMaterial: NewMaterial = {
                    ...material.body,
                    id: null,
                    slug: slug.body ?? material.body!.slug
                  }

                  return of(duplicatedMaterial);
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