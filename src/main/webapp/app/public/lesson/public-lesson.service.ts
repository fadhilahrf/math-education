import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILesson } from 'app/entities/lesson/lesson.model';


export type PartialUpdateLesson = Partial<ILesson> & Pick<ILesson, 'id'>;

export type EntityResponseType = HttpResponse<ILesson>;
export type EntityArrayResponseType = HttpResponse<ILesson[]>;

@Injectable({ providedIn: 'root' })
export class PublicLessonService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/public/lessons');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILesson>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findBySlug(slug: string, isForMaterialMenuView: boolean = false): Observable<EntityResponseType> {
    return this.http.get<ILesson>(`${this.resourceUrl}/by-slug/${slug}?isForMaterialMenuView=${isForMaterialMenuView}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILesson[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
