import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminleaveComponent } from './adminleave.component';

describe('AdminleaveComponent', () => {
  let component: AdminleaveComponent;
  let fixture: ComponentFixture<AdminleaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminleaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
