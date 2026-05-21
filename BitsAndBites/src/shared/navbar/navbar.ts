import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../core/services/responsive.service';
import { MatIconModule  } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [ MatIconModule ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected responsive = inject(ResponsiveService);
  
  protected isMenuOpen = signal(false);

  protected toggleMenu = (): void => {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  protected scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.isMenuOpen.set(false);
  }
}
