import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface JoinUsData {
  email: string;
  password: string;
  interests: string[];
}

@Injectable({
  providedIn: 'root',
})
export class JoinUsService {
  private http = inject(HttpClient);

  public save(data: JoinUsData) {
    return this.http.post<{ message: string }>('http://localhost:3000/api/users/join', data);
  }
}
