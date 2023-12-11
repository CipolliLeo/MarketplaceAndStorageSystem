import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addToCart(cart: Cart) {
    return this.http.post(`http://localhost:3000/cart`, cart);
  }

  getAllCartByUser(email: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`http://localhost:3000/cart?emailUser=${email}`);
  }

  removeFromCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }

  updateCart(cart: Cart) {
    return this.http.put(`http://localhost:3000/cart/${cart.id}`, cart);
  }
}
