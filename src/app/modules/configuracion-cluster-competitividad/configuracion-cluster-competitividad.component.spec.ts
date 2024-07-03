import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionClusterCompetitividadComponent } from './configuracion-cluster-competitividad.component';

describe('ConfiguracionClusterCompetitividadComponent', () => {
  let component: ConfiguracionClusterCompetitividadComponent;
  let fixture: ComponentFixture<ConfiguracionClusterCompetitividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionClusterCompetitividadComponent]
    });
    fixture = TestBed.createComponent(ConfiguracionClusterCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
