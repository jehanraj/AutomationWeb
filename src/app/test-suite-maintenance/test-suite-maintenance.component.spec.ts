import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuiteMaintenanceComponent } from './test-suite-maintenance.component';

describe('TestSuiteMaintenanceComponent', () => {
  let component: TestSuiteMaintenanceComponent;
  let fixture: ComponentFixture<TestSuiteMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSuiteMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSuiteMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
