import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestedReportsComponent } from './tested-reports.component';

describe('TestedReportsComponent', () => {
  let component: TestedReportsComponent;
  let fixture: ComponentFixture<TestedReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestedReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
