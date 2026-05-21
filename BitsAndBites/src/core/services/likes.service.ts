import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface LikesResponse {
  likes: number;
}

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private http = inject(HttpClient);

  public getLikes() {
    return this.http.get<LikesResponse>('http://localhost:3000/api/likes');
  }

  public addLike() {
    return this.http.post<LikesResponse>('http://localhost:3000/api/likes', {});
  }
}
