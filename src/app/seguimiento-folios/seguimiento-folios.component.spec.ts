import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoFoliosComponent } from './seguimiento-folios.component';

describe('SeguimientoFoliosComponent', () => {
  let component: SeguimientoFoliosComponent;
  let fixture: ComponentFixture<SeguimientoFoliosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguimientoFoliosComponent]
    });
    fixture = TestBed.createComponent(SeguimientoFoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
