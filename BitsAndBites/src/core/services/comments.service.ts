import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface RecipeComment {
  user: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);

  public getComments() {
    return this.http.get<RecipeComment[]>('http://localhost:3000/api/comments');
  }

  public saveComment(text: string) {
    return this.http.post<RecipeComment>('http://localhost:3000/api/comments', { text });
  }
}
