import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ILesson } from 'app/entities/lesson/lesson.model';
import { ItemCountComponent } from 'app/shared/pagination';
import SharedModule from 'app/shared/shared.module';
import { PublicLessonService } from '../public-lesson.service';

@Component({
  selector: 'public-lesson-list',
  standalone: true,
  imports: [
    SharedModule,
    ItemCountComponent],
  templateUrl: './public-lesson-list.component.html',
  styleUrl: './public-lesson-list.component.scss'
})
export class PublicLessonListComponent implements OnInit {

  lessons: ILesson[] = [];
  itemsPerPage = 5;
  page = 1;
  totalItems = 0;
  sortString = 'level,asc';

  constructor(
    protected lessonService: PublicLessonService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const pageToLoad: number = this.page ?? 1;
    const queryObject: any = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: [this.sortString],
      eagerload: false
    };

    this.lessonService.query(queryObject).subscribe(res=> {
      if (res.headers) {
        this.totalItems =  Number(res.headers.get(TOTAL_COUNT_RESPONSE_HEADER));
      }
      
      if (res.body) {
        this.lessons = res.body;
      }
    });
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page);
  }

  navigateToDetails(slug: string): void {
    this.router.navigate([`/p/lesson/${slug}`])
  }

  protected handleNavigation(page = this.page): void {
    const queryParamsObj = {
      page,
      size: this.itemsPerPage,
      sort: [this.sortString],
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }
}
