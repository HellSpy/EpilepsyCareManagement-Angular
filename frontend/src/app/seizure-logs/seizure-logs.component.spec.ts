import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeizureLogsComponent } from './seizure-logs.component';

describe('SeizureLogsComponent', () => {
  let component: SeizureLogsComponent;
  let fixture: ComponentFixture<SeizureLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeizureLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeizureLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
