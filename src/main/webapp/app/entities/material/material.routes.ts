import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { MaterialComponent } from './list/material.component';
import { MaterialDetailComponent } from './detail/material-detail.component';
import { MaterialUpdateComponent } from './update/material-update.component';
import { materialResolve, duplicateMaterialResolve } from './route/material-routing-resolve.service';

const materialRoute: Routes = [
  {
    path: '',
    component: MaterialComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MaterialDetailComponent,
    resolve: {
      material: materialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MaterialUpdateComponent,
    resolve: {
      material: materialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MaterialUpdateComponent,
    resolve: {
      material: materialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':sourceId/duplicate',
    component: MaterialUpdateComponent,
    resolve: {
      material: duplicateMaterialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default materialRoute;
