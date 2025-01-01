import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathJaxRenderedComponent } from './math-jax-renderer.component';

describe('MathJaxRenderedComponent', () => {
  let component: MathJaxRenderedComponent;
  let fixture: ComponentFixture<MathJaxRenderedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathJaxRenderedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MathJaxRenderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
