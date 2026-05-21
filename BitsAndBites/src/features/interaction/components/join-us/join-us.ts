import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JoinUsData, JoinUsService } from '../../../../core/services/join-us.service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-join-us',
  imports: [FormsModule, MatIcon],
  templateUrl: './join-us.html',
  styleUrl: './join-us.css',
})
export class JoinUs {
  private joinUsService = inject(JoinUsService);

  protected email = '';
  protected password = '';
  protected acceptedTerms = false;
  protected selectedInterests = signal<string[]>([]);
  protected status = signal('');
  protected isSending = signal(false);
  protected isTermsOpen = signal(false);
  protected interests = ['Aventure', 'Food', 'Culture'];

  protected toggleInterest(interest: string) {
    this.selectedInterests.update((items) =>
      items.includes(interest) ? items.filter((item) => item !== interest) : [...items, interest],
    );
  }

  protected submit() {
    if (!this.email || !this.password || !this.acceptedTerms || this.isSending()) {
      this.status.set('Please accept the data and security terms before sending.');
      return;
    }

    const data: JoinUsData = {
      email: this.email,
      password: this.password,
      interests: this.selectedInterests(),
    };

    this.isSending.set(true);
    this.status.set('');

    this.joinUsService.save(data).subscribe({
      next: () => {
        this.status.set('Sent');
        this.email = '';
        this.password = '';
        this.acceptedTerms = false;
        this.selectedInterests.set([]);
        this.isSending.set(false);
      },
      error: () => {
        this.status.set('Could not send');
        this.isSending.set(false);
      },
    });
  }

  protected openTerms() {
    this.isTermsOpen.set(true);
  }

  protected closeTerms() {
    this.isTermsOpen.set(false);
  }
}
