import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteListComponent } from './favorite-list.component';

describe('FavoriteListComponent', () => {
  let component: FavoriteListComponent;
  let fixture: ComponentFixture<FavoriteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteListComponent]
    });
    fixture = TestBed.createComponent(FavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
