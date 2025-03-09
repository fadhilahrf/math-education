import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MathJaxService } from 'app/service/math-jax.service';
import { Editor } from 'ngx-editor';
import SharedModule from '../shared.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import * as beautify from 'js-beautify';
import { ToastService } from '../toast/toast.service';
import { ToastsContainerComponent } from "../toast/toast-container.component";

@Component({
  selector: 'latex-editor',
  standalone: true,
  imports: [SharedModule, TextFieldModule, ToastsContainerComponent],
  templateUrl: './latex-editor.component.html',
  styleUrl: './latex-editor.component.scss'
})
export class LatexEditorComponent implements OnDestroy {
  @Input() content: string | null | undefined= '';
  @Output() contentEmitter = new EventEmitter<any>();
  @ViewChild('mathContent') mathContentElement: any;

  editor: Editor;
  isEditorMode = true;
  isPreviewMode = false;

  constructor(
    protected mathJaxService: MathJaxService, 
    protected toastService: ToastService,
    protected elRef: ElementRef
  ) {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onChange(e: string): void {
    this.content = e;
  }

  render() {
    this.mathJaxService.getMathJaxLoadedPromise().then(() => {
      this.mathContentElement.nativeElement.innerHTML = this.content;

      this.mathJaxService.renderMathInDiv(this.mathContentElement.nativeElement);
    });
  }

  save(): void {
    this.contentEmitter.emit(this.content);
    this.toastService.show('Saved', 'Temporary saving is successfull.', 2000, 'text-dark' ,'bg-success text-light');
  }

  previousState(): void {
    window.history.back();
  }

  editorModeToggle(isEditorMode: boolean): void {
    this.isEditorMode = isEditorMode;
    if (!this.isEditorMode) {
      this.content = beautify.html(this.content!, {
        indent_size: 1,
        space_in_empty_paren: false
      });
    }
  }
}
