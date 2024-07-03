import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosGestionPreciosCompetitividadComponent } from './filtros-gestion-precios-competitividad.component';

describe('FiltrosGestionPreciosCompetitividadComponent', () => {
  let component: FiltrosGestionPreciosCompetitividadComponent;
  let fixture: ComponentFixture<FiltrosGestionPreciosCompetitividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltrosGestionPreciosCompetitividadComponent]
    });
    fixture = TestBed.createComponent(FiltrosGestionPreciosCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
