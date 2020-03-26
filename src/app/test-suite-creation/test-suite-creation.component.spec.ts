import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuiteCreationComponent } from './test-suite-creation.component';

describe('TestSuiteCreationComponent', () => {
  let component: TestSuiteCreationComponent;
  let fixture: ComponentFixture<TestSuiteCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSuiteCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSuiteCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
