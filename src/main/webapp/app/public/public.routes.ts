import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lesson',
    loadChildren: () => import('./lesson/lesson.routes'),
  },
];

export default routes;