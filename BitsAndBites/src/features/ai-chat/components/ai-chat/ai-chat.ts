import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientAiService } from '../../../../core/services/client-ai.service';

interface ChatMessage {
  role: 'assistant' | 'user';
  text: string;
}

@Component({
  selector: 'app-ai-chat',
  imports: [FormsModule],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css',
})
export class AiChat {
  protected ai = inject(ClientAiService);
  protected isOpen = signal(false);
  protected isThinking = signal(false);
  protected draft = '';
  protected messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Hi, I am your Bits&Bites assistant. Ask me about the recipe, ingredients, or preparation.',
    },
  ]);

  protected statusText = computed(() => {
    const progress = this.ai.progress();
    return progress > 0 && progress < 100
      ? `${this.ai.status()} ${progress}%`
      : this.ai.status();
  });

  protected toggleChat() {
    this.isOpen.update((value) => !value);
  }

  protected async sendMessage() {
    const text = this.draft.trim();

    if (!text || this.isThinking()) {
      return;
    }

    this.messages.update((items) => [...items, { role: 'user', text }]);
    this.draft = '';
    this.isThinking.set(true);

    const answer = await this.ai.chat(text);
    this.messages.update((items) => [...items, { role: 'assistant', text: answer }]);
    this.isThinking.set(false);
  }
}
