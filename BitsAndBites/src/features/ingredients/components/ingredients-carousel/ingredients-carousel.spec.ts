import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsCarousel } from './ingredients-carousel';

describe('IngredientsCarousel', () => {
  let component: IngredientsCarousel;
  let fixture: ComponentFixture<IngredientsCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
