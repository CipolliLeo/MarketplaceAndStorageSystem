import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEletronicComponent } from './add-edit-eletronic.component';

describe('AddEditEletronicComponent', () => {
  let component: AddEditEletronicComponent;
  let fixture: ComponentFixture<AddEditEletronicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditEletronicComponent]
    });
    fixture = TestBed.createComponent(AddEditEletronicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
