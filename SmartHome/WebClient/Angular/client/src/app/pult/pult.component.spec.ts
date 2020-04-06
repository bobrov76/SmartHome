import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PultComponent } from './pult.component';

describe('PultComponent', () => {
  let component: PultComponent;
  let fixture: ComponentFixture<PultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
