import { afterNextRender, Component, computed, inject, signal } from '@angular/core';
import { LikesService } from '../../../../core/services/likes.service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-action-buttons',
  imports: [MatIcon],
  templateUrl: './action-buttons.html',
  styleUrl: './action-buttons.css',
})
export class ActionButtons {
  private likesService = inject(LikesService);

  protected likes = signal(24);
  protected shareLabel = signal('Share');
  protected likeText = computed(() => `Like ${this.likes()}`);

  constructor() {
    afterNextRender(() => {
      this.likesService.getLikes().subscribe({
        next: (response) => this.likes.set(response.likes),
        error: () => {
          // API fallback: keep the current local count until the backend is available.
        },
      });
    });
  }

  protected addLike() {
    this.likesService.addLike().subscribe({
      next: (response) => this.likes.set(response.likes),
      error: () => this.likes.update((current) => current + 1),
    });
  }

  protected async shareRecipe() {
    const shareData = {
      title: 'Bits and Bites',
      text: 'Discover Bits and Bites: High-Altitude Gastronomy.',
      url: globalThis.location?.href ?? '',
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard?.writeText(shareData.url);
    this.shareLabel.set('Copied');
    setTimeout(() => this.shareLabel.set('Share'), 1600);
  }
}
