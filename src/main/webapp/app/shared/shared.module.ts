import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { MathJaxRendererComponent } from './math-jax-renderer/math-jax-renderer.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Application wide Module
 */
@NgModule({
  imports: [AlertComponent, AlertErrorComponent, MathJaxRendererComponent],
  exports: [CommonModule, NgbModule, FontAwesomeModule, NgxEditorModule, FormsModule, RouterModule, NgbToastModule, AlertComponent, AlertErrorComponent, MathJaxRendererComponent],
})
export default class SharedModule {}
