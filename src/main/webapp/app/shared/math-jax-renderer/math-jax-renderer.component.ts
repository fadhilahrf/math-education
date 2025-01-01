import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MathJaxService } from 'app/service/math-jax.service';

@Component({
  selector: 'math-jax-renderer',
  standalone: true,
  imports: [],
  templateUrl: './math-jax-renderer.component.html',
  styleUrl: './math-jax-renderer.component.scss'
})
export class MathJaxRendererComponent implements OnInit {
  @ViewChild('mathContent') paragraphElement: any;
  @Input({ required: true }) mathString!: string;

  constructor(private mathJaxService: MathJaxService, private elRef: ElementRef) {}

  ngOnInit() {
    this.mathJaxService.getMathJaxLoadedPromise().then(() => {
      console.log('MathJax loaded, rendering math');

      this.paragraphElement.nativeElement.innerHTML = this.mathString;

      this.mathJaxService.render();
    });
  }
}
