import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IMaterial } from '../material.model';

@Component({
  standalone: true,
  selector: 'jhi-material-detail',
  templateUrl: './material-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class MaterialDetailComponent {
  @Input() material: IMaterial | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
