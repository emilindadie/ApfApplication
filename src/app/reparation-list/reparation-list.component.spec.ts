import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationListComponent } from './reparation-list.component';

describe('ReparationListComponent', () => {
  let component: ReparationListComponent;
  let fixture: ComponentFixture<ReparationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
