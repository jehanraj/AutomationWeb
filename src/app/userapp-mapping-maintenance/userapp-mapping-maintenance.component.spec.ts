import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserappMappingMaintenanceComponent } from './userapp-mapping-maintenance.component';

describe('UserappMappingMaintenanceComponent', () => {
  let component: UserappMappingMaintenanceComponent;
  let fixture: ComponentFixture<UserappMappingMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserappMappingMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserappMappingMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
