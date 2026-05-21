import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../shared/navbar/navbar";
import { HeroComponent } from "../features/hero/component/hero/hero";
import { Description } from "../features/description/component/description/description";
import { IngredientsCarousel } from "../features/ingredients/components/ingredients-carousel/ingredients-carousel";
import { InteractionSection } from "../features/interaction/components/interaction-section/interaction-section";
import { ContactSection } from "../features/contact/components/contact-section/contact-section";
import { SiteFooter } from "../features/contact/components/site-footer/site-footer";
import { Preparation } from "../features/preparation/components/preparation/preparation";
import { AiChat } from "../features/ai-chat/components/ai-chat/ai-chat";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navbar,
    HeroComponent,
    Description,
    IngredientsCarousel,
    Preparation,
    InteractionSection,
    ContactSection,
    SiteFooter,
    AiChat
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BitsAndBites');
}
