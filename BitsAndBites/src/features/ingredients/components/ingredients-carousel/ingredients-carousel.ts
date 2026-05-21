import { Component, inject, signal, computed } from '@angular/core';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { Ingredient } from '../../types/ingredient.interface';
import { ResponsiveService } from '../../../../core/services/responsive.service';

@Component({
  selector: 'app-ingredients-carousel',
  imports: [IngredientCard],
  templateUrl: './ingredients-carousel.html',
  styleUrl: '../../styles/ingredients.css',
})
export class IngredientsCarousel {
  protected responsive = inject(ResponsiveService);

  protected colors = ['var(--extra1)', 'var(--extra2)', 'var(--extra3)', 'var(--extra4)'];

  protected ingredients: Ingredient[] = [
    { "name": "Pejibaye", "amount": "500g", "description": "Highly nutritious, starchy, and savory tropical fruit from Central and South America. Popular in Costa Rica, it grows in large, thorny clusters on palms." },
    { "name": "Sweetened condensed milk", "amount": "1 can (397g)", "description": "Adds sweetness and creaminess to the drink. Its thick, sugary texture helps bind the other ingredients together." },
    { "name": "Heavy cream", "amount": "250ml", "description": "Gives the liqueur a thick and smooth texture. It provides a rich, velvety mouthfeel and balances the alcohol." },
    { "name": "White rum", "amount": "200ml", "description": "Alcoholic base that balances the flavors. It adds warmth and depth without overpowering the fruit and dairy notes." },
    { "name": "Cinnamon", "amount": "1 stick", "description": "Spiced touch that enhances the flavor. It infuses a warm, aromatic sweetness typical of Latin American desserts." },
    { "name": "Vanilla", "amount": "1 tsp", "description": "Sweet aroma that complements the mixture. It rounds out the flavors and adds a pleasant floral undertone." },
    { "name": "Sugar", "amount": "100g", "description": "Sweetens and balances the natural acidity. It helps achieve the desired level of sweetness while enhancing the overall flavor profile." }
];

  protected currentIndex = signal(0);

  protected visibleCards = computed(() => {
    const perView = this.responsive.isMobile() ? 1 : 4;
    const total = this.ingredients.length;
    const start = this.currentIndex();
    const result = [];

    for (let i = 0; i < perView; i++) {
      result.push(this.ingredients[(start + i) % total]);
    }
    return result;
  });

  protected colorForIndex(globalIndex: number): string {
    return this.colors[globalIndex % this.colors.length];
  }

  protected next() {
    const perView = this.responsive.isMobile() ? 1 : 4;
    this.currentIndex.update(i => (i + perView) % this.ingredients.length);
  }

  protected prev() {
    const perView = this.responsive.isMobile() ? 1 : 4;
    this.currentIndex.update(i =>
      (i - perView + this.ingredients.length) % this.ingredients.length
    );
  }

  protected get dots(): number[] {
    const perView = this.responsive.isMobile() ? 1 : 4;
    return Array.from({ length: Math.ceil(this.ingredients.length / perView) }, (_, i) => i);
  }

  protected get activeDot(): number {
    const perView = this.responsive.isMobile() ? 1 : 4;
    return Math.floor(this.currentIndex() / perView);
  }
}