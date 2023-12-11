import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EletronicComponent } from './eletronic.component';

describe('EletronicComponent', () => {
  let component: EletronicComponent;
  let fixture: ComponentFixture<EletronicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EletronicComponent]
    });
    fixture = TestBed.createComponent(EletronicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
