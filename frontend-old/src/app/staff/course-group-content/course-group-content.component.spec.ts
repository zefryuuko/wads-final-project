import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGroupContentComponent } from './course-group-content.component';

describe('CourseGroupContentComponent', () => {
  let component: CourseGroupContentComponent;
  let fixture: ComponentFixture<CourseGroupContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseGroupContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGroupContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
