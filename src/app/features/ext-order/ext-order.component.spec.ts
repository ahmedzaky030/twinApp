import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtOrderComponent } from './ext-order.component';

describe('ExtOrderComponent', () => {
  let component: ExtOrderComponent;
  let fixture: ComponentFixture<ExtOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
