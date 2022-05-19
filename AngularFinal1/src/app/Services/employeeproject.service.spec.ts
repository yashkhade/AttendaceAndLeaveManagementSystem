import { TestBed } from '@angular/core/testing';

import { EmployeeprojectService } from './employeeproject.service';

describe('EmployeeprojectService', () => {
  let service: EmployeeprojectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeprojectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
