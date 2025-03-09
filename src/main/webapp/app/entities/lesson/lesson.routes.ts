import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LessonComponent } from './list/lesson.component';
import { LessonDetailComponent } from './detail/lesson-detail.component';
import { LessonUpdateComponent } from './update/lesson-update.component';
import { duplicateLessonResolve, lessonResolve } from './route/lesson-routing-resolve.service';

const lessonRoute: Routes = [
  {
    path: '',
    component: LessonComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LessonDetailComponent,
    resolve: {
      lesson: lessonResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LessonUpdateComponent,
    resolve: {
      lesson: lessonResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LessonUpdateComponent,
    resolve: {
      lesson: lessonResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':sourceId/duplicate',
    component: LessonUpdateComponent,
    resolve: {
      lesson: duplicateLessonResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default lessonRoute;
