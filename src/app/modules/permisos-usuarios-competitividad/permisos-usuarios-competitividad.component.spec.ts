import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosUsuariosCompetitividadComponent } from './permisos-usuarios-competitividad.component';

describe('PermisosUsuariosCompetitividadComponent', () => {
  let component: PermisosUsuariosCompetitividadComponent;
  let fixture: ComponentFixture<PermisosUsuariosCompetitividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermisosUsuariosCompetitividadComponent]
    });
    fixture = TestBed.createComponent(PermisosUsuariosCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
