import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../shared/navbar/navbar";
import { HeroComponent } from "../features/hero/component/hero/hero";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BitsAndBites');
}
