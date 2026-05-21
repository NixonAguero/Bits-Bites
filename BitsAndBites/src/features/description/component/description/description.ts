import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { ResponsiveService } from '../../../../core/services/responsive.service';

@Component({
  selector: 'app-description',
  imports: [],
  templateUrl: './description.html',
  styleUrl: './description.css',
})
export class Description {
  protected responsive = inject(ResponsiveService);
  private el = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.el.nativeElement.classList.add('visible');
            } else {
              this.el.nativeElement.classList.remove('visible');
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(this.el.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
