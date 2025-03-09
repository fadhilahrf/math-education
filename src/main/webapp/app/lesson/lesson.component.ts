import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MathJaxService } from 'app/service/math-jax.service';
import SharedModule from 'app/shared/shared.module';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'lesson',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent implements OnInit, OnDestroy {
  @ViewChild('mathContent') paragraphElement: any;
  editor: Editor;
  html = '';

  constructor(private mathJaxService: MathJaxService, private elRef: ElementRef) {
    this.editor = new Editor();
  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onChange(e: string): void {
    this.html=e;
  }

  render() {
    this.mathJaxService.getMathJaxLoadedPromise().then(() => {
      this.paragraphElement.nativeElement.innerHTML = this.html;

      this.mathJaxService.renderMathInDiv(this.paragraphElement.nativeElement);
    });
  }
}
