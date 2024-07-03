import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglasNegocioCompetitividadComponent } from './reglas-negocio-competitividad.component';

describe('ReglasNegocioCompetitividadComponent', () => {
  let component: ReglasNegocioCompetitividadComponent;
  let fixture: ComponentFixture<ReglasNegocioCompetitividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReglasNegocioCompetitividadComponent]
    });
    fixture = TestBed.createComponent(ReglasNegocioCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
