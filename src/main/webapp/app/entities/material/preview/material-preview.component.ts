import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IMaterial, NewMaterial } from '../material.model';
import SharedModule from 'app/shared/shared.module';
import { MathJaxService } from 'app/service/math-jax.service';

@Component({
  selector: 'material-preview',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './material-preview.component.html',
  styleUrl: './material-preview.component.scss'
})
export class MaterialPreviewComponent implements OnInit {
  @Input() material: IMaterial | NewMaterial | null = null;
  @ViewChild('mathContent') mathContentElement: any;

  constructor(
    protected mathJaxService: MathJaxService, 
    protected elRef: ElementRef
  ) {}

  ngOnInit(): void {
      if (this.material) {
        this.render();
      }
  }

  render() {
    this.mathJaxService.getMathJaxLoadedPromise().then(() => {

      this.mathContentElement.nativeElement.innerHTML = this.material!.content;

      this.mathJaxService.renderMathInDiv(this.mathContentElement.nativeElement);
    });
  }

  previousState(): void {
    window.history.back();
  }
}
