import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPreciosCompetitividadComponent } from './gestion-precios-competitividad.component';

describe('GestionPreciosCompetitividadComponent', () => {
  let component: GestionPreciosCompetitividadComponent;
  let fixture: ComponentFixture<GestionPreciosCompetitividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPreciosCompetitividadComponent]
    });
    fixture = TestBed.createComponent(GestionPreciosCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
