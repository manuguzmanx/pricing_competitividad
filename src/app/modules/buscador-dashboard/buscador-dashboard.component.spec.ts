import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorDashboardComponent } from './buscador-dashboard.component';

describe('BuscadorDashboardComponent', () => {
  let component: BuscadorDashboardComponent;
  let fixture: ComponentFixture<BuscadorDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorDashboardComponent]
    });
    fixture = TestBed.createComponent(BuscadorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
