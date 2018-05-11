import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationDetailsComponent } from './reparation-details.component';

describe('FreseniusDetailsComponent', () => {
  let component: ReparationDetailsComponent;
  let fixture: ComponentFixture<ReparationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
