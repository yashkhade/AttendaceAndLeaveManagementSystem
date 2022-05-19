import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerattendanceComponent } from './managerattendance.component';

describe('ManagerattendanceComponent', () => {
  let component: ManagerattendanceComponent;
  let fixture: ComponentFixture<ManagerattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerattendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
