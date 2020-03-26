import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdataFromdbMaintenanceComponent } from './testdata-fromdb-maintenance.component';

describe('TestdataFromdbMaintenanceComponent', () => {
  let component: TestdataFromdbMaintenanceComponent;
  let fixture: ComponentFixture<TestdataFromdbMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestdataFromdbMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdataFromdbMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
