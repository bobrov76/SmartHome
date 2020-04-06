import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuterComponent } from './futer.component';

describe('FuterComponent', () => {
  let component: FuterComponent;
  let fixture: ComponentFixture<FuterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
