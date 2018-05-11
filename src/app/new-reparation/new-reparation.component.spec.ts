import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReparationComponent } from './new-reparation.component';

describe('NewReparationComponent', () => {
  let component: NewReparationComponent;
  let fixture: ComponentFixture<NewReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
