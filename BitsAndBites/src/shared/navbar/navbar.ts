import { Component, inject } from '@angular/core';
import { ResponsiveService } from '../../core/services/responsive.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected responsive = inject(ResponsiveService);
  
  public screenSize
}
