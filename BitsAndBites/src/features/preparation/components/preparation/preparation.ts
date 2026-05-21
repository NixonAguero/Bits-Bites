import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { ResponsiveService } from '../../../../core/services/responsive.service';

@Component({
  selector: 'app-preparation',
  imports: [],
  templateUrl: './preparation.html',
  styleUrl: './preparation.css',
})
export class Preparation {
  protected responsive = inject(ResponsiveService);
  protected steps = [
    {
      title: 'Step 1',
      text: 'Cook the pejibayes in salted water until soft. Then peel them and remove the seed.',
    },
    {
      title: 'Step 2',
      text: 'Place the pejibayes in a blender along with the evaporated milk and sweetened condensed milk.',
    },
    {
      title: 'Step 3',
      text: 'Blend until you obtain a smooth and creamy mixture.',
    },
    {
      title: 'Step 4',
      text: 'Add the liquor and vanilla, and blend again for a few seconds.',
    },
    {
      title: 'Step 5',
      text: 'Taste the mixture and adjust sweetness if necessary.',
    },
    {
      title: 'Step 6',
      text: 'Refrigerate for at least one hour to improve texture and flavor.',
    },
    {
      title: 'Step 7',
      text: 'Serve cold, alone or with ice, as preferred.',
    },
  ];

  private el = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.el.nativeElement.classList.toggle('visible', entry.isIntersecting);
          });
        },
        { threshold: 0.2 },
      );

      observer.observe(this.el.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
