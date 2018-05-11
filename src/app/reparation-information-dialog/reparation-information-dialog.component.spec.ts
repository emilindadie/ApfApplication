import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationInformationDialogComponent } from './reparation-information-dialog.component';

describe('ReparationInformationDialogComponent', () => {
  let component: ReparationInformationDialogComponent;
  let fixture: ComponentFixture<ReparationInformationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparationInformationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
