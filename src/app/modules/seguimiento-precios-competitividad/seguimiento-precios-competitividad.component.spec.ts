import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoPreciosCompetitividadComponent } from './seguimiento-precios-competitividad.component';

describe('SeguimientoPreciosCompetitividadComponent', () => {
  let component: SeguimientoPreciosCompetitividadComponent;
  let fixture: ComponentFixture<SeguimientoPreciosCompetitividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguimientoPreciosCompetitividadComponent]
    });
    fixture = TestBed.createComponent(SeguimientoPreciosCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
