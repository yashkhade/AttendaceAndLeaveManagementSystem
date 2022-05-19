import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeemanagerComponent } from './employeemanager.component';

describe('EmployeemanagerComponent', () => {
  let component: EmployeemanagerComponent;
  let fixture: ComponentFixture<EmployeemanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeemanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
