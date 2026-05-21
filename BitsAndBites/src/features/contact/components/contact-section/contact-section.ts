import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  imports: [],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css',
})
export class ContactSection {
  protected contacts = [
    {
      name: 'Don Pepe',
      image: 'assets/DonPepe.png',
      instagram: 'https://www.instagram.com/',
      whatsapp: 'https://wa.me/50688888888',
    },
    {
      name: 'El Guche',
      image: 'assets/elguche.png',
      instagram: 'https://www.instagram.com/',
      whatsapp: 'https://wa.me/50688888888',
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
