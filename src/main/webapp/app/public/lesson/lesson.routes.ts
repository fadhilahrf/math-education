import { Routes } from '@angular/router';
import { PublicLessonListComponent } from './public-lesson-list/public-lesson-list.component';
import { PublicLessonDetailsComponent } from './public-lesson-details/public-lesson-details.component';
import publicLessonResolve from './public-lesson-routing-resolve.service';

const lessonRoute: Routes = [
  {
    path: '',
    component: PublicLessonListComponent,
  },
  {
    path: ':slug',
    component: PublicLessonDetailsComponent,
    resolve: {
      lesson: publicLessonResolve,
    },
  },
];

export default lessonRoute;
