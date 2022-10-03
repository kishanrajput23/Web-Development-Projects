import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level1FormComponent } from './level1-form.component';

describe('Level1FormComponent', () => {
  let component: Level1FormComponent;
  let fixture: ComponentFixture<Level1FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Level1FormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Level1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
