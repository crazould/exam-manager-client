import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestActivityComponent } from './test-activity.component';

describe('TestActivityComponent', () => {
  let component: TestActivityComponent;
  let fixture: ComponentFixture<TestActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
