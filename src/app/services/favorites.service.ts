import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/auth';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  getAllFavoritesByUser(email: string): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`http://localhost:3000/favorites?userEmail=${email}`);
  }

  addFavorite(favorite: Favorite) {
    return this.http.post(`http://localhost:3000/favorites`, favorite);
  }

  removeFavorite(favoriteId?: number) {
    return this.http.delete(`http://localhost:3000/favorites/${favoriteId}`);
  }
}
