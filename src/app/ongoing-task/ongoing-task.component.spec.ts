import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingTaskComponent } from './ongoing-task.component';

describe('OngoingTaskComponent', () => {
  let component: OngoingTaskComponent;
  let fixture: ComponentFixture<OngoingTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OngoingTaskComponent]
    });
    fixture = TestBed.createComponent(OngoingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
