import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstruccionComponent } from './construccion.component';

describe('ConstruccionComponent', () => {
  let component: ConstruccionComponent;
  let fixture: ComponentFixture<ConstruccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstruccionComponent]
    });
    fixture = TestBed.createComponent(ConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
