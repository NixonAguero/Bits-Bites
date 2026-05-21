import { Component, input } from '@angular/core';
import { Ingredient } from '../../types/ingredient.interface';

@Component({
  selector: 'app-ingredient-card',
  imports: [],
  templateUrl: './ingredient-card.html',
  styleUrl: '../../styles/ingredients.css',
})
export class IngredientCard {
  ingredient = input.required<Ingredient>();
  color = input<string>('var(--extra1)');
}