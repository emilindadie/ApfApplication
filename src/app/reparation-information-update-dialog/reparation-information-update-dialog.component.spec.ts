import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationInformationUpdateDialogComponent } from './reparation-information-update-dialog.component';

describe('ReparationInformationUpdateDialogComponent', () => {
  let component: ReparationInformationUpdateDialogComponent;
  let fixture: ComponentFixture<ReparationInformationUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparationInformationUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationInformationUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
