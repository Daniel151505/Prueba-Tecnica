import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalServicesComponent } from './total-services.component';

describe('TotalServicesComponent', () => {
  let component: TotalServicesComponent;
  let fixture: ComponentFixture<TotalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
