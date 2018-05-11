import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationUpdateDialogComponent } from './reparation-update-dialog.component';

describe('ReparationUpdateDialogComponent', () => {
  let component: ReparationUpdateDialogComponent;
  let fixture: ComponentFixture<ReparationUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparationUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
