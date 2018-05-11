import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreseniusComponent } from './fresenius.component';

describe('FreseniusComponent', () => {
  let component: FreseniusComponent;
  let fixture: ComponentFixture<FreseniusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreseniusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreseniusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
