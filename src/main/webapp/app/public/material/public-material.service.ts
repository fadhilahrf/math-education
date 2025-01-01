import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMaterial } from 'app/entities/material/material.model';

export type PartialUpdateMaterial = Partial<IMaterial> & Pick<IMaterial, 'id'>;

export type EntityResponseType = HttpResponse<IMaterial>;
export type EntityArrayResponseType = HttpResponse<IMaterial[]>;

@Injectable({ providedIn: 'root' })
export class PublicMaterialService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/public/materials');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMaterial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findBySlug(slug: string): Observable<EntityResponseType> {
    return this.http.get<IMaterial>(`${this.resourceUrl}/by-slug/${slug}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMaterial[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
