import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseMaintenanceComponent } from './testcase-maintenance.component';

describe('TestcaseMaintenanceComponent', () => {
  let component: TestcaseMaintenanceComponent;
  let fixture: ComponentFixture<TestcaseMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaseMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
