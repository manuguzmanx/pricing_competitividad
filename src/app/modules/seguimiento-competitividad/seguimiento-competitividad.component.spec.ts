import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoCompetitividadComponent } from './seguimiento-competitividad.component';

describe('SeguimientoCompetitividadComponent', () => {
  let component: SeguimientoCompetitividadComponent;
  let fixture: ComponentFixture<SeguimientoCompetitividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguimientoCompetitividadComponent]
    });
    fixture = TestBed.createComponent(SeguimientoCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
