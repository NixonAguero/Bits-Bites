import { Component, ElementRef, inject, afterNextRender, DestroyRef } from '@angular/core';
import { ResponsiveService } from '../../../../core/services/responsive.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  protected responsive = inject(ResponsiveService);
  private el = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  private observer!: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const host = this.el.nativeElement;
            if (entry.isIntersecting) {
              host.classList.add('visible');
            } else {
              host.classList.remove('visible');
            }
          });
        },
        { threshold: 0 }
      );

      this.observer.observe(this.el.nativeElement);

      this.destroyRef.onDestroy(() => {
        this.observer?.disconnect();
      });
    });
  }
}