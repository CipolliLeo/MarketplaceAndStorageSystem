import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(userInfo: User) {
    return this.http.post(`http://localhost:3000/user`, userInfo);
  }

  getUsersByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/user?email=${email}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/user?email=${email}`);
  }
}
