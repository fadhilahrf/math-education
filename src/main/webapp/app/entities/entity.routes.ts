import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lesson',
    data: { pageTitle: 'Lessons' },
    loadChildren: () => import('./lesson/lesson.routes'),
  },
  {
    path: 'material',
    data: { pageTitle: 'Materials' },
    loadChildren: () => import('./material/material.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
