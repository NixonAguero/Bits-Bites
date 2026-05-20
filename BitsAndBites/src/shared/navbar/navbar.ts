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
}
