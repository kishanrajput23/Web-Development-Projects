import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2FormComponent } from './level2-form.component';

describe('Level2FormComponent', () => {
  let component: Level2FormComponent;
  let fixture: ComponentFixture<Level2FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Level2FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
