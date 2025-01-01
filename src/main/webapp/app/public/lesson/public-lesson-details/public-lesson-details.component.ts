import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PublicLessonService } from '../public-lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ILesson } from 'app/entities/lesson/lesson.model';
import SharedModule from 'app/shared/shared.module';
import { IMaterial } from 'app/entities/material/material.model';
import { PublicMaterialService } from 'app/public/material/public-material.service';
import { MathJaxService } from 'app/service/math-jax.service';

@Component({
  selector: 'public-lesson-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './public-lesson-details.component.html',
  styleUrl: './public-lesson-details.component.scss'
})
export class PublicLessonDetailsComponent implements OnInit {
  @ViewChild('mathContent') mathContent: any;

  lesson: ILesson | null = null;
  materialSlug: string = '';
  currentMaterial: IMaterial | null = null;

  constructor(
    protected lessonService: PublicLessonService,
    protected materialService: PublicMaterialService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected mathJaxService: MathJaxService, 
    protected elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lesson }) => {
      if (lesson) {
        this.lesson=lesson;
      } else {
        this.router.navigate(['404'])
      }
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['material']) {
        this.materialSlug=params['material'];
        this.getMaterial();
      }
    });
  }

  getMaterial(): void {
    this.materialService.findBySlug(this.materialSlug).subscribe(res=>{
      if (res.body) {
        this.currentMaterial=res.body;
        this.render();
      }
    })
  }

  setMaterialSlug(slug: string): void {
    this.router.navigate([], {
      queryParams: { material: slug },
      queryParamsHandling: 'merge'
    });
  }

  render() {
    this.mathJaxService.getMathJaxLoadedPromise().then(() => {

      this.mathContent.nativeElement.innerHTML = this.currentMaterial!.content;

      this.mathJaxService.render();
    });
  }
}
