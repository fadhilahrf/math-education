import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLessonListComponent } from './public-lesson-list.component';

describe('PublicLessonListComponent', () => {
  let component: PublicLessonListComponent;
  let fixture: ComponentFixture<PublicLessonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLessonListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicLessonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
