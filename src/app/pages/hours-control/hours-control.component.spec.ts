import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursControlComponent } from './hours-control.component';

describe('HoursControlComponent', () => {
  let component: HoursControlComponent;
  let fixture: ComponentFixture<HoursControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
