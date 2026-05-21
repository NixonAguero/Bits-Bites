import { afterNextRender, Component, inject, signal } from '@angular/core';
import { CommentsService, RecipeComment } from '../../../../core/services/comments.service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-comments',
  imports: [MatIcon],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  private commentsService = inject(CommentsService);

  protected message = signal('');
  protected comments = signal<RecipeComment[]>([
    { user: 'User 1', text: 'I really love this recipe' },
    { user: 'User 2', text: 'I enjoy this recipe' },
    { user: 'User 3', text: 'The pejibaye flavor is so smooth' },
    { user: 'User 4', text: 'Perfect for a special dinner' },
  ]);

  constructor() {
    afterNextRender(() => {
      this.commentsService.getComments().subscribe({
        next: (comments) => this.comments.set(comments),
        error: () => {
          
        },
      });
    });
  }

  protected updateMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }

  protected addComment() {
    const text = this.message().trim();

    if (!text) {
      return;
    }

    this.commentsService.saveComment(text).subscribe({
      next: (comment) => this.comments.update((items) => [...items, comment]),
      error: () => {
        this.comments.update((items) => [...items, { user: `User ${items.length + 1}`, text }]);
      },
    });

    this.message.set('');
  }
}
