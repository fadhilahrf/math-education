import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLessonDetailsComponent } from './public-lesson-details.component';

describe('PublicLessonDetailsComponent', () => {
  let component: PublicLessonDetailsComponent;
  let fixture: ComponentFixture<PublicLessonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLessonDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicLessonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
