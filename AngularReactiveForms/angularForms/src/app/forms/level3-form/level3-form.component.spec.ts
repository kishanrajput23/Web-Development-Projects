import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level3FormComponent } from './level3-form.component';

describe('Level3FormComponent', () => {
  let component: Level3FormComponent;
  let fixture: ComponentFixture<Level3FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Level3FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Level3FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
